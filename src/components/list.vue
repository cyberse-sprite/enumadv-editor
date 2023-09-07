<script setup lang="ts">
import { watch, ref } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps({ modelValue: Object })
const emit = defineEmits(['update:modelValue'])

const origin = ref(<Array<any>>props.modelValue)
const object = ref(<Array<any>>props.modelValue)
const drag = ref(false)

const finishDrag = () => {
    drag.value = false
    syn()
}

watch(() => props.modelValue, (_newValue) => {
    origin.value = <Array<any>>props.modelValue
    object.value = <Array<any>>props.modelValue
})

const deleteItem = (index: number) => {
    object.value.splice(index, 1)
    syn()
}

const syn = () => {
    origin.value.length = object.value.length
    for (let i in origin.value) {
        origin.value[i] = JSON.parse(JSON.stringify(object.value[i]))
    }
    emit('update:modelValue', origin.value)
}

</script>

<template>
    <draggable v-model="object" item-key="id" @start="drag = true" @end="finishDrag" animation="100" handle=".handle">
        <template #item="{ element, index }">
            <div class="event-item">
                <div style="flex: 1;">
                    <slot name="content" :item="element">没有内容</slot>
                </div>
                <div class="m-button">
                    <div>
                        <el-button circle text @click="deleteItem(index)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>
                    </div>
                    <div>
                        <el-button circle text class="handle">
                            <el-icon>
                                <DCaret />
                            </el-icon>
                        </el-button>
                    </div>
                    <div>
                        <slot name="edit" :index="index" :element="element"></slot>
                    </div>
                </div>
            </div>
        </template>
    </draggable>
</template>

<style>
.button {
    margin-top: 35px;
}

.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.list-group {
    min-height: 20px;
}

.list-group-item {
    cursor: move;
}

.list-group-item i {
    cursor: pointer;
}
</style>

