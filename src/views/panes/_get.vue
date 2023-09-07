<script setup lang="ts">
import VueTree from '@tinywisp/vue-tree'
import { ipcRenderer } from 'electron'
import { ref, watch } from 'vue'
import { useWorkStore } from '../../stores/work';
import { useGlobalStore } from '../../stores/global';

const work = useWorkStore()
const global = useGlobalStore()

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)

watch(() => props.modelValue, () => {
    value.value = props.modelValue
})

ipcRenderer.send('get:init', { workspace: global.workspace, key: work.key })

ipcRenderer.on('get:tree', (_event, args) => {
    treeData.value = args[0].children
    //refTree.value.reload()
})

const treeData = ref([])
const refTree = ref()

const select = (node: any) => {
    if (node.type == 'file') {
        value.value = node.rePath
        emit('update:modelValue', value.value)
        drawer.value = false
    }
}

const drawer = ref(false)

</script>

<template>
    <el-button @click="drawer = true" text>
        {{ value }}
        <el-icon>
            <Edit />
        </el-icon>
    </el-button>
    <el-drawer v-model="drawer" :with-header="false">
        <div class="tree">
            <vue-tree :tree="treeData" @select="select" ref="refTree" :defaultAttrs="{ style: { extraFloatRight: true } }">
                <template #icon="{ node }">
                    <el-icon>
                        <Folder v-if="node.type == 'directory'" />
                        <Document v-else />
                    </el-icon>
                </template>
                <template #title="{ node }">
                    <span class="title" style="line-height: 40px">{{ node.title }}</span>
                </template>
            </vue-tree>
        </div>
    </el-drawer>
</template>

<style scoped>
.father {
    flex: 1;
    flex-shrink: 0;
    display: flex;
    padding: 10px;
    min-height: 0;
}

.tree {
    height: 100%;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.title {
    font-size: small;
}

.icon-div {
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
   