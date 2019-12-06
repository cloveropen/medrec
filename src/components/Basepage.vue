<template>
  <div>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app >
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
                  <v-list-item-title><strong>{{ item.text }}</strong></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item  class="pl-8" v-for="(child, i) in item.children" :key="i" @click="clickMenu(child.id)">
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
              <v-list-item-title><strong>{{ item.text }}</strong></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" style="background-color:rgba(88, 203, 146, 0.72);" app>
        <v-toolbar-title style="width: 300px;color:#060736;" class="ml-0 pl-4">
          <v-app-bar-nav-icon  color="#057982" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <strong class="hidden-sm-and-down">病案统计</strong>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip right >
        <template v-slot:activator="{ on }">
          <v-btn icon color="#F68059" to="/">
            <v-icon>thumb_up_alt</v-icon>
          </v-btn>
        </template>
        <span>帮助手册</span>
      </v-tooltip>
      <v-btn color="#FFBF39" icon to="/" >
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large @click="selectSource">
        <v-avatar size="32px" item>
          <v-img :src="require('../assets/logo.svg')" alt="苜蓿草科技"></v-img>
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn bottom color="#FF6A4D" dark fab fixed right @click="clickMenu('home')" v-on="on">
          <v-icon>home</v-icon>
        </v-btn>
      </template>
      <span>返回主页</span>
    </v-tooltip>
    <v-footer app >
      <v-spacer></v-spacer>
      <div class="text-center">
        {{ new Date().getFullYear() }}<strong>©cloveropen</strong>
      </div>
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
      {
        icon: "keyboard_arrow_down",
        "icon-alt":"keyboard_arrow_right",
        text: "病案接收",
        model: false,
        children: [
          { icon: "assignment", text: "病案录入", id: "receive" },
          { icon: "hourglass_full", text: "病案查询", id: "query" },
          { icon: "supervisor_account", text: "数据审核", id: "data_audit" },
          { icon: "file_upload", text: "数据上报", id: "data_upload" }
        ]
      },
      // {
      //   icon: "keyboard_arrow_down",
      //   "icon-alt":"keyboard_arrow_right",
      //   text: "病案借阅",
      //   model: false,
      //   children: [
      //     { text: "纸质病案借阅登记", id: "lend_paper" },
      //     { text: "纸质病案归还登记", id: "back_paper" },
      //     { text: "网络病案调阅登记", id: "lend_net" },
      //     { text: "患者微信病案借阅预约", id: "weixin_reg" }
      //   ]
      // },
       {
       icon: "keyboard_arrow_down",
        "icon-alt":"keyboard_arrow_right",
        text: "统计报表",
        model: false,
        id: "receive",
        children: [
          { icon: "assignment",text: "病房日报", id: "ward_daily" },
          { icon: "assignment",text: "门诊日报", id: "outp_daily" },
          { icon: "assignment",text: "医技日报", id: "medi_daily" }
        ]
      },
      {
        icon: "keyboard_arrow_down",
        "icon-alt":"keyboard_arrow_right",
        text: "病案输出",
        model: false,
        children: [
          { text: "病案复印登记", id: "copy_reg" },
          { text: "病案打印", id: "prn_rec" }
        ]
      },
      { icon: "history", text: "催交病案", id: "urge" },
      { icon: "content_copy", text: "解锁病案", id: "unlock" },
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
        case "query":
          this.$router.push({ path: "/query" });
          break;
        case "data_audit":
          this.$router.push({ path: "/data_audit" });
          break;
        case "data_upload":
          this.$router.push({ path: "/data_upload" });
          break;
        case "ward_daily":
          this.$router.push({ path: "/ward_daily" });
          break;
        case "outp_daily":
          this.$router.push({ path: "/outp_daily" });
          break;
        case "medi_daily":
          this.$router.push({ path: "/medi_daily" });
          break;
        case "copy_reg":
          this.$router.push({ path: "/copy_reg" });
          break;
        case "prn_rec":
          this.$router.push({ path: "/prn_rec" });
          break;
        case "urge":
          this.$router.push({ path: "/urge" });
          break;
        case "unlock":
          this.$router.push({ path: "/unlock" });
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
