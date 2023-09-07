<script setup lang="ts">
import MyOpen from '../components/open.vue'
import { ref } from 'vue'
import { useWorkStore } from '../stores/work';
import { useGlobalStore } from '../stores/global';
import { ipcRenderer } from 'electron'
import { useRouter } from 'vue-router';

const global = useGlobalStore()
const work = useWorkStore()
const router = useRouter()

const createDia = ref(false)
const key = ref('')
const name = ref('')

const selectWorkSpace = () => {
    ipcRenderer.send('home:selectWorkSpace')
}

const clickCreate = () => {
    ipcRenderer.send("work:create", { workspace: global.workspace, key: key.value, name: name.value })
}

const clickDelete = (skey: string) => {
    ipcRenderer.send("work:delete", { workspace: global.workspace, key: skey })
}

const clickLoad = (skey: string) => {
    work.setKey(skey)
    ipcRenderer.send("work:load", { workspace: global.workspace, key: skey })
}

ipcRenderer.on('config:load', (_event, args) => {
    global.setConfig(args)
})

ipcRenderer.on('index:update', (_event, args) => {
    global.setIndex(args)
})

ipcRenderer.on('work:load', (_event, args) => {
    work.setResource(args)
    router.push('/work/info')
})

</script>

<template>
    <div class="home">
        <el-card>
            <template #header>
                <div style="display: flex;align-items: center;">
                    <div>
                        工程列表
                    </div>
                    <div style="flex: 1;"></div>
                    <el-text type="info" style="margin-right: 10px;">工作空间</el-text>
                    <my-open v-model="global.config.workspace" @click="selectWorkSpace"></my-open>
                </div>
            </template>
            <div v-for="(item, index) in global.index" class="project-item">
                <div style="flex: 1;" @click="clickLoad(index)">
                    <div>
                        <el-text size="large">{{ item }}</el-text>
                    </div>
                    <div>
                        <el-text size="small">{{ global.config.workspace }}/{{ index }}</el-text>
                    </div>
                </div>
                <div>
                    <el-button type="danger" @click="clickDelete(index)" style="height: 100%;" plain>
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>
                </div>
            </div>
            <div>
                <el-button @click="createDia = true; key = ''">创建工程</el-button>
            </div>
        </el-card>
        <el-dialog v-model="createDia" title="新建工程" width="340px">
            <el-form>
                <el-form-item label="标识">
                    <el-input v-model="key"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="name"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="createDia = false">取消</el-button>
                    <el-button type="primary" @click="clickCreate(); createDia = false">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped>
.home {
    padding: 10px;
}

.project-item {
    margin: 5px;
    padding: 12px;
    background-color: #f8f8f8;
    border-radius: 5px;
    display: flex;
}

.project-item:hover {
    background-color: #f4f4f4;
    cursor: pointer;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>