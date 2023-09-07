<script setup lang="ts">
import { ref, watch } from 'vue'
import MyInput from './input.vue'
import draggable from 'vuedraggable'

const props = defineProps({ modelValue: Array })
const emit = defineEmits(['update:modelValue'])

const value = ref(<string[]>props.modelValue)
watch(() => props.modelValue, () => {
    value.value = <string[]>props.modelValue
})
watch(() => value.value, () => {
    emit('update:modelValue', value.value)
})

const drag = ref(false)

const finishDrag = () => {
    drag.value = false
}

</script>

<template>
    <div style="display: flex;flex-direction: column;flex: 1;">
        <draggable v-model="value" item-key="id" @start="drag = true" @end="finishDrag" animation="100" handle=".handle">
            <template #item="{ index }">
                <div class="ope-line-item">
                    <div style="flex: 1;"><my-input v-model="value[index]"></my-input></div>
                    <el-button text circle @click="value.splice(index, 1)" type="danger"><el-icon>
                            <Delete />
                        </el-icon></el-button>
                    <el-button text circle class="handle"><el-icon>
                            <DCaret />
                        </el-icon></el-button>
                </div>
            </template>
        </draggable>
        <el-button @click="value.push('')">添加行</el-button>
    </div>
</template>

<style scoped>
.ope-line-item {
    display: flex;
    margin-bottom: 5px;
}
</style>