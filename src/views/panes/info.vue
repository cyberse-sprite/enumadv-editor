<script setup lang="ts">
import { computed } from 'vue'
import { useWorkStore } from '../../stores/work';
import MyInput from '../../components/input.vue'
import MyList from '../../components/list.vue'

const work = useWorkStore()
const info = computed(() => work.resource.info)

const addRecord = () => {
    info.value.records.push({
        name: "",
        intro: "",
        hide: ""
    })
}

</script>

<template>
    <div class="container">
        <div class="block">
            基本信息
            <el-form>
                <el-form-item label="标识">
                    <my-input v-model="info.key"></my-input>
                </el-form-item>
                <el-form-item label="标题">
                    <my-input v-model="info.name"></my-input>
                </el-form-item>
                <el-form-item label="简介">
                    <my-input v-model="info.intro" type="textarea"></my-input>
                </el-form-item>
                <el-form-item label="图片">
                    <my-input v-model="info.image"></my-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="block">
            关联文件
            <el-form>
                <el-form-item label="事件">
                    <el-tag v-for="item in info.resource.event" style="margin-right: 10px;">{{ item }}</el-tag>
                </el-form-item>
                <el-form-item label="变量">
                    <el-tag v-for="item in info.resource.vari" style="margin-right: 10px;">{{ item }}</el-tag>
                </el-form-item>
                <el-form-item label="状态">
                    <el-tag v-for="item in info.resource.state" style="margin-right: 10px;">{{ item }}</el-tag>
                </el-form-item>
                <el-form-item label="角色">
                    <el-tag v-for="item in info.resource.actor" style="margin-right: 10px;">{{ item }}</el-tag>
                </el-form-item>
            </el-form>
        </div>
        <div class="block">
            <div style="display: flex;align-items: center;">
                <div>成就</div>
                <div style="flex: 1;"></div>
                <el-button type="primary" @click="addRecord">添加成就</el-button>
            </div>
            <my-list v-model="info.records">
                <template #content="{ item }">
                    <el-form-item>
                        <el-form>
                            <el-form-item label="名称">
                                <my-input v-model="item.name"></my-input>
                            </el-form-item>
                            <el-form-item label="描述">
                                <my-input v-model="item.intro"></my-input>
                            </el-form-item>
                            <el-form-item label="提示">
                                <my-input v-model="item.hide"></my-input>
                            </el-form-item>
                        </el-form>
                    </el-form-item>
                </template>
            </my-list>
        </div>
    </div>
</template>

<style></style>