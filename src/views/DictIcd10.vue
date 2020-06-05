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
          <v-toolbar-title>词典设置</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
          <!-- <v-toolbar-items>
        <v-btn text>病案导入</v-btn>
        <v-btn text>患者信息查询</v-btn>
        <v-btn text>患者详细信息</v-btn>
          </v-toolbar-items>-->
          <!-- <template v-if="$vuetify.breakpoint.smAndUp">
          <v-btn icon>
            <v-icon>mdi-export-variant</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-delete-circle</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
          </template>-->
        </v-toolbar>
      </div>
      <!-- 按条件查询  -->
      <v-row>
        <v-col cols="8" sm="6" md="3">
          <v-text-field label="请输入疾病编码" outlined v-model="diseaseCode"></v-text-field>
        </v-col>
        <v-col cols="8" sm="6" md="3">
          <v-text-field label="请输入疾病名称" outlined v-model="diseaseName"></v-text-field>
        </v-col>
        <v-col cols="8" sm="6" md="2">
          <v-btn class="ma-2" outlined color="indigo" @click="findBycodeOrName()">查 询</v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
      ></v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
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
  mounted: function() {
    let sel = this;
    fetch(process.env.VUE_APP_MAIN_URL + "dictIcd10", {
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
        console.log("data=" + JSON.stringify(data)); // this will be a string
        let topstatus = data.resultCode;
        if (topstatus == "0") {
          sel.desserts = JSON.parse(data.outdata);
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
  data: () => ({
    dateBegin: new Date().toISOString().substr(0, 10),
    dateEnd: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    diseaseCode: "",
    diseaseName: "",
    dialogSuccess: false,
    dialogError: false,
    dialogSuccessContent: "",
    dialogErrorContent: "",
    items: [
      {
        text: "疾病目录",
        disabled: true,
        href: "breadcrumbs_dashboard"
      }
    ],
    page: 1,
    pageCount: 0,
    itemsPerPage: 50,
    headers: [
      {
        text: "疾病编码",
        textcolor: "red",
        align: "left",
        sortable: false,
        value: "diagCode"
      },
      { text: "疾病名称", value: "diagName" }
    ],
    desserts: []
  }),
  methods: {
    findBycodeOrName() {
      let sel = this;
      let v_diseaseCode = sel.diseaseCode;
      let v_diseaseName = sel.diseaseName;
      if (v_diseaseCode == "") {
        v_diseaseCode = null;
      }
      if (v_diseaseName == "") {
        v_diseaseName = null;
      }
      fetch(
        process.env.VUE_APP_MAIN_URL +
          "dictIcd10/" +
          v_diseaseCode +
          "/" +
          v_diseaseName,
        {
          method: "get",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
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
          console.log(JSON.parse(data.outdata)); // this will be a string
          let topstatus = data.resultCode;
          if (topstatus == "0") {
            sel.desserts = JSON.parse(data.outdata);
          } else {
            sel.dialogError = true;
            sel.dialogErrorContent = data.errorMsg;
          }
        })
        .catch(function(err) {
          sel.dialogError = true;
          sel.dialogErrorContent = err;
        });
    }
  }
};
</script>
