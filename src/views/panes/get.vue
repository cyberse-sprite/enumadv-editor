<script setup lang="ts">
import VueTree from '@tinywisp/vue-tree'
import { ipcRenderer } from 'electron'
import { computed, onMounted, ref } from 'vue'
import MyDialog from '../../components/dialog.vue'
import { useWorkStore } from '../../stores/work';
import { useGlobalStore } from '../../stores/global';

const work = useWorkStore()
const global = useGlobalStore()

ipcRenderer.send('get:init', { workspace: global.workspace, key: work.key })

ipcRenderer.on('get:tree', (_event, args) => {
    treeData.value = args[0].children
    //refTree.value.reload()
})

const treeData = ref([])
const text = ref('')
const refTree = ref()
const current = computed(() => refTree.value.getSelectedOne())

const newName = ref('')
const newDia = ref(false)

const newDir = ref('')
const newDirDia = ref(false)

const select = (node: any) => {
    if (node.type == 'file')
        ipcRenderer.send('get:readfile', node.path)
}

ipcRenderer.on('get:readfile', (_event, args) => {
    text.value = args
})

const saveFile = () => {
    ipcRenderer.send('get:savefile', { path: current.value.path, content: text.value })
}

const createFile = () => {
    ipcRenderer.send('get:createfile', { name: newName.value, workspace: global.workspace, key: work.key })
}

const createDir = () => {
    ipcRenderer.send('get:createdir', { name: newDir.value, workspace: global.workspace, key: work.key })
}

const deleteTarget = () => {
    ipcRenderer.send('get:deletetarget', { path: current.value.path, workspace: global.workspace, key: work.key })
}

const dragOver = (dragAndDrop: any) => {
    if (dragAndDrop.overNode.type != 'directory') {
        dragAndDrop.isDroppable = false
    } else {
        dragAndDrop.isDroppable = true
    }
}

const moveTarget = (node: any, fromParent: any, _fromPos: any, toParent: any, _toPos: any) => {
    if (fromParent == toParent) {
        console.log('移动无效')
    }
    else if (toParent.type == 'directory')
        ipcRenderer.send('get:movetarget', { path: node.path, workspace: global.workspace, key: work.key, to: toParent.path })

}

onMounted(() => {
    //console.log(refTree)
})

</script>

<template>
    <div class="container-ns">
        <div class="father">
            <div class="tree">
                <div style="flex: 1;margin-bottom: 10px; border: 1px #eee solid;">
                    <vue-tree :tree="treeData" @select="select" ref="refTree" @move="moveTarget" @dragover="dragOver"
                        :defaultAttrs="{ style: { extraFloatRight: true } }">
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
                <div style="display: flex; flex-direction: column;margin-bottom: 10px;">
                    <el-button type="primary" @click="newName = ''; newDia = true">添加文件</el-button>
                </div>
                <div style="display: flex; flex-direction: column;">
                    <el-button type="primary" @click="newDir = ''; newDirDia = true">添加文件夹</el-button>
                </div>
            </div>
            <div style="flex: 1;padding-left: 10px;">
                <div style="margin-bottom: 10px;display: flex;">
                    <el-button @click="saveFile" type="primary">保存</el-button>
                    <div style="flex: 1;"></div>
                    <el-button @click="deleteTarget" type="danger">删除</el-button>
                </div>
                <el-input v-model="text" type="textarea" autosize>
                </el-input>
            </div>
        </div>
    </div>
    <my-dialog v-model:model-value="newName" v-model:visiabel="newDia" title="请输入新文件名称" label="名称"
        @confirm="createFile"></my-dialog>
    <my-dialog v-model:model-value="newDir" v-model:visiabel="newDirDia" title="请输入新文件夹名称" label="名称"
        @confirm="createDir"></my-dialog>
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
    width: 200px;
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
   