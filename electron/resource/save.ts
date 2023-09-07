import fs from 'fs-extra'

export const saveProject = (win: any, workspace: string, key: string, resource: any) => {
    const dirList = [
        `${workspace}/${key}`,
        `${workspace}/${key}/event`,
        `${workspace}/${key}/actor`,
        `${workspace}/${key}/vari`,
        `${workspace}/${key}/state`,
        `${workspace}/${key}/get`
    ]
    for (let dirName of dirList) {
        if (!fs.existsSync(dirName))
            fs.mkdirSync(dirName)
    }
    const fileList = [
        [`${workspace}/${key}/info.json`, resource.info],
        [`${workspace}/${key}/ui.json`, resource.ui]
    ]
    for (let type of ['event', 'state', 'vari', 'actor']) {
        for (let fileName in resource[type]) {
            fileList.push([
                `${workspace}/${key}/${type}/${fileName}.json`,
                resource[type][fileName]
            ])
        }
    }
    for (let item of fileList) {
        fs.writeFileSync(item[0], JSON.stringify(item[1], null, '\t'), 'utf-8')
    }
    win.webContents.send('work:save-finished')
}