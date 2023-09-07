export class ListMap {
    list: Array<string> = []
    map: { [index: string]: any } = {}
    constructor(map: any = {}) {
        this.load(map)
    }
    load(map: any = {}) {
        this.map = {}
        this.list = []
        Object.assign(this.map, map)
        for (let key in this.map) {
            this.list.push(key)
        }
    }
    toJSON() {
        let json: { [index: string]: any } = {}
        for (let i in this.list) {
            json[this.list[i]] = this.map[this.list[i]]
        }
        return json
    }
    deleteItem(key: string) {
        this.list = this.list.filter((item: string) => item !== key)
        delete this.map[key]
    }
    renameItem(n: string, o: string) {
        this.list[this.list.findIndex(item => item == o)] = n
        this.map[n] = this.map[o]
        this.deleteItem(o)
    }
    addItem(key: string, value: any) {
        this.list.push(key)
        this.map[key] = value
    }
}