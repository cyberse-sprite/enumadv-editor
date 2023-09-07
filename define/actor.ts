export interface Actor {
    color: string
    name: {
        first: string
        last: String
        style: number
    }
    varis: { [index: string]: any }
    stats: { [index: string]: number }
}