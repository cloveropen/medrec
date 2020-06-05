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
          <v-toolbar-title>病案归档与退回</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
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
        <v-alert
          v-model="alert"
          dismissible
          :color="alertColor"
          border="left"
          elevation="2"
          colored-border
          icon="mdi-twitter"
        >{{alertContent}}</v-alert>
      </div>
      <!-- 归档表格 -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              病案归档
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchFile"
                append-icon="mdi-magnify"
                label="请输入病案号"
                single-line
                hide-details
              ></v-text-field>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="desserts"
                :single-select="singleSelect"
                class="elevation-1"
                :search="searchFile"
                item-key="bah"
                show-select
              ></v-data-table>
              <div class="text-center">
                <v-btn class="ma-2" color="primary" @click="getN042TableNotFile()">查询</v-btn>
                <v-btn class="ma-2" color="error" @click="n042TableFile(selected[0].bah)">归档</v-btn>
              </div>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>
              病案退回
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchReturn"
                append-icon="mdi-magnify"
                label="请输入病案号"
                single-line
                hide-details
              ></v-text-field>
              <v-data-table
                v-model="selected1"
                :headers="headers"
                :items="desserts1"
                :single-select="singleSelect"
                :search="searchReturn"
                item-key="bah"
                show-select
                class="elevation-1"
              ></v-data-table>
              <div class="text-center">
                <v-btn class="ma-2" color="primary" @click="getN042TableFile()">查询</v-btn>
                <v-btn class="ma-2" color="error" @click="n042TableGoback(selected1[0].bah)">退回</v-btn>
              </div>
            </v-card-title>
          </v-card>
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
    menu1: false,
    menu2: false,
    items: [
      {
        text: "归档与借阅",
        disabled: false,
        href: "/"
      },
      {
        text: "病案归档与退回",
        disabled: true,
        href: "breadcrumbs_dashboard"
      }
    ],
    headers: [
      { text: "病案号", value: "bah" },
      { text: "姓名", value: "xm" },
      { text: "入院时间", value: "rysj" }
    ],
    alert: false,
    alertContent: "",
    alertColor: "success",
    singleSelect: true,
    selected: [],
    selected1: [],
    desserts: [],
    desserts1: [],
    dialogSuccess: false,
    dialogError: false,
    dialogSuccessContent: "",
    dialogErrorContent: "",
    searchFile: "",
    searchReturn: ""
  }),
  methods: {
    getN042TableNotFile() {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "n042table/notfile", {
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
    getN042TableFile() {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "n042table/file", {
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
            sel.desserts1 = JSON.parse(data.outdata);
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
    n042TableFile(bah) {
      let sel = this;
      // var tin=bah+'|'+'9999';
      fetch(process.env.VUE_APP_MAIN_URL + "medrec/file/" + bah, {
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
            sel.dialogSuccess = true;
            sel.dialogSuccessContent = data.outdata;
            sel.getN042TableNotFile();
            //sel.desserts=JSON.parse(data.outdata);
          } else {
            sel.dialogError = true;
            sel.dialogErrorContent = data.errorMsg;
          }
          sel.alert = true;
        })
        .catch(function(err) {
          sel.dialogError = true;
          sel.dialogErrorContent = "请求异常：" + err;
        });
    },
    n042TableGoback(bah) {
      let sel = this;
      //var tin=bah+'|'+'9999';
      fetch(process.env.VUE_APP_MAIN_URL + "medrec/return/" + bah, {
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
            sel.dialogSuccess = true;
            sel.dialogSuccessContent = data.outdata;
            sel.getN042TableFile();
          } else {
            sel.dialogError = true;
            sel.dialogErrorContent = data.errorMsg;
          }
          sel.alert = true;
        })
        .catch(function(err) {
          sel.dialogError = true;
          sel.dialogErrorContent = "请求异常：" + err;
        });
    }
  }
};
</script>