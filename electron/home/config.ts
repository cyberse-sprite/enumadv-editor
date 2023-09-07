import fs from 'fs'
import { freshIndex } from './freshindex';

export const readConfig = (path: any, app: any, win: any) => {
    let exePath = path.dirname(app.getPath('exe')).replace(/\\/g, "/");
    let configPath = `${exePath}/config.json`;

    if (fs.existsSync(configPath)) {
        fs.readFile(configPath, 'utf-8', (_err, data) => {
            if (data) {
                let configContent = JSON.parse(data)
                win.webContents.send('config:load', configContent)
                freshIndex(configContent.workspace, win)
            }
        })
    }
}

export const saveConfig = (path: any, app: any, workspace: string, win: any) => {
    let exePath = path.dirname(app.getPath('exe')).replace(/\\/g, "/");
    let configPath = `${exePath}/config.json`;

    var configContent = null
    if (fs.existsSync(configPath)) {
        const data = fs.readFileSync(configPath, 'utf-8')
        if (data) {
            configContent = JSON.parse(data)
            configContent.workspace = workspace
        }
    } else {
        configContent = { workspace }
    }
    if (!configContent) return
    fs.writeFileSync(configPath, JSON.stringify(configContent, null, '\t'), 'utf-8')
    win.webContents.send('config:load', configContent)
}