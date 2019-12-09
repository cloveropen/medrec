<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container>
      <div>
        <v-toolbar class="elevation-0">
          <v-toolbar-title>数据审核</v-toolbar-title>
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
          <v-select
          :items="items1"
          label="审核病案首页"
          dense
          outlined
        ></v-select>
        </v-col>
        <v-col cols="8" sm="6" md="2">
          <v-btn class="ma-2" outlined color="indigo" @click="selectMedrecInfo()">开始审核</v-btn>
        </v-col>
      </v-row>
      <v-simple-table :style="style1">
        <template>
          <thead>
            <tr>
              <th class="text-center">病案号</th>
              <th class="text-center">住院次数</th>
              <th class="text-center">姓名</th>
              <th class="text-center">不合格内容</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataAudits" :key="item.caseNo" @dblclick="openMedrec(item.caseNo)">
              <td class="text-center">{{ item.caseNo }}</td>
              <td class="text-center">{{ item.inTimes }}</td>
              <td class="text-center">{{ item.pname }}</td>
              <td class="text-center">{{ item.reason }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div :style="style">
        <v-btn small class="success" @click="goback()">返回上一页</v-btn>
        <Medrecinfo
          v-bind:desserts="p_desserts"
          v-bind:desserts2="p_desserts2"
          v-bind:medrecInfo="medrecInfo"
          v-bind:medrecCost="medrecCost"
        />
        <v-btn small class="success" @click="confirmMedrec()">确认录入</v-btn>
      </div>
    </v-container>
  </v-app>
</template>
<script>
import Basepage from "../components/Basepage";
import Medrecinfo from "../components/Medrecinfo";
export default {
  components: {
    Basepage,
    Medrecinfo
  },
  data: () => ({
    dateBegin: new Date().toISOString().substr(0, 10),
    dateEnd: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    dataAudits: [],
    p_desserts: [],
    p_desserts2: [],
    medrecInfo: [],
    medrecCost: [],
    caseNo: "",
    style: "display:none;",
    style1: "",
    items: [
      {
        text: "数据审核",
        disabled: true,
        href: "breadcrumbs_link_1"
      }
    ],
    items1: [
      {
        text: "病案首页综合校对表",
        disabled: true,
        href: "breadcrumbs_link_1"
      }
    ]

  }),
  mounted: function() {
    //获取开始时间 取当前月的前一个月的一号
    let sel = this;
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getUTCMonth();
    var day = today.getDate();
    if (month.toString().length == 1) {
      month = "0" + month;
    }
    if (day.toString().length == 1) {
      day = "0" + day;
    }
    sel.dateBegin = year + "-" + month + "-" + day;
  },
  methods: {
    selectMedrecInfo() {
      let sel = this;
      let tin = sel.dateBegin + "|" + sel.dateEnd ;
      fetch(process.env.VUE_APP_MAIN_URL + "dataAudit/" + tin, {
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
            sel.dataAudits = JSON.parse(data.outdata);
            //console.log(sel.medrecInfo);
          } else {
            //录入失败
            sel.loginmsg = "病案查询失败";
          }
        })
        .catch(function() {
          sel.loginmsg = "病案查询失败";
        });
    },
    openMedrec(case_no) {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "medrec/" + case_no, {
        method: "get",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          if (!response.ok) {
            window.alert("查询失败error");
            sel.loginmsg = "查询失败" + response.err;
          }
          return response.json();
        })
        .then(function(data) {
          //console.log("data=" + JSON.stringify(data)); // this will be a string
          let topstatus = data.resultCode;
          if (topstatus == "0") {
            sel.style1 = "display:none;";
            sel.style = "";
            sel.medrecInfo = JSON.parse(data.outdata).medrecInfo;
            sel.medrecCost = JSON.parse(data.outdata).medrecCost;
            sel.p_desserts = JSON.parse(data.outdata).medrecDiag;
            sel.p_desserts2 = JSON.parse(data.outdata).medrecOpers;
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
    goback() {
      let sel = this;
      sel.style = "display:none;";
      sel.style1 = "";
    },
    confirmMedrec() {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "medrec/confirm", {
        method: "post",
        body: JSON.stringify({
          medrecInfo: sel.medrecInfo,
          medrecCost: sel.medrecCost,
          medrecOpers: sel.p_desserts2,
          medrecDiag: sel.p_desserts
        }),
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          if (!response.ok) {
            sel.alertError = true;
            sel.alertSuccess = false;
            sel.loginmsg = "病案录入失败" + response.err;
          }
          return response.json();
        })
        .then(function(data) {
          let topstatus = data.resultCode;
          if (topstatus == "0") {
            sel.alertSuccess = true;
            sel.alertError = false;
          } else {
            //录入失败
            sel.alertError = true;
            sel.alertSuccess = false;
            sel.errorContent = data.outdata;
            sel.loginmsg = "病案录入失败";
          }
        })
        .catch(function() {
          sel.alertError = true;
          sel.alertSuccess = false;
        });
    }
  }
};
</script>
