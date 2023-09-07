import fs from 'fs-extra'
import { freshIndex } from '../home/freshindex'

export const deleteProject = (win: any, workspace: string, key: string) => {
    fs.removeSync(`${workspace}/${key}`)
    win.webContents.send('work:delete')
    freshIndex(workspace, win)
}