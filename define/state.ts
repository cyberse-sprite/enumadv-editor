import { Ope } from "./ope"

export interface State {
    color: string
    events: { [index: string]: number | Ope }
}