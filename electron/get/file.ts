import fs from 'fs-extra'
import paths from 'path'
export const readFile = (path: string) => {
    return fs.readFileSync(path, 'utf-8')
}

export const saveFile = (path: string, content: string) => {
    fs.writeFileSync(path, content, 'utf-8')
}

export const createFile = (workspace: string, key: string, name: string) => {
    fs.createFileSync(`${workspace}/${key}/get/${name}.txt`)
}

export const createDir = (workspace: string, key: string, name: string) => {
    const path = `${workspace}/${key}/get/${name}`
    if (!fs.existsSync(path))
        fs.mkdirSync(path)
}

export const deleteTarget = (path: string) => {
    fs.removeSync(path)
}

export const moveTarget = (path: string, to: string) => {
    fs.moveSync(path, to + '/' + paths.basename(path))
}