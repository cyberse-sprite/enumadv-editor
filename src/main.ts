import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(createPinia())

app.mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))
