<script setup lang="ts">
import { ref } from 'vue'
import { EventItem, EventType, getInitEventItem } from '../../../define/event';
import { watch } from 'vue';
import MyInput from '../../components/input.vue'
import MyOpe from '../../components/ope.vue'
import MyLine from './_line.vue'
import MyGet from './_get.vue'
import MyList from '../../components/list.vue'

const props = defineProps({ isShow: Boolean, formData: Object })
const emit = defineEmits(['update:isShow', 'update:formData'])

const dia = ref(props.isShow)
watch(() => props.isShow, () => {
    dia.value = props.isShow
})
watch(() => dia.value, () => {
    emit('update:isShow', dia.value)
})
const form = ref(<EventItem>{})
watch(() => props.formData, () => {
    form.value = <EventItem>props.formData
})

const events = getInitEventItem()
const comfirm = () => {
    let target = getInitEventItem()[<EventType>form.value.type]
    for (var i in target) {
        //@ts-ignore
        target[i] = form.value[i]
    }
    if (form.value.if) {
        if (form.value.if.trim() != "") {
            //@ts-ignore
            target.if = form.value.if.trim()
        }
    }
    form.value = target
    emit("update:formData", form.value)
    dia.value = false
}
</script>

<template>
    <el-dialog v-model="dia">
        <el-form v-model="form">
            <el-form-item label="事件类型" prop="type">
                <el-select v-model="form.type">
                    <el-option v-for="(_item, index) in events" :label="index" :value="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="条件" prop="if">
                <my-input v-model="form.if"></my-input>
            </el-form-item>
            <el-form-item label="文字" v-if="form.type == 'text'">
                <my-input v-model="form.text" type="textarea"></my-input>
            </el-form-item>
            <el-form-item label="文本" v-if="form.type == 'get'">
                <my-get v-model="form.get"></my-get>
            </el-form-item>
            <el-form-item label="插入" v-if="form.type == 'insert'">
                <my-line v-model="form.insert" add-from="event"></my-line>
            </el-form-item>
            <el-form-item label="操作" v-if="form.type == 'ope'">
                <my-ope v-model="form.ope"></my-ope>
            </el-form-item>
            <el-form-item label="随机" v-if="form.type == 'rand'">
                <my-list v-model="form.rand">
                    <template #content="{ item }">
                        <el-form-item label="权重">
                            <my-input v-model="item.weight"></my-input>
                        </el-form-item>
                        <el-form-item label="转跳">
                            <my-line v-model="item.next" add-from="event"></my-line>
                        </el-form-item>
                    </template>
                </my-list>
            </el-form-item>
            <el-form-item label="选择" v-if="form.type == 'select'">
                <my-list v-model="form.select">
                    <template #content="{ item }">
                        <el-form-item label="条件">
                            <my-input v-model="item.if"></my-input>
                        </el-form-item>
                        <el-form-item label="文本">
                            <my-input v-model="item.text"></my-input>
                        </el-form-item>
                        <el-form-item label="转跳">
                            <my-line v-model="item.next" add-from="event"></my-line>
                        </el-form-item>
                    </template>
                </my-list></el-form-item>
            <el-form-item label="输入" v-if="form.type == 'input'">
                <my-list v-model="form.input">
                    <template #content="{ item }">
                        <el-form-item label="条件">
                            <my-input v-model="item.if"></my-input>
                        </el-form-item>
                        <el-form-item label="标签">
                            <my-input v-model="item.label"></my-input>
                        </el-form-item>
                        <el-form-item label="变量">
                            <my-input v-model="item.vari"></my-input>
                        </el-form-item>
                    </template>
                </my-list></el-form-item>
            <el-form-item label="转跳" v-if="['input', 'next'].includes(form.type)">
                <my-line v-model="form.next" add-from="event"></my-line>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="comfirm">确定</el-button>
        </template>
    </el-dialog>
</template>