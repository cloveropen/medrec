<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage
      v-bind:dialogSuccess="dialogSuccess"
      v-bind:dialogError="dialogError"
      v-bind:dialogSuccessContent="dialogSuccessContent"
      v-bind:dialogErrorContent="dialogErrorContent"
    />
    <v-container>
      <div>
        <v-toolbar class="elevation-0">
          <v-toolbar-title>病案打印</v-toolbar-title>
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
          <v-text-field label="住院号" outlined></v-text-field>
        </v-col>
        <v-col cols="8" sm="6" md="2">
          <v-btn class="ma-2" outlined color="indigo">查 询</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="desserts"
            :single-select="singleSelect"
            item-key="caseNo"
            show-select
            class="elevation-1 mytable"
          >
            <template v-slot:top>
              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="8" sm="6" md="4">
                  <v-btn
                    class="ma-2"
                    color="success"
                    dark
                    @click="previewPdf(selected[0].caseNo)"
                  >打印选中</v-btn>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-col>
        <v-col>
          <template>
            <iframe width="100%" height="800px" :src="src"></iframe>
          </template>
        </v-col>
      </v-row>
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
    src:
      "http://localhost:9027/preview/emr/eastwill_phy_inspectRecord_Z00000019430.pdf",
    pages: 10,
    menu1: false,
    menu2: false,
    dialogSuccess: false,
    dialogError: false,
    dialogSuccessContent: "",
    dialogErrorContent: "",
    items: [
      {
        text: "病案打印",
        disabled: true
      }
    ],
    singleSelect: true,
    selected: [],
    headers: [
      { text: "住院号", align: "left", sortable: false, value: "caseNo" },
      { text: "姓名", value: "patientName" },
      { text: "性别", value: "gender" }
    ],
    desserts: [
      {
        caseNo: "Z00000045140",
        patientName: "张天",
        gender: "男"
      },
      {
        caseNo: "Z00000037413",
        patientName: "疑难杂症",
        gender: "男"
      },
      {
        caseNo: "Z00000042060",
        patientName: "转科记录",
        gender: "男"
      },
      {
        caseNo: "Z00000042946",
        patientName: "阶段小结",
        gender: "男"
      },
      {
        caseNo: "Z00000045849",
        patientName: "抢救记录",
        gender: "男"
      },
      {
        caseNo: "Z00000027802",
        patientName: "24小时入出院",
        gender: "男"
      }
    ]
  }),
  methods: {
    getPrnList(case_no) {
      let sel = this;
      fetch(
        process.env.VUE_APP_MAIN_URL +
          "preview/emr/eastwill_phy_" +
          case_no +
          ".pdf",
        {
          method: "get",
          mode: "cors",
          headers: {
            Accept: "application/pdf",
            "Content-Type": "application/pdf"
          }
        }
      )
        .then(function(response) {
          if (!response.ok) {
            sel.dialogError = true;
            sel.dialogErrorContent = "请求失败 " + response.err;
          }
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
    previewPdf(case_no) {
      console.log(case_no);
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "generate/emr/" + case_no, {
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
          console.log("data=" + JSON.stringify(data)); // this will be a string
          let topstatus = data.resultCode;
          if (topstatus == "0") {
            sel.src =
              process.env.VUE_APP_MAIN_URL + "preview/emr/" + data.outdata;
          } else {
            sel.dialogError = true;
            sel.dialogErrorContent = data.errorMsg;
          }
        })
        .catch(function(err) {
          sel.dialogError = true;
          sel.dialogErrorContent = "请求异常：" + err;
        });
    }
  }
};
</script>
<style >
.mytable table tr th,
td {
  border: 1px solid rgba(113, 219, 191, 0.911);
  padding: 0 0 0 0;
  margin: 0 0 0 0;
}
.mytable th {
  background-color: #3ab796;
}
.pdf-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>