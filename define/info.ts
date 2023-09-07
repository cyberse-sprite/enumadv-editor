interface Record {
    name: string
    intro: string
    hide: string
}

export interface Info {
    key: string
    name: string
    intro: string
    image: string
    resource: {
        event: string[]
        vari: string[]
        state: string[]
        actor: string[]
    }
    records: Array<Record>
}