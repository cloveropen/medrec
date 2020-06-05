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
          <v-toolbar-title>权限管理</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </v-toolbar>
      </div>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              用户列表
              <v-data-table
                :headers="headerUser"
                :items="dessertUser"
                :items-per-page="10"
                v-model="selectedUser"
                :single-select="singleSelect"
                class="elevation-1"
                show-select
                @click:col="getUserRole(selectedUser[0].userCode)"
                locale="zh-CN"
              ></v-data-table>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>
              权限列表
              <v-data-table
                :headers="headerRole"
                :items="dessertRole"
                v-model="selectedRole"
                :items-per-page="10"
                class="elevation-1"
                :single-select="singleSelect1"
                show-select
                locale="zh-CN"
              ></v-data-table>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-btn right class="ma-2" dark large color="teal" @click="updateUserRole()">保存</v-btn>
      </v-row>
      <v-dialog v-model="dialogAlert" width="300">
        <v-card height="100" style="background-color:rgb(210, 241, 231)">
          <v-flex class="tooltip">系统提示</v-flex>
          <v-flex class="tooltip-content">
            <strong>保存成功</strong>
          </v-flex>
        </v-card>
      </v-dialog>
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
    dialogSuccess: false,
    dialogError: false,
    dialogSuccessContent: "",
    dialogErrorContent: "",
    items: [
      {
        text: "系统管理",
        disabled: false,
        href: "/"
      },
      {
        text: "权限管理",
        disabled: true,
        href: "breadcrumbs_dashboard"
      }
    ],
    headerUser: [
      { text: "用户编号", value: "userCode", lign: "left", sortable: false },
      { text: "用户姓名", value: "userName" }
    ],
    headerRole: [
      { text: "权限编号", value: "roleCode", lign: "left", sortable: false },
      { text: "权限名称", value: "roleName" }
    ],
    singleSelect: true,
    singleSelect1: false,
    selectedRole: [],
    selectedUser: [],
    dessertUser: [],
    dessertRole: []
  }),
  watch: {
    selectedUser(val) {
      console.log(val);
      if (val.length == 0) {
        this.selectedRole = [];
      } else {
        this.getUserRole(val[0].userCode);
      }
    }
  },
  mounted: function() {
    this.getDictRole();
    this.getUserList();
  },
  methods: {
    getDictRole() {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "dictRole", {
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
            sel.dessertRole = JSON.parse(data.outdata);
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
    getUserList() {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "userList", {
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
            sel.dessertUser = JSON.parse(data.outdata);
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
    getUserRole(userCode) {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "userRole/" + userCode, {
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
            sel.selectedRole = JSON.parse(data.outdata);
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
    updateUserRole() {
      let sel = this;
      sel.selectedRole.map(function(val) {
        val.userCode = sel.selectedUser[0].userCode;
        val.userName = sel.selectedUser[0].userName;
      });
      fetch(process.env.VUE_APP_MAIN_URL + "update/userRole", {
        method: "post",
        mode: "cors",
        body: JSON.stringify(sel.selectedRole),
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
            sel.dialogAlert = true;
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