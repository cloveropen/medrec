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
                  <v-list-item-title>
                    <strong>{{ item.text }}</strong>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              class="pl-8"
              v-for="(child, i) in item.children"
              :key="i"
              @click="clickMenu(child.id)"
            >
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
              <v-list-item-title>
                <strong>{{ item.text }}</strong>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      style="background-color:rgba(88, 203, 146, 0.72);"
      app
    >
      <v-toolbar-title style="width: 300px;color:#060736;" class="ml-0 pl-4">
        <v-app-bar-nav-icon color="#057982" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <strong class="hidden-sm-and-down">病案统计</strong>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon color="#F68059" to="/" v-on="on">
            <v-icon>mdi-help-network</v-icon>
          </v-btn>
        </template>
        <span>帮助手册</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn color="#FFBF39" icon to="/" v-on="on">
            <v-icon>notifications</v-icon>
          </v-btn>
        </template>
        <span>消息提醒</span>
      </v-tooltip>
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
    <v-dialog v-model="dialogSuccess" width="300">
      <v-card height="100" style="background-color:rgb(210, 241, 231)">
        <v-flex class="tooltip-success">系统提示</v-flex>
        <v-flex class="tooltip-success-content">
          <strong>{{dialogSuccessContent}}</strong>
        </v-flex>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogError" width="300">
      <v-card height="100" style="background-color: rgb(248, 125, 131)">
        <v-flex class="tooltip-error">系统警告</v-flex>
        <v-flex class="tooltip-error-content">
          <strong>{{dialogErrorContent}}</strong>
        </v-flex>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogLoading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          正在查询中... 请耐心等待
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-footer app>
      <v-flex class="text-center">
        {{ new Date().getFullYear() }}
        <strong>©cloveropen</strong>
      </v-flex>
    </v-footer>
  </div>
</template>

<script>
export default {
  props: {
    source: String,
    dialogSuccess: Boolean,
    dialogError: Boolean,
    dialogSuccessContent: String,
    dialogErrorContent: String,
    dialogLoading: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    dialogSuccess: false,
    dialogError: false,
    dialogSuccessContent: "成功",
    dialogErrorContent: "失败",
    dialogLoading: false,
    items: [
      {
        icon: "keyboard_arrow_down",
        "icon-alt": "keyboard_arrow_right",
        text: "病案首页",
        model: false,
        children: [
          { icon: "mdi-text-box-plus", text: "病案录入", id: "receive" },
          { icon: "mdi-text-box-check", text: "病案审核", id: "data_audit" },
          { icon: "mdi-folder-search", text: "病案查询", id: "query" }
        ]
      },
      {
        icon: "keyboard_arrow_down",
        "icon-alt": "keyboard_arrow_right",
        text: "统计报表",
        model: false,
        children: [
          { icon: "mdi-format-float-left", text: "病房报表", id: "ward_daily" },
          { icon: "mdi-format-float-none", text: "门诊报表", id: "outp_daily" },
          { icon: "mdi-format-float-right", text: "医技报表", id: "medi_daily" }
        ]
      },
      {
        icon: "keyboard_arrow_down",
        "icon-alt": "keyboard_arrow_right",
        text: "归档及借阅",
        model: false,
        children: [
          { icon: "mdi-file-lock", text: "病案归档与退回", id: "medrec_file" },
          { icon: "mdi-file-move",text: "病案借阅与归还",id: "medrec_borrow"},
          { icon: "mdi-file-eye", text: "病案跟踪", id: "medrec_track" }
        ]
      },
      {
        icon: "keyboard_arrow_down",
        "icon-alt": "keyboard_arrow_right",
        text: "病案输出",
        model: false,
        children: [
          { icon: "print", text: "病案打印", id: "medrec_prn" },
          {
            icon: "mdi-file-multiple",
            text: "病案复印登记",
            id: "medrec_copy"
          },
          { icon: "file_upload", text: "数据上报", id: "data_upload" }
        ]
      },
      {
        icon: "keyboard_arrow_down",
        "icon-alt": "keyboard_arrow_right",
        text: "词典查看",
        model: false,
        children: [
          {
            icon: "mdi-folder-key-network",
            text: "诊断编码词典",
            id: "dict_icd10"
          },
          {
            icon: "mdi-account-settings",
            text: "手术编码词典",
            id: "dict_icd9_cm"
          },
          {
            icon: "mdi-account-settings",
            text: "中医病证词典",
            id: "dict_dise_synd"
          }
        ]
      },
      {
        icon: "keyboard_arrow_down",
        "icon-alt": "keyboard_arrow_right",
        text: "系统管理",
        model: false,
        children: [
          {
            icon: "mdi-folder-key-network",
            text: "权限管理",
            id: "role_setter"
          },
          { icon: "mdi-account-settings", text: "用户管理", id: "user_setter" }
        ]
      },
      // { icon: "history", text: "催交病案", id: "urge" },
      // { icon: "lock_open", text: "解锁病案", id: "unlock" },
      { icon: "mdi-logout-variant", text: "退出登录", id: "logout" }
    ]
  }),
  watch: {
    //定时关掉弹框
    dialogError(val) {
      if (!val) return setTimeout(() => (this.dialogError = false), 2000);
    },
    dialogSuccess(val) {
      if (!val) return setTimeout(() => (this.dialogSuccess = false), 2000);
    },
  },
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
        case "medrec_copy":
          this.$router.push({ path: "/medrec_copy" });
          break;
        case "medrec_prn":
          this.$router.push({ path: "/medrec_prn" });
          break;
        case "urge":
          this.$router.push({ path: "/urge" });
          break;
        case "unlock":
          this.$router.push({ path: "/unlock" });
          break;
        case "medrec_file":
          this.$router.push({ path: "/medrec_file" });
          break;
        case "medrec_borrow":
          this.$router.push({ path: "/medrec_borrow" });
          break;
        case "medrec_track":
          this.$router.push({ path: "/medrec_track" });
          break;
        case "role_setter":
          this.$router.push({ path: "/role_setter" });
          break;
        case "user_setter":
          this.$router.push({ path: "/user_setter" });
          break;
        case "dict_icd10":
          this.$router.push({ path: "/dict_icd10" });
          break;
        case "dict_icd9_cm":
          this.$router.push({ path: "/dict_icd9_cm" });
          break;
        case "dict_dise_patt":
          this.$router.push({ path: "/dict_dise_patt" });
          break;
        default:
          localStorage.removeItem("user");
          this.$router.push({ path: "/" });
      }
    },
    selectSource() {
      window.location.href = "http://www.cloveropen.com";
    }
  }
};
</script>
<style scoped>
.tooltip-success {
  background-color: rgb(76, 203, 207);
  font-size: 12px;
  padding-left: 5px;
}
.tooltip-success-content {
  font-size: 18px;
  text-align: center;
  margin: 25px 0 0 0;
}
.tooltip-error {
  background-color: rgb(248, 91, 91);
  font-size: 12px;
  padding-left: 5px;
}
.tooltip-error-content {
  font-size: 18px;
  text-align: center;
  margin: 25px 0 0 0;
}
</style>