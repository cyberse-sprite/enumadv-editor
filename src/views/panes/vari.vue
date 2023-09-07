<script setup lang="ts">
import MyTabs from './_tabs.vue'
import MyInput from '../../components/input.vue'
import { useWorkStore } from '../../stores/work';
import { ref } from 'vue'

const work = useWorkStore()
const activeIndex = ref('')
const activeTab = ref('')

const addTarget = () => {
    work.resource.vari[activeTab.value][activeIndex.value] = {
        alias: '',
        color: '#000',
        type: 'number'
    }
}
</script>

<template>
    <my-tabs type="vari" v-model:active-index="activeIndex" v-model:active-tab="activeTab"  @add-target="addTarget">
        <template #default="{ item }">
            <el-form>
                <el-form-item label="颜色">
                    <el-color-picker v-model="item.color" />
                </el-form-item>
                <el-form-item label="别名">
                    <my-input v-model="item.alias"></my-input>
                </el-form-item>
                <el-form-item label="数据类型">
                    <el-radio-group v-model="item.type">
                        <el-radio-button label="number" />
                        <el-radio-button label="string" />
                        <el-radio-button label="ope" />
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </template>
    </my-tabs>
</template>