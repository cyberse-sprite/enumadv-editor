<script setup lang="ts">
import MyTabs from './_tabs.vue'
import OneMoreLine from '../../components/onemoreline.vue'
import MyList from '../../components/list.vue'
import { useWorkStore } from '../../stores/work';
import { ref } from 'vue'
import EventNew from './eventnew.vue'
import EventEdit from './eventedit.vue'
import { EventItem } from '../../../define/event';
import { watch } from 'vue';

const work = useWorkStore()
const activeIndex = ref('')
const activeTab = ref('')

const addTarget = () => {
    work.resource.event[activeTab.value][activeIndex.value] = []
}

const editDia = ref(false)
const editIndex = ref(-1)
const editEventData = ref(<EventItem>{ type: 'text' })
const editEvent = (index: any) => {
    editIndex.value = index
    editDia.value = true
}

watch(() => editEventData.value, () => {
    work.resource.event[activeTab.value][activeIndex.value][editIndex.value] = editEventData.value
})

watch(() => editIndex.value, () => {
    editDia.value = true
    editEventData.value = JSON.parse(JSON.stringify(work.resource.event[activeTab.value][activeIndex.value][editIndex.value]))
})

</script>

<template>
    <my-tabs type="event" v-model:active-index="activeIndex" v-model:active-tab="activeTab" @add-target="addTarget">
        <template #default="p" v-if="work.resource.event[activeTab]">
            <my-list v-model="p.item">
                <template #content="g">
                    <div class="event-item">
                        <div>
                            <el-tag size="large" effect="dark" style="width: 70px;">{{ g.item.type }}</el-tag>
                        </div>
                        <div style="flex: 1;margin: 0px 10px;">
                            <el-form>
                                <el-form-item v-if="g.item.if" label="条件">
                                    <one-more-line :lines="g.item.if"></one-more-line>
                                </el-form-item>
                                <el-form-item v-if="g.item.text" label="文字">{{ g.item.text }}</el-form-item>
                                <el-form-item v-if="g.item.get" label="文本">{{ g.item.get }}</el-form-item>
                                <el-form-item v-if="g.item.rand" label="随机">
                                    <div class="inter-item" v-for="inter in g.item.rand">
                                        <el-form>
                                            <el-form-item label="权重">{{ inter.weight }}</el-form-item>
                                            <el-form-item label="转跳">{{ inter.next }}</el-form-item>
                                        </el-form>
                                    </div>
                                </el-form-item>
                                <el-form-item v-if="g.item.select" label="选择">
                                    <div class="inter-item" v-for="inter in g.item.select">
                                        <el-form>
                                            <el-form-item label="条件">{{ inter.if }}</el-form-item>
                                            <el-form-item label="文本">{{ inter.text }}</el-form-item>
                                            <el-form-item label="转跳">{{ inter.next }}</el-form-item>
                                        </el-form>
                                    </div>
                                </el-form-item>
                                <el-form-item v-if="g.item.input" label="输入">
                                    <div class="inter-item" v-for="inter in g.item.input">
                                        <el-form>
                                            <el-form-item label="条件">{{ inter.if }}</el-form-item>
                                            <el-form-item label="标签">{{ inter.label }}</el-form-item>
                                            <el-form-item label="变量">{{ inter.vari }}</el-form-item>
                                        </el-form>
                                    </div>
                                </el-form-item>
                                <el-form-item v-if="g.item.ope" label="操作">
                                    <one-more-line :lines="g.item.ope"></one-more-line>
                                </el-form-item>
                                <el-form-item v-if="g.item.next" label="转跳">{{ g.item.next }}</el-form-item>
                                <el-form-item v-if="g.item.insert" label="插入">{{ g.item.insert }}</el-form-item>
                            </el-form>
                        </div>
                    </div>
                </template>
                <template #edit="{ index }">
                    <el-button @click="editEvent(index)" text circle>
                        <el-icon>
                            <Edit />
                        </el-icon>
                    </el-button>
                </template>
            </my-list>
            <div>
                <event-new v-model:active-index="activeIndex" v-model:active-tab="activeTab"
                    v-model:edit-index="editIndex"></event-new>
            </div>
        </template>
    </my-tabs>
    <event-edit v-model:is-show="editDia" v-model:form-data="editEventData"></event-edit>
</template>