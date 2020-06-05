import Vue from "vue";
import App from "./App.vue";
import { router } from "./router/router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import highcharts from "highcharts";
import VueHtmlToPaper from "vue-html-to-paper";
import pdf from 'vue-pdf'

// 引入样式
import "@mdi/font/css/materialdesignicons.css";
import "vue-easytable/libs/themes-base/index.css";
// 导入 table 和 分页组件
import { VTable, VPagination } from "vue-easytable";

const options = {
  name: "blank",
  specs: ["fullscreen=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css"
  ]
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  highcharts,
  pdf,
  render: h => h(App)
}).$mount("#app");

Vue.use(VueHtmlToPaper, options);
// 注册到全局
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);
