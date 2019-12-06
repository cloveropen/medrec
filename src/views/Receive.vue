<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container fluid>
      <div>
        <v-toolbar>
          <v-toolbar-title>病案录入</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </v-toolbar>
      </div>
      <v-row class="abc">
        <v-col cols="8" sm="6" md="3">
          <v-text-field label="病案号" outlined v-model="case_no"></v-text-field>
        </v-col>
        <v-col cols="8" sm="6" md="2">
          <v-btn class="ma-2" outlined color="indigo" @click="queryMedrec(case_no)">查 询</v-btn>
        </v-col>
      </v-row>
      <v-alert dense text class="text-center" type="success" v-model="alertSuccess" >录入成功</v-alert>
      <v-alert dense text class="text-center" type="error" v-model="alertError" >{{errorContent}}</v-alert>
      <Medrecinfo
          v-bind:desserts="p_desserts"
          v-bind:desserts2="p_desserts2"
          v-bind:medrecInfo="medrecInfo"
          v-bind:medrecCost="medrecCost"
        />
    <v-btn small class="success" @click="confirmMedrec()">确认导入</v-btn>
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
    case_no: "",
    p_desserts: "",
    p_desserts2: "",
    medrecInfo: "",
    medrecCost: "",
    alertSuccess: false,
    alertError: false,
    errorContent: "录入失败",
    items: [
      {
        text: "病案录入",
        disabled: true
      }
    ],
    singleSelect: false,
    selected: []
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  },
  methods: {
    queryMedrec(case_no) {
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
            sel.alertError = false;
            sel.alertSuccess = false;
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
