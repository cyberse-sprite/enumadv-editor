import { Ope } from "./ope"

interface SelectItem {
    if: string
    text: string
    next: string
}
interface inputItem {
    if: string
    label: string
    vari: Ope
}
interface RandItem {
    weight: string
    next: string
}

export interface EventItem {
    type: string,
    if?: string,
    text?: string
    get?: string
    insert?: string
    select?: Array<SelectItem>
    input?: Array<inputItem>
    rand?: Array<RandItem>
    next?: string
    ope?: Array<Ope>
}

export type EventType = 'text' | 'get' | 'ope' | 'insert' | 'next' | 'rand' | 'select' | 'input' | 'end' | 'pause'

export const getInitEventItem = () => {
    return {
        'text': {
            type: "text",
            text: ""
        },
        'get': {
            type: "get",
            get: ""
        },
        'ope': {
            type: "ope",
            ope: []
        },
        'insert': {
            type: "insert",
            insert: ""
        },
        'next': {
            type: "next",
            next: ""
        },
        'rand': {
            type: "rand",
            rand: []
        },
        'select': {
            type: "select",
            select: []
        },
        'input': {
            type: "input",
            input: [],
            next: ""
        },
        'pause': {
            type: "pause",
        },
        'end': {
            type: "end",
        }
    }
}