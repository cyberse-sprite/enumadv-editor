<script setup lang="ts">
import { useWorkStore } from '../../stores/work';
import { ref, watch, reactive } from 'vue'
import { type ResType } from '../../../define/resource';
import MyInput from '../../components/input.vue'
import { ListMap } from '../../../define/listmap';
import draggable from 'vuedraggable'

type Events = { [index: string]: string }

const work = useWorkStore()
const props = defineProps({ modelValue: Object, addFrom: String })
const emit = defineEmits(["update:modelValue"])

const model = ref(<Events>props.modelValue)
const object = reactive(new ListMap)
object.load(model.value)

const af = <ResType>props.addFrom
watch(() => props.modelValue, () => { model.value = <Events>props.modelValue })
watch(() => model.value, () => { emit('update:modelValue', model.value) })

const drag = ref(false)

const finishDrag = () => {
    drag.value = false
    model.value = object.toJSON()
}

const excuAddEvent = (name: string) => {
    object.addItem(name, '1')
    drawer.value = false
    model.value = object.toJSON()
}

const deleteLine = (index: string) => {
    object.deleteItem(index)
    model.value = object.toJSON()
}

const drawer = ref(false)

</script>

<template>
    <div style="display: flex; flex-direction: column;">
        <draggable v-model="object.list" item-key="id" handle=".handle" @start="drag = true" @end="finishDrag"
            animation="100">
            <template #item="{ element }">
                <div class="lines-item">
                    <div class="lines-item-label">{{ element }}</div>
                    <div class="lines-item-value">
                        <my-input v-model="object.map[element]"></my-input>
                    </div>
                    <el-button text circle @click="deleteLine(<string>element)" type="danger">
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>
                    <el-button text circle class="handle">
                        <el-icon>
                            <DCaret />
                        </el-icon>
                    </el-button>
                </div>
            </template>
        </draggable>
        <el-button @click="drawer = true">添加</el-button>
    </div>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <el-tabs>
            <el-tab-pane :label="tab" v-for="(content, tab) in work.resource[af]">
                <el-space direction="vertical" fill>
                    <el-button v-for="(_target, line) in content" @click="excuAddEvent(<string>line)"
                        :disabled="Object.keys(model).includes(<string>line)">
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

