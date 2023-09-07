import { Ope } from "./ope"

interface ViewItem {
    'if': Ope
    target: Ope
    res?: Ope
    val?: string
    label?: string
    type?: 'single' | 'group'
    showValue?: boolean
    showZero?: boolean
}

interface View {
    top: Array<ViewItem>
    side: Array<ViewItem>
}

interface Button {
    'if': Ope
    text: string
    ope: Ope
}

export interface Ui {
    view: View
    button: Array<Button>
}