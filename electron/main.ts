import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { readConfig } from './home/config'
import { createProject } from './resource/create'
import { deleteProject } from './resource/delete'
import { loadProject } from './resource/load'
import { saveProject } from './resource/save'
import { selectWorkSpace } from './home/selectworkspace'
import { getCatalog } from './get/getfiles'
import { readFile, saveFile, createFile, createDir, deleteTarget, moveTarget } from './get/file'

process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  //新建窗口对象
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  //菜单
  //const menu = Menu.buildFromTemplate(myMenu);
  //Menu.setApplicationMenu(menu);

  //窗口载入完成
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
    readConfig(path, app, win)
  })

  //开发环境和打包环境
  if (VITE_DEV_SERVER_URL) {
    win.webContents.openDevTools()
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  win = null
})

app.whenReady().then(createWindow)

ipcMain.on('home:selectWorkSpace', () => {
  selectWorkSpace(path, app, win)
})

ipcMain.on('work:create', (_event, args) => {
  createProject(win, args.workspace, args.key, args.name)
})

ipcMain.on('work:delete', (_event, args) => {
  deleteProject(win, args.workspace, args.key)
})

ipcMain.on('work:load', (_event, args) => {
  loadProject(win, args.workspace, args.key)
})

ipcMain.on('work:save2', (_event, args) => {
  saveProject(win, args.workspace, args.key, args.resource)
})

ipcMain.on('get:init', (_event, a) => {
  win?.webContents.send('get:tree', getCatalog(`${a.workspace}/${a.key}/get`))
})

ipcMain.on('get:readfile', (_event, _args) => {
  win?.webContents.send('get:readfile', readFile(_args))
})

ipcMain.on('get:savefile', (_event, _args) => {
  saveFile(_args.path, _args.content)
  win?.webContents.send('get:savefile')
})

ipcMain.on('get:createfile', (_event, a) => {
  createFile(a.workspace, a.key, a.name)
  win?.webContents.send('get:tree', getCatalog(`${a.workspace}/${a.key}/get`))
})

ipcMain.on('get:createdir', (_event, a) => {
  createDir(a.workspace, a.key, a.name)
  win?.webContents.send('get:tree', getCatalog(`${a.workspace}/${a.key}/get`))
})

ipcMain.on('get:deletetarget', (_event, a) => {
  deleteTarget(a.path)
  win?.webContents.send('get:tree', getCatalog(`${a.workspace}/${a.key}/get`))
})

ipcMain.on('get:movetarget', (_event, a) => {
  moveTarget(a.path, a.to)
  win?.webContents.send('get:tree', getCatalog(`${a.workspace}/${a.key}/get`))
})


