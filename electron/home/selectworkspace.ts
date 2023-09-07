import { dialog } from 'electron'
import { saveConfig } from './config'
import { freshIndex } from '../home/freshindex'

export const selectWorkSpace=(path:any, app:any, win:any)=>{
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(result => {
        let workspace = result.filePaths[0]
        if (!workspace) {
            return
        } else {
            workspace = workspace.replace(/\\/g, "/")
            saveConfig(path, app, workspace, win)
            freshIndex(workspace, win)
        }
    })
}