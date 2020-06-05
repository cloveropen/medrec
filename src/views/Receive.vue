<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage v-bind:dialogSuccess="dialogSuccess" v-bind:dialogError="dialogError" v-bind:dialogSuccessContent="dialogSuccessContent" v-bind:dialogErrorContent="dialogErrorContent" v-bind:dialogLoading="dialogLoading"/>
    <v-container fluid>
      <v-row>
        <v-col cols="8" sm="6" md="3" >
          <v-text-field class="spacing-playground pa-0 ma-0" label="病案号" outlined v-model="case_no"></v-text-field>
        </v-col>
        <v-col cols="8" sm="6" md="2">
          <v-btn class="spacing-playground pa-1 ma-2" outlined color="indigo" @click="queryMedrec(case_no)">查 询</v-btn>
        </v-col>
      </v-row>
      <v-tabs background-color="success" center-active dark v-model="tabs">
        <v-tab>病案首页</v-tab>
        <v-tab>入院记录</v-tab>
        <v-tab>24小时内入出院记录</v-tab>
        <v-tab>24小时内入院死亡记录</v-tab>
        <v-tab>首次病程记录</v-tab>
        <v-tab>日常病程记录</v-tab>
        <v-tab>上级查房记录</v-tab>
        <v-tab>疑难病例讨论</v-tab>
        <v-tab>交班记录</v-tab>
        <v-tab>接班记录</v-tab>
        <v-tab>转科(转出)记录</v-tab>
        <v-tab>转科(转入)记录</v-tab>
        <v-tab>阶段小结</v-tab>
        <v-tab>抢救记录</v-tab>
        <v-tab>会诊记录</v-tab>
        <v-tab>术前小结</v-tab>
        <v-tab>术前讨论记录</v-tab>
        <v-tab>手术记录</v-tab>
        <v-tab>术后首次病程记录</v-tab>
        <v-tab>出院记录</v-tab>
        <v-tab>死亡记录</v-tab>
        <v-tab>死亡病例讨论记录</v-tab>
        <v-tab>住院超过30天患者讨论记录</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item flat>
        <!-- <div>
          <v-toolbar class="elevation-0">
            <v-toolbar-title>病案录入</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-breadcrumbs :items="items"></v-breadcrumbs>
          </v-toolbar>
        </div> -->
        <v-alert dense text class="text-center" type="success" v-model="alertSuccess" >录入成功</v-alert>
        <v-alert dense text class="text-center" type="error" v-model="alertError" >{{errorContent}}</v-alert>
        <Medrecinfo class="spacing-playground pa-0 ma-0"
          v-bind:desserts="p_desserts"
          v-bind:desserts2="p_desserts2"
          v-bind:medrecInfo="medrecInfo"
          v-bind:medrecCost="medrecCost"
        />
        <v-btn block class="spacing-playground mt-2 success" @click="confirmMedrec()">确认导入</v-btn>
        </v-tab-item>
        <v-tab-item>
          <Ran class="spacing-playground pa-0 ma-0"
            v-bind:ran="ran"
          />
        </v-tab-item>
        <v-tab-item>
          <Ran24 class="spacing-playground pa-0 ma-0"
            v-bind:ran24="ran24"
          />
        </v-tab-item>
        <v-tab-item>
          <Ran240 class="spacing-playground pa-0 ma-0"
            v-bind:ran240="ran240"
          />
        </v-tab-item>
        <v-tab-item>
          <ProgressNote class="spacing-playground pa-0 ma-0"
            v-bind:progressNote="progressNote"
          />
        </v-tab-item>
        <v-tab-item>
          <ProgressCycle class="spacing-playground pa-0 ma-0"
            v-bind:progressCycle="progressCycle"
          />
        </v-tab-item>
        <v-tab-item>
          <InspectRecord class="spacing-playground pa-0 ma-0"
            v-bind:inspectRecord="inspectRecord"
          />
        </v-tab-item>
        <v-tab-item>
          <DiscussDifficultCases class="spacing-playground pa-0 ma-0"
            v-bind:discussDifficultCases="discussDifficultCases"
          />
        </v-tab-item>
        <v-tab-item>
          <ShiftOutRecord class="spacing-playground pa-0 ma-0"
            v-bind:shiftOutRecord="shiftOutRecord"
          />
        </v-tab-item>
        <v-tab-item>
          <ShiftInRecord class="spacing-playground pa-0 ma-0"
            v-bind:shiftInRecord="shiftInRecord"
          />
        </v-tab-item>
        <v-tab-item>
          <ChgDeptOutRecord class="spacing-playground pa-0 ma-0"
            v-bind:chgDeptOutRecord="chgDeptOutRecord"
          />
        </v-tab-item>
        <v-tab-item>
          <ChgDeptInRecord class="spacing-playground pa-0 ma-0"
            v-bind:chgDeptInRecord="chgDeptInRecord"
          />
        </v-tab-item>
        <v-tab-item>
          <PhaseSummary class="spacing-playground pa-0 ma-0"
            v-bind:phaseSummary="phaseSummary"
          />
        </v-tab-item>
        <v-tab-item>
          <RescueRecord class="spacing-playground pa-0 ma-0"
            v-bind:rescueRecord="rescueRecord"
          />
        </v-tab-item>
        <v-tab-item>
          <ProgressCycle class="spacing-playground pa-0 ma-0"
            v-bind:progressCycle="progressCycle"
          />
        </v-tab-item>
        <v-tab-item>
          <SurgeryBefore class="spacing-playground pa-0 ma-0"
            v-bind:surgeryBefore="surgeryBefore"
          />
        </v-tab-item>
        <v-tab-item>
          <SurgeryDiscuss class="spacing-playground pa-0 ma-0"
            v-bind:surgeryDiscuss="surgeryDiscuss"
          />
        </v-tab-item>
        <v-tab-item>
          <SurgeryRecord class="spacing-playground pa-0 ma-0"
            v-bind:surgeryRecord="surgeryRecord"
          />
        </v-tab-item>
        <v-tab-item>
          <SurgeryAfter class="spacing-playground pa-0 ma-0"
            v-bind:surgeryAfter="surgeryAfter"
          />
        </v-tab-item>
        <v-tab-item>
          <OutRecord class="spacing-playground pa-0 ma-0"
            v-bind:outRecord="outRecord"
          />
        </v-tab-item>
        <v-tab-item>
          <DeathRecord class="spacing-playground pa-0 ma-0"
            v-bind:deathRecord="deathRecord"
          />
        </v-tab-item>
        <v-tab-item>
          <DeathDiscuss class="spacing-playground pa-0 ma-0"
            v-bind:deathDiscuss="deathDiscuss"
          />
        </v-tab-item>
        <v-tab-item>
          <ProgressCycle class="spacing-playground pa-0 ma-0"
            v-bind:progressCycle="progressCycle"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-app>
</template>
<script>
import Basepage from "../components/Basepage";
import Medrecinfo from "../components/Medrecinfo";
import Ran from "../components/Ran";
import Ran24 from "../components/Ran24";
import Ran240 from "../components/Ran240";
import ProgressNote from "../components/ProgressNote";
import ChgDeptInRecord from "../components/ChgDeptInRecord";
import ChgDeptOutRecord from "../components/ChgDeptOutRecord";
import DeathDiscuss from "../components/DeathDiscuss";
import DeathRecord from "../components/DeathRecord";
import DiscussDifficultCases from "../components/DiscussDifficultCases";
import InspectRecord from "../components/InspectRecord";
import OutRecord from "../components/OutRecord";
import PhaseSummary from "../components/PhaseSummary";
import ProgressCycle from "../components/ProgressCycle";
import RescueRecord from "../components/RescueRecord";
import ShiftInRecord from "../components/ShiftInRecord";
import ShiftOutRecord from "../components/ShiftOutRecord";
import SurgeryAfter from "../components/SurgeryAfter";
import SurgeryBefore from "../components/SurgeryBefore";
import SurgeryDiscuss from "../components/SurgeryDiscuss";
import SurgeryRecord from "../components/SurgeryRecord";
export default {
  components: {
    Basepage,
    Medrecinfo,
    Ran,
    Ran24,
    Ran240,
    ProgressNote,
    ChgDeptInRecord,
    ChgDeptOutRecord,
    DeathDiscuss,
    DeathRecord,
    DiscussDifficultCases,
    InspectRecord,
    OutRecord,
    PhaseSummary,
    ProgressCycle,
    RescueRecord,
    ShiftInRecord,
    ShiftOutRecord,
    SurgeryAfter,
    SurgeryBefore,
    SurgeryDiscuss,
    SurgeryRecord
  },
  data: () => ({
    dateBegin: new Date().toISOString().substr(0, 10),
    dateEnd: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    tabs: null,
    case_no: "",
    p_desserts: "",
    p_desserts2: "",
    medrecInfo: "",
    medrecCost: "",
    ran: "",
    ran24: "",
    ran240: "",
    progressNote: "",
    chgDeptInRecord: "",
    chgDeptOutRecord: "",
    deathDiscuss: "",
    deathRecord: "",
    discussDifficultCases: "",
    inspectRecord: "",
    outRecord: "",
    phaseSummary: "",
    progressCycle: "",
    rescueRecord: "",
    shiftInRecord: "",
    shiftOutRecord: "",
    surgeryAfter: "",
    surgeryBefore: "",
    surgeryDiscuss: "",
    surgeryRecord: "",
    alertSuccess: false,
    alertError: false,
    errorContent: "录入失败",
    items: [
      {
        text: "病案首页",
        disabled: false
      },
      {
        text: "病案录入",
        disabled: true
      }
    ],
    singleSelect: false,
    selected: [],
    dialogSuccess: false,
    dialogError: false,
    dialogSuccessContent: "",
    dialogErrorContent: "",
    dialogLoading: false
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  },
  methods: {
    queryMedrec(case_no) {
      this.dialogLoading = true;
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "emr/" + case_no, {
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
          sel.dialogLoading = false;
          return response.json();
        })
        .then(function(data) {
          console.log("data=" + JSON.stringify(data)); // this will be a string
          let topstatus = data.resultCode;
          if (topstatus == "0") {
            sel.medrecInfo = JSON.parse(data.outdata).medrec.medrecInfo;
            sel.medrecCost = JSON.parse(data.outdata).medrec.medrecCost;
            sel.p_desserts = JSON.parse(data.outdata).medrec.medrecDiag;
            sel.p_desserts2 = JSON.parse(data.outdata).medrec.medrecOpers;
            sel.ran = JSON.parse(data.outdata).ran;
            sel.ran24 = JSON.parse(data.outdata).ran24;
            sel.ran240 = JSON.parse(data.outdata).ran240;
            sel.progressNote = JSON.parse(data.outdata).progressNote;
            sel.chgDeptInRecord = JSON.parse(data.outdata).chgDeptInRecord;
            sel.chgDeptOutRecord = JSON.parse(data.outdata).chgDeptOutRecord;
            sel.deathDiscuss = JSON.parse(data.outdata).deathDiscuss;
            sel.deathRecord = JSON.parse(data.outdata).deathRecord;
            sel.discussDifficultCases = JSON.parse(data.outdata).discussDifficultCases;
            sel.inspectRecord = JSON.parse(data.outdata).inspectRecord;
            sel.outRecord = JSON.parse(data.outdata).outRecord;
            sel.phaseSummary = JSON.parse(data.outdata).phaseSummary;
            sel.progressCycle = JSON.parse(data.outdata).progressCycle;
            sel.rescueRecord = JSON.parse(data.outdata).rescueRecord;
            sel.shiftInRecord = JSON.parse(data.outdata).shiftInRecord;
            sel.shiftOutRecord = JSON.parse(data.outdata).shiftOutRecord;
            sel.surgeryAfter = JSON.parse(data.outdata).surgeryAfter;
            sel.surgeryBefore = JSON.parse(data.outdata).surgeryBefore;
            sel.surgeryDiscuss = JSON.parse(data.outdata).surgeryDiscuss;
            sel.surgeryRecord = JSON.parse(data.outdata).surgeryRecord;
          } else {
            sel.dialogError = true;
            sel.dialogErrorContent = data.errorMsg;
          }
          sel.dialogLoading = false;
        })
        .catch(function(err) {
          sel.dialogError = true;
          sel.dialogErrorContent = "请求异常：" + err;
        });
    },
    confirmMedrec() {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "n042/confirm", {
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
            sel.dialogError = true;
            sel.dialogErrorContent = "请求失败 " + response.err;
          }
          return response.json();
        })
        .then(function(data) {
          let topstatus = data.resultCode;
          if (topstatus == "0") {
            sel.dialogSuccess = true;
            sel.dialogSuccessContent = data.outdata;
          } else {
            sel.dialogError = true;
            sel.dialogErrorContent = data.errorMsg;
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
