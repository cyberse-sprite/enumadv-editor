import { Ui } from "./ui"
import { State } from "./state"
import { EventItem } from "./event"
import { Vari } from "./vari"
import { Actor } from "./actor"
import { Info } from "./info"

export interface EventData { [index: string]: Array<EventItem> }

export interface VariData { [index: string]: Vari }

export interface StateData { [index: string]: State }

export interface ActorData { [index: string]: Actor }

export interface Resource {
    info: Info
    ui: Ui
    event: { [index: string]: EventData }
    vari: { [index: string]: VariData }
    state: { [index: string]: StateData }
    actor: { [index: string]: ActorData }
}

export type ResType = 'event' | 'actor' | 'vari' | 'state'