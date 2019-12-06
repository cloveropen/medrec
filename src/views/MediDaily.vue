<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container>
      <div>
        <v-toolbar>
          <v-toolbar-title>医技日报统计</v-toolbar-title>
          <v-spacer></v-spacer>
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
        <!-- <v-col cols="8" sm="6" md="3">
          <v-text-field label="请输入住院号" outlined v-model="caseNo"></v-text-field>
        </v-col> -->
        <v-col cols="8" sm="6" md="2">
          <v-btn class="ma-2" outlined color="indigo" @click="selectMediDaily()">查 询</v-btn>
        </v-col>
        <v-col cols="8" sm="6" md="2">
          <v-btn class="ma-2" outlined color="indigo" @click="saveMediDaily()">保 存</v-btn>
        </v-col>
      </v-row>
      <v-simple-table class="mytable">
        <template>
          <thead>
            <tr>
              <tr>
                     <th class="text-center">日期</th>
                     <th class="text-center">医技项目</th>
                     <th class="text-center">医技科室</th>
                     <th class="text-center">申请科室</th>
                     <th class="text-center">申请人次</th>
                     <th class="text-center">收费标准</th>
                     <th class="text-center">实际费用</th>
                     <th class="text-center">套(件)数</th>
                     <th class="text-center">阳性数</th>
                     <th class="text-center">备注</th>
                </tr>
          </thead>
          <tbody>
            <tr v-for="item in mediDaily" :key="item.seq" @dblclick="openMedrec(item.seq)">
              <td class="text-center">{{item.recordDate}}</td>
              <td class="text-center">{{item.mediProject}}</td>
              <td class="text-center">{{item.mediDept}}</td>
              <td class="text-center">{{item.applyDept}}</td>
              <td class="text-center"><v-text-field class="abc" v-model="item.applyNum" ></v-text-field></td>
              <td class="text-center">{{item.chargeStandard}}</td>
              <td class="text-center">{{item.actualCost}}</td>
              <td class="text-center"><v-text-field class="abc" v-model="item.itemNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.positiveNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.remarks" ></v-text-field></td>
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
    mediDaily: [],
    caseNo: "",
    style: "display:none;",
    style1: "",
    items: [
      {
        text: "患者信息查询",
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
    selectMediDaily() {
      let sel = this;
      let tin = sel.dateBegin + "|" + sel.dateEnd ;
      fetch(process.env.VUE_APP_MAIN_URL + "getMediDaily/" + tin, {
        method: "get",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          if (!response.ok) {
            sel.loginmsg = "医技日报失败" + response.err;
          }
          return response.json();
        })
        .then(function(data) {
          let topstatus = data.resultCode;
          if (topstatus == "0") {
            sel.mediDaily = JSON.parse(data.outdata);
            //console.log(sel.medrecInfo);
          } else {
            //录入失败
            sel.loginmsg = "医技日报失败";
          }
        })
        .catch(function() {
          sel.loginmsg = "医技日报失败";
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
    }
  }
};
</script>
<style >
.mytable table tr th,td {
    border: 1px solid rgb(76,175,80);
    padding: 0 0 0 0 ;
    margin: 0 0 0 0;
    
}
</style>
