import { createApp } from "vue";
import "./style.css";
import "virtual:windi.css";
import "virtual:windi-devtools";
import App from "./App.vue";
import router from "./router";
import Antd, { message } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);

app.config.globalProperties.$message = message;

app.use(router).use(Antd).mount("#app");
