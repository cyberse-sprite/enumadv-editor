<script setup lang="ts">
import { useWorkStore } from '../../stores/work';
import { ref, watch, } from 'vue'
import { type ResType } from '../../../define/resource';

const work = useWorkStore()
const props = defineProps({ modelValue: String, addFrom: String })
const emit = defineEmits(["update:modelValue"])

const value = ref(props.modelValue)
const af = <ResType>props.addFrom
watch(() => props.modelValue, () => { value.value = <string>props.modelValue })
watch(() => value.value, () => { emit('update:modelValue', value.value) })

const drawer = ref(false)

const select = (line: string) => {
    value.value = line
    drawer.value = false
}

</script>

<template>
    <div style="display: flex; flex-direction: column;">
        <el-button @click="drawer = true" text circle>
            {{ value }}
            <el-icon>
                <Edit />
            </el-icon>
        </el-button>
    </div>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <el-tabs>
            <el-tab-pane :label="tab" v-for="(content, tab) in work.resource[af]">
                <el-space direction="vertical" fill>
                    <el-button v-for="(_target, line) in content" @click="select(<string>line)" :disabled="value == line">
                        {{ line }}
                    </el-button>
                </el-space>
            </el-tab-pane>
        </el-tabs>
    </el-drawer>
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

