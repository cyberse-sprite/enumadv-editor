<script setup lang="ts">
const props = defineProps({ lines: [Object, String, Number] });
</script>
<template>
    <div style="width: 100%;">
        <template v-if="['string', 'number'].includes(typeof props.lines)">
            <div>
                {{ props.lines }}
            </div>
        </template>
        <template v-if="(typeof props.lines) == 'object'">
            <div v-for="(line) in props.lines">
                {{ line }}
            </div>
        </template>
    </div>
</template>
<style scoped></style>