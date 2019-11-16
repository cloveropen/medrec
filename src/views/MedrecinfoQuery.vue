<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container>
      <div>
        <v-toolbar>
          <v-toolbar-title>卫统表</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </v-toolbar>
      </div>
      <!-- 按时间查询 时间选择器 -->
      <v-row>
        <v-col cols="8" sm="6" md="3">
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="200px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateBegin"
                label="开始时间"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateBegin" locale="zh-cn" @input="menu1 = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="8" sm="4" md="3">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="200px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="dateEnd" label="结束时间" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="dateEnd" height="100%" locale="zh-cn" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="8" sm="6" md="3">
          <v-text-field label="请输入住院号" outlined></v-text-field>
        </v-col>
        <v-col cols="8" sm="6" md="2">
          <v-btn class="ma-2" outlined color="indigo">查 询</v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="10"
        class="elevation-1"
        locale="zh-CN"
      ></v-data-table>
    </v-container>
  </v-app>
</template>
<script>
import Basepage from "../components/Basepage";
export default {
  components: {
    Basepage
  }, 
  mounted:
   function () {
      let sel = this;
          fetch(process.env.VUE_APP_MAIN_URL+"medrec", {
              method: "get",
              mode: "cors", 
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              }
        })
        .then(function(response) {
          if (response.ok) {
          } else {
            window.alert("查询失败error");
            sel.loginmsg = "查询失败" + response.err;
          }
          return response.json();
        })
        .then(function(data) {
           console.log("data=" + JSON.stringify(data)); // this will be a string
          let topstatus = data.resultCode;
          if (topstatus == "0") {
           console.log(topstatus); // this will be a string
           sel.desserts=JSON.parse(data.outdata);
          } else {
            //查询失败
            window.alert("查询失败!\n");
            sel.loginmsg = "查询失败";
          }
        })
        .catch(function(err) {
          window.alert("error=" + err);
        });
    },
  data: () => ({
    dateBegin: new Date().toISOString().substr(0, 10),
    dateEnd: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    items: [
      {
        text: "患者查询",
        disabled: true,
        href: "medrecinfoQuery"
      }
    ],
    headers: [
      {
        text: "病案号",
        align: "left",
        sortable: false,
        value: "caseNo"
      },
      { text: "姓名", value: "pname" },
      { text: "性别", value: "gender" },
      { text: "年龄", value: "age" },
      { text: "出生日期", value: "birthday" },
      { text: "现住址", value: "presentAddr" }
      
    ],
    desserts: []
  })
};
</script>
