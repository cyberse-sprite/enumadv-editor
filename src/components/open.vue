<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({ modelValue: String })

const value = ref(props.modelValue)
watch(() => props.modelValue, (newValue) => {
    value.value = newValue
})

const edit = ref(false)

</script>

<template>
    <span v-if="edit">
        <el-input v-model="value"></el-input>
    </span>
    <span v-else>
        <el-button text type="info">
            {{ value ? value : '未选择' }}
            <el-icon class="el-icon--right">
                <FolderOpened />
            </el-icon>
        </el-button>
    </span>
</template>
<script>

</script>