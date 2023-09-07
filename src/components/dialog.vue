<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({ modelValue: String, visiabel: Boolean, label: String, selections: Object })
const emit = defineEmits(['update:modelValue', 'update:visiabel', 'confirm'])
const dia = ref(props.visiabel)
const value = ref(props.modelValue)

watch(() => value.value, (newValue) => {
    emit('update:modelValue', newValue)
})

watch(() => dia.value, (newValue) => {
    emit('update:visiabel', newValue)
})

watch(() => props.visiabel, (newValue) => {
    dia.value = newValue
})
watch(() => props.modelValue, (newValue) => {
    value.value = newValue
})

</script>

<template>
    <el-dialog v-model="dia" width="450px">
        <el-form inline>
            <el-form-item :label="label">
                <el-select v-model="value" v-if="selections">
                    <el-option v-for="item in selections" :value="item"></el-option>
                </el-select>
                <el-input v-else v-model="value"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="dia = false; $emit('confirm')" type="primary" dark>确认</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>