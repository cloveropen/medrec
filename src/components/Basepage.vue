<template>
  <div>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" @click="clickMenu(child.id)">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" @click="clickMenu(item.id)">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">病案统计</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn icon to="/about" v-on="on">
            <v-icon>thumb_up_alt</v-icon>
          </v-btn>
        </template>
        <span>帮助手册</span>
      </v-tooltip>
      <v-btn icon to="/">
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large @click="selectSource">
        <v-avatar size="32px" item>
          <v-img :src="require('../assets/logo.svg')" alt="苜蓿草科技"></v-img>
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <!-- <v-container fluid fill-height>
      <v-layout justify-start>
        <v-img :src="require('../assets/main_bg.jpg')" />
      </v-layout>
    </v-container>-->
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn bottom color="pink" dark fab fixed right @click="clickMenu('home')" v-on="on">
          <v-icon>home</v-icon>
        </v-btn>
      </template>
      <span>返回主页</span>
    </v-tooltip>
    <v-footer absolute class="font-weight-medium" >
      <v-col class="text-center" cols="12" >
        {{ new Date().getFullYear() }} —
        <strong>cloveropen</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: "contacts", text: "病案接收", id: "receive" },
      { icon: "history", text: "催交病案", id: "urge" },
      { icon: "content_copy", text: "解锁病案", id: "unlock" },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "病案借阅",
        model: false,
        children: [
          { text: "纸质病案借阅登记", id: "lend_paper" },
          { text: "纸质病案归还登记", id: "back_paper" },
          { text: "网络病案调阅登记", id: "lend_net" },
          { text: "患者微信病案借阅预约", id: "weixin_reg" }
        ]
      },
      {
        icon: "settings",
        "icon-alt": "keyboard_arrow_down",
        text: "病案输出",
        model: false,
        children: [
          { text: "病案复印登记", id: "copy_reg" },
          { text: "病案打印", id: "prn_rec" }
        ]
      },
      { icon: "help", text: "退出登录", id: "logout" }
    ]
  }),
  methods: {
    clickMenu(tstr) {
      console.log("点击=" + tstr);
      if (tstr === "logout") {
        localStorage.removeItem("user");
        this.$router.push({ path: "/login" });
      }
      switch (tstr) {
        case "receive":
          this.$router.push({ path: "/receive" });
          break;
        case "urge":
          this.$router.push({ path: "/urge" });
          break;
        case "unlock":
          this.$router.push({ path: "/unlock" });
          break;
        case "lend_paper":
          this.$router.push({ path: "/lend_paper" });
          break;
        case "back_paper":
          this.$router.push({ path: "/back_paper" });
          break;
        case "lend_net":
          this.$router.push({ path: "/lend_net" });
          break;
        case "weixin_reg":
          this.$router.push({ path: "/weixin_reg" });
          break;
        case "copy_reg":
          this.$router.push({ path: "/copy_reg" });
          break;
        case "prn_rec":
          this.$router.push({ path: "/prn_rec" });
          break;
        default:
         // localStorage.removeItem("user");
          this.$router.push({ path: "/" });
      }
    },

    selectSource() {
      window.location.href = "http://www.cloveropen.com";
    }
  }
};
</script>
