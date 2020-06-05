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
          <v-toolbar-title>用户管理</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </v-toolbar>
      </div>
      <!-- 功能按钮 -->
      <v-row>
        <v-col>
          <v-btn class="ma-2" tile outlined color="success" @click="add_dialog=true">
            <v-icon left>add</v-icon>新增用户
          </v-btn>
        </v-col>
        <v-col>
          <v-btn class="ma-2" tile outlined color="error" @click="deleteUser()">
            <v-icon left>delete</v-icon>删除用户
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="orange"
            @click="update_dialog=true"
            :disabled="updateFlag"
          >
            <v-icon left>edit</v-icon>修改密码
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-simple-table fixed-header height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">用户编码</th>
                  <th class="text-left">用户姓名</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in userList" :key="item.seq" @click="loadUserInfo(item.userCode)">
                  <td>{{ item.userCode }}</td>
                  <td>{{ item.userName }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col>
          <v-form ref="form" v-model="updUserInfo">
            <v-text-field
              v-model="updUserInfo.userCode"
              :counter="4"
              label="用户编码"
              required
              disabled
            ></v-text-field>
            <v-text-field v-model="updUserInfo.userName" label="用户名称" required></v-text-field>
            <v-text-field v-model="updUserInfo.userPasswd" label="用户密码" disabled type="password"></v-text-field>
            <v-btn color="success" class="mr-4" @click="updateUserInfo('2')">保存修改</v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-dialog v-model="add_dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">新增用户</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="用户姓名"
                      v-model="userInfo.userName"
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="输入密码"
                      v-model="userInfo.userPasswd"
                      required
                      :rules="[rules.required]"
                      type="password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="再次输入密码"
                      v-model="userPasswdAgain"
                      required
                      :rules="[rules.required]"
                      type="password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="用户编码" v-model="userInfo.userCode" disabled></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>提交成功后自动生成用户编码</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="add_dialog = false">关闭</v-btn>
              <v-btn color="blue darken-1" text @click="addUser()">提交</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row>
        <v-dialog v-model="update_dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">修改密码</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="原密码"
                      v-model="oldPassword"
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="新密码"
                      v-model="newPassword"
                      required
                      :rules="[rules.required]"
                      type="password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="再次输入密码"
                      v-model="newPasswordAgain"
                      required
                      :rules="[rules.required]"
                      type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="update_dialog = false">关闭</v-btn>
              <v-btn color="blue darken-1" text @click="updateUserInfo('1')">确定</v-btn>
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
    add_dialog: false,
    update_dialog: false,
    updateFlag: true,
    userInfo: {},
    updUserInfo: {},
    userPasswdAgain: "",
    dialogSuccess: false,
    dialogError: false,
    dialogSuccessContent: "",
    dialogErrorContent: "",
    rules: {
      required: value => !!value || "必须填写！"
    },
    items: [
      {
        text: "系统管理",
        disabled: false,
        href: "breadcrumbs_dashboard"
      },
      {
        text: "用户管理",
        disabled: true,
        href: "breadcrumbs_dashboard"
      }
    ],
    userList: []
  }),
  watch: {
    //定时关掉弹框
    dialogError(val) {
      if (!val) return;
      setTimeout(() => (this.dialogError = false), 2000);
    },
    dialogSuccess(val) {
      if (!val) return;
      setTimeout(() => (this.dialogSuccess = false), 2000);
    }
  },
  mounted: function() {
    this.getUserList(); //默认加载用户列表
  },
  methods: {
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
            sel.userList = JSON.parse(data.outdata);
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
    addUser() {
      let sel = this;
      if (sel.userInfo.userPasswd != sel.userPasswdAgain) {
        (sel.dialogError = true),
          (sel.dialogErrorContent = "两次密码输入不一致，请重新输入");
        sel.userInfo.userPasswd = "";
        sel.userPasswdAgain = "";
        return;
      }
      fetch(process.env.VUE_APP_MAIN_URL + "add/user", {
        method: "post",
        body: JSON.stringify(sel.userInfo),
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
            sel.userInfo = JSON.parse(data.outdata);
            sel.dialogSuccess = true;
            sel.dialogSuccessContent = "新增成功";
            sel.getUserList();
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
    loadUserInfo(userCode) {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "getuser/" + userCode, {
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
            sel.updUserInfo = JSON.parse(data.outdata);
            sel.updateFlag = false;
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
    deleteUser() {
      let sel = this;
      fetch(
        process.env.VUE_APP_MAIN_URL +
          "delete/user/" +
          sel.updUserInfo.userCode,
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
          let topstatus = data.resultCode;
          if (topstatus == "0") {
            sel.dialogSuccess = true;
            sel.dialogSuccessContent = data.outdata;
            sel.getUserList();
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
    updateUserInfo(flag) {
      let sel = this;
      if (flag == "1") {
        if (sel.oldPassword != sel.updUserInfo.userPasswd) {
          sel.dialogError = true;
          sel.dialogErrorContent = "原密码输入错误，请重新输入";
          sel.oldPassword = "";
          return;
        }
        if (sel.newPassword != sel.newPasswordAgain) {
          sel.dialogError = true;
          sel.dialogErrorContent = "两次密码输入不一致，请重新输入";
          sel.newPassword = "";
          sel.newPasswordAgain = "";
          return;
        }
        sel.updUserInfo.userPasswd = sel.newPasswordAgain;
        fetch(process.env.VUE_APP_MAIN_URL + "update/userPasswd", {
          method: "post",
          body: JSON.stringify(sel.updUserInfo),
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
            } else {
              sel.dialogError = true;
              sel.dialogErrorContent = data.errorMsg;
            }
          })
          .catch(function(err) {
            sel.dialogError = true;
            sel.dialogErrorContent = err;
          });
      } else {
        fetch(process.env.VUE_APP_MAIN_URL + "update/user", {
          method: "post",
          body: JSON.stringify(sel.updUserInfo),
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
      sel.getUserList();
    }
  }
};
</script>
