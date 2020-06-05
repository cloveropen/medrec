<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage v-bind:dialogSuccess="dialogSuccess" v-bind:dialogError="dialogError" v-bind:dialogSuccessContent="dialogSuccessContent" v-bind:dialogErrorContent="dialogErrorContent"/>
    <v-container>
      <div >
        <v-toolbar class="elevation-0">
          <v-toolbar-title>医院医技情况报表</v-toolbar-title>
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
      <v-simple-table class="mytable3">
        <template>
          <thead>
            <tr>
              <th class="text-center" rowspan="2">检验科</th>
              <th class="text-center" colspan="2">总计</th>
              <th class="text-center" colspan="2">临床</th>
              <th class="text-center" colspan="2">微生物</th>
              <th class="text-center" colspan="2">生化</th>
              <th class="text-center" colspan="2">免疫</th>
              <th class="text-center" colspan="2">细胞学</th>
            </tr>
            <tr>
              <th class="text-center">项数(项)</th>
              <th class="text-center">人次(人)</th>
              <th class="text-center">项数(项)</th>
              <th class="text-center">人次(人)</th>
              <th class="text-center">项数(项)</th>
              <th class="text-center">人次(人)</th>
              <th class="text-center">项数(项)</th>
              <th class="text-center">人次(人)</th>
              <th class="text-center">项数(项)</th>
              <th class="text-center">人次(人)</th>
              <th class="text-center">项数(项)</th>
              <th class="text-center">人次(人)</th>
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
      <v-simple-table class="mytable3">
        <template>
          <thead>
            <tr>
              <th class="text-center" rowspan="2">放射线科</th>
              <th class="text-center" colspan="3">透视人次(人)</th>
              <th class="text-center" colspan="2">CR</th>
              <th class="text-center" rowspan="2" colspan="2">照影人次(人)</th>
              <th class="text-center" rowspan="2" colspan="2">介入治疗人次(人)</th>
              <th class="text-center" rowspan="2" colspan="2">CT人次(人)</th>
            </tr>
            <tr>
              <th class="text-center">合计(人)</th>
              <th class="text-center">普透(人)</th>
              <th class="text-center">钡透(人)</th>
              <th class="text-center">人次(人)</th>
              <th class="text-center">片数(片)</th>
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
      <v-simple-table class="mytable3">
        <template>
          <thead>
            <tr>
              <th class="text-center">功能检验科</th>
              <th class="text-center">心电图(人)</th>
              <th class="text-center">超声心动(人)</th>
              <th class="text-center">扇扫(人)</th>
              <th class="text-center">B超(人)</th>
              <th class="text-center">彩色多普勒(人)</th>
              <th class="text-center">脑彩超(人)</th>
              <th class="text-center">肺功能测定(人)</th>
              <th class="text-center">血气分析(人)</th>
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
      <v-simple-table class="mytable3">
        <template>
          <thead>
            <tr>
              <th class="text-center">康复科</th>
              <th class="text-center">合计</th>
              <th class="text-center">光疗(人)</th>
              <th class="text-center">声疗(人)</th>
              <th class="text-center">康复(人)</th>
              <th class="text-center">理疗(人)</th>
              <th class="text-center">牵引(人)</th>
              <th class="text-center">按摩(人)</th>
              <th class="text-center">针灸(人)</th>
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
      <v-simple-table class="mytable3">
        <template>
          <thead>
            <tr>
              <th class="text-center" rowspan="2">手术室</th>
              <th class="text-center" colspan="3">手术例数(例)</th>
              <th class="text-center" colspan="5">麻醉次数(次)</th>
              <th class="text-center" rowspan="2">合计</th>
              <th class="text-center" rowspan="2">胃镜(次)</th>
              <th class="text-center" rowspan="2">肠镜(次)</th>
              <th class="text-center" rowspan="2">气管镜(次)</th>
              <th class="text-center" rowspan="2">宫腔镜(次)</th>
              <th class="text-center" rowspan="2">腹腔镜(次)</th>
            </tr>
            <tr>
              
              <th class="text-center">合计(例)</th>
              <th class="text-center">急诊(例)</th>
              <th class="text-center">择期(例)</th>
              <th class="text-center">合计(次)</th>
              <th class="text-center">全麻(次)</th>
              <th class="text-center">局麻(次)</th>
              <th class="text-center">硬膜外(次)</th>
              <th class="text-center">臂丛(次)</th>
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
      <v-simple-table class="mytable3">
        <template>
          <thead>
            <tr>
              <th class="text-center" rowspan="2">药剂科</th>
              <th class="text-center" colspan="4">处方(张)</th>
              <th class="text-center" colspan="5">制剂(瓶)</th>
            </tr>
            <tr>
              <th class="text-center">合计</th>
              <th class="text-center">西药</th>
              <th class="text-center">中成药</th>
              <th class="text-center">饮片</th>
              <th class="text-center">合计</th>
              <th class="text-center">生理盐水</th>
              <th class="text-center">注射用水</th>
              <th class="text-center">5%葡萄糖</th>
              <th class="text-center">10%葡萄糖</th>
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
    dialogSuccess: false,
    dialogError: false,
    dialogSuccessContent: "",
    dialogErrorContent: "",
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
            sel.dialogError = true;
            sel.dialogErrorContent = "请求失败 " + response.err;
          }
          return response.json();
        })
        .then(function(data) {
          let topstatus = data.resultCode;
          if (topstatus == "0") {
            sel.mediDaily = JSON.parse(data.outdata);
          } else {
          sel.dialogError = true;
          sel.dialogErrorContent = data.errorMsg;
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
            sel.dialogError = true;
            sel.dialogErrorContent = "请求失败 " + response.err;
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
            sel.dialogError = true;
            sel.dialogErrorContent = data.errorMsg;
          }
        })
        .catch(function(err) {
          sel.dialogError = true;
          sel.dialogErrorContent = "请求异常：" + err;
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
.mytable3 table tr th,td {
    border: 1px solid rgb(241, 168, 226);
    padding: 0 0 0 0 ;
    margin: 0 0 0 0;
    
}
.mytable3 th{
    background-color: rgba(74, 215, 240);    
}
</style>
