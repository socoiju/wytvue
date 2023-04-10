import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';

const app = createApp(App);

// 使用 Pinia 插件安装 Pinia 实例
const pinia = createPinia();
app.use(pinia);
app.mount('#app');

