import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
    state: () => ({
        config: { workspace: '' },
        index: {}
    }),
    getters: {
        workspace: (state) => state.config.workspace,
    },
    actions: {
        setConfig(c: any) {
            Object.assign(this.config, c)
        },
        setIndex(i: any) {
            this.index = i
        }
    },
})