import { defineStore } from 'pinia'
import { Resource,ResType } from '../../define/resource'

export const useWorkStore = defineStore('work', {
    state: () => ({
        resource: { info: {} } as Resource
    }),
    getters: {
        key: (state) => {
            return state.resource.info.key
        }
    },
    actions: {
        setResource(r: any) {
            this.resource = r
        },
        setKey(k: string) {
            this.resource.info.key = k
        },
        isFileExists(t: ResType, n: string) {
            if (this.resource.info.resource[t].includes(n))
                return true
            return false
        },
        addFile(t: ResType, n: string) {
            if (this.isFileExists(t, n)) {
                return false
            }
            this.resource.info.resource[t].push(n)
            this.resource[t][n] = {}
            return true
        },
        removeFile(t: ResType, n: string) {
            if (this.isFileExists(t, n)) {
                this.resource.info.resource[t] = this.resource.info.resource[t].filter((item) => item !== n)
                delete this.resource[t][n]
                return true
            }
            return false
        }
    }
})