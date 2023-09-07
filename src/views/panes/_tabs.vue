<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { useWorkStore } from '../../stores/work';
import { ElMessage } from 'element-plus';
import draggable from 'vuedraggable'
import { ListMap } from '../../../define/listmap';
import { type ResType } from '../../../define/resource'
import MyDialog from '../../components/dialog.vue'

let object = reactive(new ListMap())
const activeIndex = ref(object.list.length > 0 ? object.list[0] : '')

const drag = ref(false)

const finishDrag = () => {
    drag.value = false
    work.resource[targetType][activeTab.value] = object.toJSON()
}

const props = defineProps({ type: String, activeIndex: String, activeTab: String })
const emit = defineEmits(['update:activeIndex', 'update:activeTab', 'addTarget'])
const targetType = <ResType>props.type

const work = useWorkStore()
const targetFiles = computed(() => work.resource[targetType])
const targetFilesList = computed(() => Object.keys(work.resource[targetType]))


const activeTab = ref(targetFilesList.value.length > 0 ? targetFilesList.value[0] : '')
const changeTab = () => {
    object.load(work.resource[targetType][activeTab.value])
    if (object.list.length > 0) {
        activeIndex.value = object.list[0]
    }
}

changeTab()

emit('update:activeIndex', activeIndex.value)
emit('update:activeTab', activeTab.value)

const newFileName = ref('')
const fileNameDialog = ref(false)
const renameDialog = ref(false)


watch(() => activeIndex.value, (n) => {
    emit('update:activeIndex', n)
})

watch(() => activeTab.value, (n) => {
    emit('update:activeTab', n)
})

watch(() => object, () => {
    //@ts-ignore
    work.resource[targetType][activeTab.value][activeIndex.value] = object.toJSON()
})

const handleSelect = (key: string) => {
    activeIndex.value = key
}

const removeTab = () => {
    work.removeFile(targetType, activeTab.value)
}

const addTab = () => {
    if (work.addFile(targetType, newFileName.value)) {
        fileNameDialog.value = false
        renameDialog.value = false
    } else {
        ElMessage.error("该文件已存在");
    }
}

const renameTab = () => {
    addTab()
    removeTab()
}

const removeTarget = (index: string) => {
    object.deleteItem(index)
    work.resource[targetType][activeTab.value] = object.toJSON()
}

const newTargetName = ref('')
const TargetNameDialog = ref(false)
const newTargetDialog = ref(false)

let oldTargetName = ''

const renameTarget = (index: string) => {
    oldTargetName = index
    newTargetName.value = index
    TargetNameDialog.value = true
}

const excuRenameTarget = () => {
    object.renameItem(newTargetName.value, oldTargetName)
    work.resource[targetType][activeTab.value] = object.toJSON()
}

const moveToDialog = ref(false)
let target = ''
let newTab = ref('')

const moveTarget = (index: string) => {
    target = index
    newTab.value = activeTab.value
    moveToDialog.value = true
}

const excuMoveTarget = () => {
    work.resource[targetType][newTab.value][target] = work.resource[targetType][activeTab.value][target]
    delete work.resource[targetType][activeTab.value][target]
    activeIndex.value = ''
    changeTab()
}

</script>

<template>
    <div class="container-ns">
        <div style="margin: 10px;">
            <el-button type="primary" @click="fileNameDialog = true; newFileName = ''">添加文件</el-button>
            <el-button type="danger" @click="removeTab" v-if="activeTab != ''">删除文件</el-button>
            <el-button @click="renameDialog = true; newFileName = activeTab" v-if="activeTab != ''">重命名文件</el-button>
        </div>
        <el-tabs type="card" v-model="activeTab" class="tabs" @tab-change="changeTab">
            <el-tab-pane :label="filename" v-for="(_t, filename) in targetFiles" :name="filename" lazy>
                <div class="left">
                    <div class="left-menu">
                        <el-menu>
                            <draggable v-model="object.list" item-key="id" @start="drag = true" @end="finishDrag"
                                animation="100" handle=".handle">
                                <template #item="{ element }">
                                    <el-menu-item class="block menu-item" :index="element">
                                        <span :style="{ color: object.map[element].color, flex: 1 }"
                                            @click="handleSelect(element)">{{ element }}</span>
                                        <el-icon class="handle m-button">
                                            <DCaret />
                                        </el-icon>
                                        <el-icon class="m-button" @click="removeTarget(element)">
                                            <Delete />
                                        </el-icon>
                                        <el-icon class="m-button" @click="renameTarget(element)">
                                            <Edit />
                                        </el-icon>
                                        <el-icon class="m-button" @click="moveTarget(element)">
                                            <DocumentRemove />
                                        </el-icon>
                                    </el-menu-item>
                                </template>
                            </draggable>
                        </el-menu>
                    </div>
                    <el-button type="primary" @click="activeIndex = ''; newTargetDialog = true">添加</el-button>
                </div>
                <div class="right" v-if="object.map[activeIndex]">
                    <div style="max-width: 800px;margin: auto;">
                        <slot name="default" :item="object.map[activeIndex]" :index="activeIndex" :tab="activeTab">
                        </slot>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <my-dialog v-model:model-value="newFileName" v-model:visiabel="fileNameDialog" title="请输入新文件名称" label="名称"
            @confirm="addTab"></my-dialog>
        <my-dialog v-model:model-value="newFileName" v-model:visiabel="renameDialog" title="请输入重命名文件名称" label="名称"
            @confirm="renameTab"></my-dialog>
        <my-dialog v-model:model-value="newTargetName" v-model:visiabel="TargetNameDialog" title="重命名" label="名称"
            @confirm="excuRenameTarget"></my-dialog>
        <my-dialog v-model:model-value="activeIndex" v-model:visiabel="newTargetDialog" title="添加" label="名称"
            @confirm="$emit('addTarget'); changeTab()"></my-dialog>
        <my-dialog v-model:model-value="newTab" v-model:visiabel="moveToDialog" :selections="targetFilesList" title="选择"
            label="名称" @confirm="excuMoveTarget"></my-dialog>
    </div>
</template>

<style>
.tabs {
    flex: 1;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

.tabs>.el-tabs__header {
    margin: 0;
}

.tabs>.el-tabs__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 15px 10px;
}

.tabs>.el-tabs__content>.el-tab-pane {
    min-height: 0;
    flex: 1;
    flex-shrink: 0;
    display: flex;
}

.tabs>.el-tabs__content>.el-tab-pane>.left {
    width: 30%;
    height: 100%;
    min-height: 0;
    flex-shrink: 0;
    overflow-y: auto;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
}

.tabs>.el-tabs__content>.el-tab-pane>.right {
    flex: 1;
    height: 100%;
    min-height: 0;
    flex-shrink: 0;
    overflow-y: auto;
}

.menu-item .m-button {
    visibility: hidden;
}

.menu-item:hover .m-button {
    visibility: visible;
}

.left-menu {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    border: 1px #ddd solid;
    margin-bottom: 10px;
}
</style>