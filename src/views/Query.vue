<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container>
      <div>
        <v-toolbar>
          <v-toolbar-title>病案查询</v-toolbar-title>
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
          <v-btn class="ma-2" outlined color="indigo" @click="selectMedrecInfo()">查 询</v-btn>
        </v-col>
      </v-row>
      <v-simple-table >
            <template>
              <thead>
                <tr>
                  <th class="text-center" >病案号</th>
                  <th class="text-center" >姓名</th>
                  <th class="text-center" >性别</th>
                  <th class="text-center" >年龄</th>
                  <th class="text-center" >身份证号</th>
                  <th class="text-center" >入院时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in medrecInfo" :key="item.caseNo">
                  <td class="text-center">{{ item.caseNo }}</td>
                  <td class="text-center">{{ item.pname }}</td>
                  <td class="text-center">{{ item.gender }}</td>
                  <td class="text-center">{{ item.age }}</td>
                  <td class="text-center">{{ item.idcard }}</td>
                  <td class="text-center">{{ item.admTime }}</td>
                </tr>
              </tbody>
              </template>
          </v-simple-table>
    </v-container>
  </v-app>
</template>
<script>
import Basepage from "../components/Basepage";
export default {
  components: {
    Basepage
  },
  data: () => ({
    dateBegin: new Date().toISOString().substr(0, 10),
    dateEnd: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    medrecInfo:[],
    items: [
      {
        text: "患者信息查询",
        disabled: true,
        href: "breadcrumbs_link_1"
      }
    ]
  }),
  methods:{
    selectMedrecInfo() {
      let sel = this; 
      fetch(process.env.VUE_APP_MAIN_URL + "medrecInfo", {
        method: "get",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          if (!response.ok) {
            sel.loginmsg = "病案查询失败" + response.err;
          }
          return response.json();
        })
        .then(function(data) {
          let topstatus = data.resultCode;
          if (topstatus == "0") {
            sel.medrecInfo = JSON.parse(data.outdata);
            console.log(sel.medrecInfo)
          } else {
            //录入失败
            sel.loginmsg = "病案查询失败";
          }
        })
        .catch(function() {
         sel.loginmsg = "病案查询失败";
        });
    }
  }
};
</script>
