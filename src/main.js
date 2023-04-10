import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);

// 使用 Pinia 插件安装 Pinia 实例
const pinia = createPinia();
app.use(pinia);
app.use(ElementPlus)
app.mount('#app');

