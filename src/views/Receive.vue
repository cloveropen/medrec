<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container>
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
      <!-- <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :single-select="singleSelect"
        item-key="name"
        show-select
        class="elevation-1"
      >
        <template v-slot:top>
          <v-row>
            <v-col cols="8" sm="4" md="3">
                <v-switch v-model="singleSelect" label="单选" class="pa-3"></v-switch>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="8" sm="6" md="4">
                <v-btn class="ma-2" color="success" dark>一键导入</v-btn>
            </v-col>
          </v-row>
        </template>
      </v-data-table> -->
    </v-container>
    <Medrecinfo />
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
    case_no:"",
    items: [
      {
        text: "病案录入",
        disabled: true,
      }
    ],
    singleSelect: false,
    selected: [],
    headers: [
      { text: "住院号", align: "left", sortable: false, value: "pid" },
      { text: "姓名", value: "patientName" },
      { text: "性别", value: "sex" },
      { text: "年龄", value: "age" },
      { text: "身份证号", value: "idCardNo" },
      { text: "医保卡号", value: "iron" }
    ],
    desserts: [
      {
        pid: "Z00000067835",
        patientName: "张天",
        sex: "男",
        age: 24,
        idCardNo: "12345678900099",
        iron: "1%"
      }
    ]
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  },
  methods: {
    queryMedrec(case_no) {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "medrec/"+case_no, {
        method: "get",
        mode: "cors",
        headers: {
          Accept: "application/json",
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
          //console.log("data=" + JSON.stringify(data)); // this will be a string
          let topstatus = data.resultCode;
          if (topstatus == "0") {
            console.log(JSON.parse(data.outdata).medrecInfo); // this will be a string
            Medrecinfo.medrecInfo = JSON.parse(data.outdata).medrecInfo;
            Medrecinfo.medrecCost = JSON.parse(data.outdata).medrecCost;
          } else {
            //查询失败
            window.alert("查询失败!\n");
            sel.loginmsg = "查询失败";
          }
        })
        .catch(function(err) {
          window.alert("error=" + err);
        });
    }
  }
};
</script>
