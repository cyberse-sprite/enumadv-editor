
import fs from 'fs'

export const freshIndex = (workspace: string, win: any) => {
    var index: { [index: string]: string } = {}
    fs.readdir(workspace, (err, files) => {
        if (err) {
            console.error(err)
            return
        }
        for (var i in files) {
            const infoPath = `${workspace}/${files[i]}/info.json`
            var stat = fs.existsSync(infoPath)
            if (stat) {
                var data = fs.readFileSync(infoPath, 'utf-8')
                if (data) {
                    const info = JSON.parse(data)
                    index[info.key] = info.name
                }
            }
        }
        fs.writeFileSync(`${workspace}/index.json`, JSON.stringify(index, null, '\t'), 'utf-8')
        win.webContents.send('index:update', index)
    })
}
