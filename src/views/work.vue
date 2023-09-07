<script setup lang="ts">
import { ref } from 'vue'
import { ipcRenderer } from 'electron'
import { useWorkStore } from '../stores/work';
import { useGlobalStore } from '../stores/global';
import { ElMessage } from 'element-plus';

const work = useWorkStore()
const global = useGlobalStore()

ipcRenderer.on('work:save1', () => {
  save()
})
const save = () => {
  ipcRenderer.send('work:save2', {
    workspace: global.workspace,
    key: work.key,
    resource: JSON.parse(JSON.stringify(work.resource))
  })
}

ipcRenderer.on('work:save-finished', () => {
  ElMessage.success('保存成功')
})

const activeIndex = ref('/work/info')

</script>

<template>
  <div class="box">
    <div class="head">
      <div style="flex: 1;">
        <el-menu mode="horizontal" :default-active="activeIndex" router>
        <el-menu-item index="/">
          <el-icon size="40" style="height: 100%;">
            <home-filled></home-filled>
          </el-icon>
          主页
        </el-menu-item>
        <el-menu-item index="/work/info">信息</el-menu-item>
        <el-menu-item index="/work/ui">交互</el-menu-item>
        <el-menu-item index="/work/event">事件</el-menu-item>
        <el-menu-item index="/work/state">状态</el-menu-item>
        <el-menu-item index="/work/vari">变量</el-menu-item>
        <el-menu-item index="/work/actor">角色</el-menu-item>
        <el-menu-item index="/work/get">文本</el-menu-item>
      </el-menu>
      </div>
      <el-button @click="save" primary>保存</el-button>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
}

.main {
  flex: 1;
  height: 100%;
  min-height: 0;
  flex-shrink: 0;
  overflow: hidden;
}

.head{
  display: flex;
}
</style>
