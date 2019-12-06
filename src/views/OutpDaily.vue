<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container style="background-color:rgb(255,255,255);">
      <div>
        <v-toolbar>
          <v-toolbar-title>门诊日报统计</v-toolbar-title>
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
        <!-- <v-col cols="8" sm="6" md="3">
          <v-text-field label="请输入住院号" outlined v-model="caseNo"></v-text-field>
        </v-col> -->
        <v-col cols="8" sm="6" md="2">
          <v-btn class="ma-2" outlined color="indigo" @click="selectOutpDaily()">查 询</v-btn>
        </v-col>

         <v-col cols="8" sm="6" md="2">
          <v-btn class="ma-2" outlined color="indigo" @click="saveOutpDaily()">保 存</v-btn>
        </v-col>
         <!-- <v-col cols="8" sm="6" md="2">
          <v-btn class="ma-2" outlined color="indigo" @click="exportExcel()">测试导出excel</v-btn>
        </v-col> -->
      </v-row>
      <v-simple-table class="mytable">
        <template>
          <thead>
            <tr>
              <tr>
                    <th class="text-center">日期</th>
                    <th class="text-center">科室</th>
                    <th class="text-center">工作日数</th>
                    <th class="text-center">初诊数</th>
                    <th class="text-center">复诊数</th>
                    <th class="text-center">诊查数</th>
                    <th class="text-center">健康检查</th>
                    <th class="text-center">留诊观察</th>
                    <th class="text-center">抢救人数</th>
                    <th class="text-center">抢救成功人数</th>
                    <th class="text-center">危重抢救数</th>
                    <th class="text-center">急诊室死亡人数</th>
                    <th class="text-center">观察室死亡人数</th>
                    <th class="text-center">挂号数量</th>
                    <th class="text-center">免挂</th>
                    <th class="text-center">普通号</th>
                    <th class="text-center">急诊号</th>
                    <th class="text-center">专家号</th>
                    <th class="text-center">基保</th>
                    <th class="text-center">商保</th>
                    <th class="text-center">其他</th>
                    <th class="text-center">出诊</th>
                    <th class="text-center">赴家庭病床</th>
                    <th class="text-center">地段</th>
                    <th class="text-center">住院诊疗人数</th>
                </tr>
          </thead>
          <tbody>
            <tr v-for="item in outpDaily" :key="item.seq" @dblclick="openMedrec(item.seq)">
              <td class="text-center">{{item.recordDate}}</td>
              <td class="text-center">{{item.dept}}</td>
              <td class="text-center"><v-text-field class="abc" v-model="item.workDays" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.firstVisitNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.subVisitNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.diagnosticNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.healthExam" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.observeStay" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.rescueNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.rescueSuccessNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.criticalRescueNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.emerRoomDeathNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.obserRoomDeathNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.registeredNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.freeRegistered" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.ordinaryNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.emergencyNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.expertNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.basicInsurance" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.commercialInsurance" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.other" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.outCall" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.familySickbed" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.district" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.inpatientNum" ></v-text-field></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div :style="style">
        <v-btn small class="success" @click="goback()">返回上一页</v-btn>
        <Medrecinfo
          v-bind:desserts="pDesserts"
          v-bind:desserts2="pDesserts2"
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
    outpDaily: [],
    caseNo: "",
    style: "display:none;",
    style1: "",
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
    selectOutpDaily() {
      let sel = this;
      let tin = sel.dateBegin + "|" + sel.dateEnd ;
      fetch(process.env.VUE_APP_MAIN_URL + "getOutpDaily/" + tin, {
        method: "get",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          if (!response.ok) {
            sel.loginmsg = "门诊日报失败" + response.err;
          }
          return response.json();
        })
        .then(function(data) {
          let topstatus = data.resultCode;
          if (topstatus == "0") {
            sel.outpDaily = JSON.parse(data.outdata);
            //console.log(sel.medrecInfo);
          } else {
            //录入失败
            sel.loginmsg = "门诊日报失败";
          }
        })
        .catch(function() {
          sel.loginmsg = "门诊日报失败";
        });
    },
    openMedrec(caseNo) {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "medrec/" + caseNo, {
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
            sel.pDesserts = JSON.parse(data.outdata).medrecDiag;
            sel.pDesserts2 = JSON.parse(data.outdata).medrecOpers;
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
    border: 1px solid rgba(113, 219, 191, 0.911);
    padding: 0 0 0 0 ;
    margin: 0 0 0 0;
    
}
.mytable th{
    background-color: #3AB796;    
}
</style>
