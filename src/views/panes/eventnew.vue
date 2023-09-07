<script setup lang="ts">
import { EventType, getInitEventItem } from '../../../define/event';
import { useWorkStore } from '../../stores/work';
import { ref, watch } from 'vue'

const props = defineProps({ modelValue: Boolean, activeIndex: String, activeTab: String, editIndex: Number })
const emit = defineEmits(['update:modelValue', 'update:editIndex'])
const drawer = ref(props.modelValue ? props.modelValue : false)
watch(() => props.modelValue, () => {
    drawer.value = props.modelValue
})

watch(() => drawer.value, () => {
    emit('update:modelValue', drawer.value)
})

const editIndex = ref(props.editIndex)
watch(() => props.editIndex, () => {
    editIndex.value = props.editIndex
})

const beforeClose = () => {
    drawer.value = false
}

const events = getInitEventItem()

const addEventItem = (type: EventType) => {
    const newevent = events[type]
    work.resource.event[<string>props.activeTab][<string>props.activeIndex].push(newevent)
    editIndex.value = work.resource.event[<string>props.activeTab][<string>props.activeIndex].length - 1
    drawer.value = false
    emit('update:editIndex', editIndex.value)
}

const work = useWorkStore()

</script>

<template>
    <el-button @click="drawer = !drawer" type="primary" class="buttonsss">添加事件</el-button>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false" @before-close="beforeClose" direction="btt">
        <el-space>
            <el-button v-for="item in  ['text', 'get', 'ope', 'insert', 'next', 'rand', 'select', 'input', 'pause', 'end'] "
                @click="addEventItem(<EventType>item)">
                {{ item }}
            </el-button>
        </el-space>
    </el-drawer>
</template>

<style scoped>
.buttonsss {
    margin-left: auto;
    margin-right: 0;
}
</style>