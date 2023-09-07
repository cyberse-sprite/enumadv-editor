import fs from 'fs-extra'
import path from 'path'
export const getCatalog = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    let filesNameArr = []
    // 用个hash队列保存每个目录的深度
    let mapDeep = <{ [index: string]: any }>{}
    mapDeep[dir] = 0
    // 先遍历一遍给其建立深度索引
    const getMap = (dir: string, curIndex: any) => {
        let files = fs.readdirSync(dir) //同步拿到文件目录下的所有文件名
        files.map(function (file) {
            //let subPath = path.resolve(dir, file) //拼接为绝对路径
            let subPath = path.join(dir, file) //拼接为相对路径
            let stats = fs.statSync(subPath) //拿到文件信息对象
            // 必须过滤掉node_modules文件夹
            if (file != 'node_modules') {
                mapDeep[file] = curIndex + 1
                if (stats.isDirectory()) { //判断是否为文件夹类型
                    return getMap(subPath, mapDeep[file]) //递归读取文件夹
                }
            }
        })
    }
    var treeindex = 1
    getMap(dir, mapDeep[dir])
    const readdirs = (dirp: string, folderName: string, _myroot: any) => {
        let result = { //构造文件夹数据
            id: treeindex++,
            path: dirp,
            title: path.basename(dirp),
            type: 'directory',
            deep: mapDeep[folderName],
            children: <any[]>[],
            hasChild: false
        }
        let files = fs.readdirSync(dirp) //同步拿到文件目录下的所有文件名
        result.children = files.map(function (file) {
            //let subPath = path.resolve(dir, file) //拼接为绝对路径
            let subPath = path.join(dirp, file) //拼接为相对路径
            let stats = fs.statSync(subPath) //拿到文件信息对象
            if (stats.isDirectory()) { //判断是否为文件夹类型
                return readdirs(subPath, file, file) //递归读取文件夹
            }
            return { //构造文件数据
                id: treeindex++,
                path: subPath.replace(/\\/g, "/"),
                rePath: subPath.replace(/\\/g, "/").replace(dir, ''),
                title: file,
                type: 'file'
            }

        })
        if (result.children.length > 0) {
            result.hasChild = true
        }
        return result //返回数据
    }
    filesNameArr.push(readdirs(dir, dir, null))
    return filesNameArr
}

