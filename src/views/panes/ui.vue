<script setup lang="ts">
import { computed } from 'vue'
import { useWorkStore } from '../../stores/work';
import MyList from '../../components/list.vue'
import MyInput from '../../components/input.vue'

const work = useWorkStore()
const ui = computed(() => work.resource.ui)
const addButton = () => {
    ui.value.button.push({
        if: "",
        text: "",
        ope: ""
    })
}
const addViewItem = (side: 'top' | 'side') => {
    ui.value.view[side].push({
        label: '',
        if: "",
        target: "",
        res: "",
        val: '',
        type: 'group',
        showValue: false,
        showZero: false
    })
}
</script>

<template>
    <div class="container">
        <div class="block" v-if="ui.view">
            <div>视图</div>
            <el-form>
                <el-form-item :label="side" v-for="(_content, side) in ui.view">
                    <div>
                        <div style="display: flex;">
                            <div style="flex: 1;"></div>
                            <el-button @click="addViewItem(`${side}`)" type="primary" class="add-items">添加显示内容</el-button>
                        </div>
                        <my-list v-model="ui.view[side]">
                            <template #content="{ item }">
                                <el-form inline>
                                    <el-form-item label="标签">
                                        <my-input v-model="item.label"></my-input>
                                    </el-form-item>
                                    <el-form-item label="条件">
                                        <my-input v-model="item.if"></my-input>
                                    </el-form-item>
                                    <el-form-item label="数据对象">
                                        <my-input v-model="item.target"></my-input>
                                    </el-form-item>
                                    <el-form-item label="资源对象">
                                        <my-input v-model="item.res"></my-input>
                                    </el-form-item>
                                    <el-form-item label="对象属性">
                                        <my-input v-model="item.val"></my-input>
                                    </el-form-item>
                                    <el-form-item label="对象形式">
                                        <el-radio-group v-model="item.type">
                                            <el-radio-button label="single">单个</el-radio-button>
                                            <el-radio-button label="group">组群</el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="显示值">
                                        <el-switch v-model="item.showValue"></el-switch>
                                    </el-form-item>
                                    <el-form-item label="显示零值项">
                                        <el-switch v-model="item.showZero"></el-switch>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </my-list>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="block" v-if="ui.button">
            <div style="display: flex;align-items: center;">
                <div>按钮</div>
                <div style="flex: 1;"></div>
                <el-button type="primary" @click="addButton">添加按钮</el-button>
            </div>
            <my-list v-model="ui.button">
                <template #content="{ item }">
                    <el-form-item>
                        <el-form>
                            <el-form-item label="条件">
                                {{ item.if }}
                            </el-form-item>
                            <el-form-item label="文本">
                                {{ item.text }}
                            </el-form-item>
                            <el-form-item label="操作">
                                {{ item.ope }}
                            </el-form-item>
                        </el-form>
                    </el-form-item>
                </template>
            </my-list>
        </div>
    </div>
</template>

<style>
.add-items {
    margin-left: auto;
    margin-right: 0;
}
</style>