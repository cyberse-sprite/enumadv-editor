import fs from 'fs-extra'
import { ResType } from '../../define/resource'

const readSync = (name: string) => {
    return JSON.parse(fs.readFileSync(name, 'utf-8'))
}

type File = { [index: string]: any }

export const loadProject = (win: any, workspace: string, key: string) => {
    const types = ['event', 'vari', 'actor', 'state']
    const resource = {
        info: readSync(`${workspace}/${key}/info.json`),
        ui: readSync(`${workspace}/${key}/ui.json`),
        event: {} as File,
        state: {} as File,
        vari: {} as File,
        actor: {} as File
    }
    resource.info.resource = {
        event: [],
        state: [],
        vari: [],
        actor: []
    }
    for (let typename of types) {
        const files = fs.readdirSync(`${workspace}/${key}/${typename}`)
        for (let filename of files) {
            if (filename.endsWith('.json')) {
                const resname = filename.split('.')[0]
                resource[<ResType>typename][resname] = readSync(`${workspace}/${key}/${typename}/${filename}`)
                resource.info.resource[typename].push(resname)
            }
        }
    }
    win.webContents.send('work:load', resource)
}