<script setup lang="ts">
import MyTabs from './_tabs.vue'
import { useWorkStore } from '../../stores/work';
import { ref } from 'vue'
import MyLines from './_lines.vue'

const work = useWorkStore()
const activeIndex = ref('')
const activeTab = ref('')

const addTarget = () => {
    work.resource.state[activeTab.value][activeIndex.value] = {
        color: '#000',
        events: {}
    }
}

</script>

<template>
    <my-tabs type="state" v-model:active-index="activeIndex" v-model:active-tab="activeTab" @add-target="addTarget">
        <template #default="{ item }">
            <el-form>
                <el-form-item label="颜色">
                    <el-color-picker v-model="item.color" />
                </el-form-item>
                <el-form-item label="事件">
                    <my-lines v-model="work.resource.state[activeTab][activeIndex].events" add-from="event"></my-lines>
                </el-form-item>
            </el-form>
        </template>
    </my-tabs>
</template>

<style>
.lines-item {
    margin-bottom: 5px;
    display: flex;
    border-radius: 5px;
    border: 1px #eee solid;
    min-width: 400px;
}

.lines-item:hover {
    background-color: #eee;
}

.lines-item-label {
    flex: 1;
    word-break: keep-all;
    background-color: #eee;
    flex-shrink: 0;
    padding: 0 10px;
}

.lines-item-value {
    flex: 1;
    word-break: keep-all;
    flex-shrink: 0;
    padding: 0 10px;
}
</style>

