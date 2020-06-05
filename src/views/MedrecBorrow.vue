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
          <v-toolbar-title>病案借阅与归还</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
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
              病案借阅
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchBorrow"
                append-icon="mdi-magnify"
                label="请输入病案号"
                single-line
                hide-details
              ></v-text-field>
              <v-data-table
                :headers="headers"
                :items="desserts"
                v-model="selected"
                :single-select="singleSelect"
                :search="searchBorrow"
                item-key="bah"
                :items-per-page="10"
                class="elevation-1"
                show-select
              ></v-data-table>
              <div class="text-center">
                <v-btn class="ma-2" color="primary" @click="getMedrecBorrow()">查询</v-btn>
                <v-btn class="ma-2" color="error" @click="medrecBorrowBefore(selected)">借阅</v-btn>
              </div>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>
              病案归还
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchRevert"
                append-icon="mdi-magnify"
                label="请输入病案号"
                single-line
                hide-details
              ></v-text-field>
              <v-data-table
                :headers="headers1"
                :items="desserts1"
                v-model="selected1"
                :single-select="singleSelect"
                :search="searchRevert"
                item-key="caseNo"
                :items-per-page="10"
                class="elevation-1"
                locale="zh-CN"
                show-select
              ></v-data-table>
              <div class="text-center">
                <v-btn class="ma-2" color="primary" @click="getMedrecRevert()">查询</v-btn>
                <v-btn class="ma-2" color="error" @click="medrecRevert(selected1[0].caseNo)">归还</v-btn>
              </div>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-dialog v-model="dialogBorrow" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">病案借阅登记</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="借阅开始时间"
                      hint="默认为今天"
                      persistent-hint
                      required
                      disabled
                      v-model="medrecBorrow.borrowTime"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" md="6">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="200px"
                  >
                  <template v-slot:activator="{ on }">
                    <v-text-field label="借阅结束时间" v-on="on" prepend-icon="event" readonly v-model="medrecBorrow.borrowValidity" required></v-text-field>
                  </template>
                    <v-date-picker v-model="medrecBorrow.borrowValidity" height="100%" locale="zh-cn" @input="menu2 = false" @change="computeDays()"></v-date-picker>
                  </v-menu>
                  </v-col>-->
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="借阅时长(天)"
                      v-model="medrecBorrow.borrowDay"
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="借阅者姓名"
                      v-model="medrecBorrow.borrowUser"
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="操作者编号" v-model="medrecBorrow.operator"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="病案号"
                      v-model="medrecBorrow.caseNo"
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="患者姓名"
                      v-model="medrecBorrow.patientName"
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>请认真填写登记表</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogBorrow = false">取消</v-btn>
              <v-btn color="blue darken-1" text @click="medrecBorrowConfirm()">提交</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    headers1: [
      { text: "病案号", value: "caseNo" },
      { text: "姓名", value: "patientName" },
      { text: "借阅人", value: "borrowUser" }
    ],
    alert: false,
    alertContent: "",
    dialogSuccess: false,
    dialogError: false,
    dialogSuccessContent: "",
    dialogErrorContent: "",
    alertColor: "success",
    singleSelect: true,
    selected: [],
    selected1: [],
    desserts: [],
    desserts1: [],
    searchBorrow: "",
    searchRevert: "",
    dialogBorrow: false,
    medrecBorrow: {},
    rules: {
      required: value => !!value || "必须填写！"
    }
  }),
  mounted: function() {
    //获取开始时间 取当前月的前一个月的一号
    let sel = this;
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getUTCMonth() + 2;
    var day = today.getDate();
    if (month.toString().length == 1) {
      month = "0" + month;
    }
    if (day.toString().length == 1) {
      day = "0" + day;
    }
    sel.medrecBorrow.borrowValidity = year + "-" + month + "-" + day;
  },
  methods: {
    getMedrecBorrow() {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "getMedrec/borrow", {
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
    getMedrecRevert() {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "getMedrec/revert", {
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
    medrecBorrowBefore(medrec) {
      console.log(medrec);
      let sel = this;
      sel.dialogBorrow = true;
      sel.medrecBorrow.borrowTime = new Date().toISOString().substr(0, 10);
      sel.medrecBorrow.borrowDay = 30;
      sel.medrecBorrow.caseNo = medrec[0].bah;
      sel.medrecBorrow.patientName = medrec[0].xm;
    },
    medrecRevert(bah) {
      let sel = this;
      //var tin=bah+'|'+'9999';
      fetch(process.env.VUE_APP_MAIN_URL + "medrec/revert/" + bah, {
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
            sel.getMedrecRevert();
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
    medrecBorrowConfirm() {
      let sel = this;
      console.log(this.medrecBorrow);
      fetch(process.env.VUE_APP_MAIN_URL + "medrec/borrow", {
        method: "post",
        body: JSON.stringify(sel.medrecBorrow),
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
            sel.getMedrecBorrow();
            sel.dialogBorrow = false;
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
    computeDays() {
      if (this.medrecBorrow.borrowValidity < this.medrecBorrow.borrowTime) {
        window.alert("结束时间不能小于开始时间！");
      }
    }
  },
  watch: {
    name() {
      this.errorMessages = "";
    }
  }
};
</script>