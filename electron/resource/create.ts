import { Resource } from "../../define/resource";
import { freshIndex } from "../home/freshindex";
import { saveProject } from './save';

export const createProject = (win: any, workspace: string, key: string, name: string) => {
    const resource: Resource = {
        info: {
            key: key,
            name: name,
            intro: "",
            image: "",
            records: [],
            resource: {
                state: ["state"],
                event: ["event"],
                actor: ["actor"],
                vari: ["vari"],
            }
        },
        ui: {
            view: {
                top: [],
                side: []
            },
            button: []
        },
        event: { event: {} },
        state: { state: {} },
        vari: { vari: {} },
        actor: { actor: {} }
    }
    saveProject(win, workspace, key, resource)
    win.webContents.send("work:create", resource)
    freshIndex(workspace, win)
}