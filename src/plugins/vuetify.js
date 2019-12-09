import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  }
  //可以自定义主题
  // theme: {
  //   themes: {
  //     light: {
  //       primary: "#1976D2",
  //       secondary: "#424242",
  //       accent: "#82B1FF",
  //       error: "#FF5252",
  //       info: "#2196F3",
  //       success: "#4CAF50",
  //       warning: "#FFC107"
  //     }
  //   }
  // }
});
