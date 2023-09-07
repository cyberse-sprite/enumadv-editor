<script setup lang="ts">
import MyTabs from './_tabs.vue'
import MyInput from '../../components/input.vue'
import { useWorkStore } from '../../stores/work';
import { ref } from 'vue'
import MyLines from './_lines.vue'

const work = useWorkStore()
const activeIndex = ref('')
const activeTab = ref('')

const addTarget = () => {
    work.resource.actor[activeTab.value][activeIndex.value] = {
        color: '#000',
        varis: {},
        stats: {},
        name: {
            first: "",
            last: "",
            style: 0
        }
    }
}
</script>

<template>
    <my-tabs type="actor" v-model:active-index="activeIndex" v-model:active-tab="activeTab"  @add-target="addTarget">
        <template #default="{ item }">
            <el-form>
                <el-form-item label="颜色"><el-color-picker v-model="item.color" /></el-form-item>
                <el-form-item label="姓名">
                    <el-form-item label="名字" style="flex:1"><my-input v-model="item.name.first"></my-input></el-form-item>
                    <div style="width: 20px;"></div>
                    <el-form-item label="姓氏" style="flex:1"><my-input v-model="item.name.last"></my-input></el-form-item>
                    <div style="width: 20px;"></div>
                    <el-form-item label="风格" style="flex:2">
                        <el-radio-group v-model="item.name.style">
                            <el-radio-button label="0">姓名</el-radio-button>
                            <el-radio-button label="1">名·姓</el-radio-button>
                            <el-radio-button label="2">只有名</el-radio-button>
                            <el-radio-button label="3">只有姓</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="属性">
                    <div>
                        <my-lines v-model="work.resource.actor[activeTab][activeIndex].varis" add-from="vari"></my-lines>
                    </div>
                </el-form-item>
                <el-form-item label="状态">
                    <div>
                        <my-lines v-model="work.resource.actor[activeTab][activeIndex].stats" add-from="state"></my-lines>
                    </div>
                </el-form-item>
            </el-form>
        </template>
    </my-tabs>
</template>