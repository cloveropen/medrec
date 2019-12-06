<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container>
      <div>
        <v-toolbar>
          <v-toolbar-title>病房日报统计</v-toolbar-title>
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
          <v-btn class="ma-2" outlined color="indigo" @click="selectWardDaily()">查 询</v-btn>
        </v-col>
         <v-col cols="8" sm="6" md="2">
          <v-btn class="ma-2" outlined color="indigo" @click="saveWardDaily()">保 存</v-btn>
        </v-col>
      </v-row>
      <v-simple-table dense  class="mytable">
        <template>
          <thead>
            <tr>
              <tr>
                    <th class="text-center" rowspan="4">病房</th>
                    <th class="text-center" rowspan="4">日期</th>
                    <th class="text-center" rowspan="4">实际开放床数</th>
                    <th class="text-center" rowspan="4">原有人数</th>
                    <th class="text-center" rowspan="4">入院人数</th>
                    <th class="text-center" rowspan="4">他科转入</th>
                    <th class="text-center" rowspan="1" colspan="13">出院人数</th>
                    <th class="text-center" rowspan="2" colspan="2">总床日数</th>
                    <th class="text-center" rowspan="4">现有人数</th>
                    <th class="text-center" rowspan="4">转科</th>
                    <th class="text-center" rowspan="4">陪护数</th>
                </tr>
                <tr>
                    <th class="text-center" rowspan="3" colspan="1">出院人数</th>
                    <th class="text-center" rowspan="1" colspan="7">出院病人数</th>
                    <th class="text-center" rowspan="1" colspan="5">其他</th>
                </tr>
                <tr>
                    <th class="text-center" rowspan="2" colspan="1">治愈</th>
                    <th class="text-center" rowspan="2" colspan="1">好转</th>
                    <th class="text-center" rowspan="2" colspan="1">未愈</th>
                    <th class="text-center" rowspan="2" colspan="1">死亡</th>
                    <th class="text-center" rowspan="1" colspan="3">死亡原因</th>
                    <th class="text-center" rowspan="2" colspan="1">小计</th>
                    <th class="text-center" rowspan="2" colspan="1">非病人数</th>
                    <th class="text-center" rowspan="2" colspan="1">正常分娩</th>
                    <th class="text-center" rowspan="2" colspan="1">未产出院</th>
                    <th class="text-center" rowspan="2" colspan="1">计划生育</th>
                    <th class="text-center" rowspan="2" colspan="1">其他占床日数</th>
                    <th class="text-center" rowspan="2" colspan="1">病人占床日</th>
                </tr>
                <tr>
                    <th class="text-center" rowspan="1" colspan="1">终末</th>
                    <th class="text-center" rowspan="1" colspan="1">无效</th>
                    <th class="text-center" rowspan="1" colspan="1">未治</th>
                </tr>
          </thead>
          <tbody>
            <tr v-for="item in wardDaily" :key="item.seq">
              <td class="text-center">{{item.ward}}</td>
              <td class="text-center">{{item.recordDate}}</td>
              <td class="text-center"><v-text-field class="abc" v-model="item.openBedsNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.originalNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.admissionNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.otherDeptShift" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.outNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.cure" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.becomeBetter" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.healed" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.death" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.terminal" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.invalid" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.untreated" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.subtotal" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.noDiseaseNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.normalLabor" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.nulliparousDischarge" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.familyPlanning" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.otherOccupyingBed" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.patientOccupyingBed" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.currentNum" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.shiftDept" ></v-text-field></td>
              <td class="text-center"><v-text-field class="abc" v-model="item.accompanyNum" ></v-text-field></td>
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
export default {
  components: {
    Basepage
  },
  data: () => ({
    dateBegin: new Date().toISOString().substr(0, 10),
    dateEnd: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    wardDaily: [],
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
    selectWardDaily() {
      let sel = this;
      let tin = sel.dateBegin + "|" + sel.dateEnd;
      fetch(process.env.VUE_APP_MAIN_URL + "getWardDaily/" + tin, {
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
            sel.wardDaily = JSON.parse(data.outdata);
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
