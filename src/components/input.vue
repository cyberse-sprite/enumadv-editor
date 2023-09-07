<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({ modelValue: String, type: String })
const emit = defineEmits(['update:modelValue'])
const refInput = ref()

const value = ref(props.modelValue)
watch(() => props.modelValue, (n) => {
    value.value = n
})

const edit = ref(false)
const change = () => {
    edit.value = false
    emit('update:modelValue', value.value)
}
const onclick = () => {
    edit.value = true
    refInput.value.focus()
}

</script>

<template>
    <el-input v-show="edit" ref="refInput" v-model="value" @blur="change" @change="change" :type="type" class="input-input"
        autosize input-style="line-height:32px;padding-top:0"></el-input>
    <div v-show="(!edit)" class="input-button" @click="onclick">
        {{ value }}
        <el-icon>
            <Edit />
        </el-icon>
    </div>
</template>
<style>
.input-input {
    width: 100%;
}

.input-button {
    border-radius: 5px;
    cursor: pointer;
    padding: 0 11px;
}

.input-button:hover {
    background-color: #eee;
}
</style>