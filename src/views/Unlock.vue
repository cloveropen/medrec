<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage v-bind:dialogSuccess="dialogSuccess" v-bind:dialogError="dialogError" v-bind:dialogSuccessContent="dialogSuccessContent" v-bind:dialogErrorContent="dialogErrorContent"/>
    <v-container>
      <div>
        <v-toolbar class="elevation-0">
          <v-toolbar-title>病案解锁</v-toolbar-title>
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
          <v-text-field label="请输入住院号" outlined></v-text-field>
        </v-col>
        <v-col cols="8" sm="6" md="2">
          <v-btn class="ma-2" outlined color="indigo">查 询</v-btn>
        </v-col>
      </v-row>
      <v-data-table class="mytable"
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :single-select="singleSelect"
        item-key="pid"
        show-select
        locale="zh-CN"
        >
         <template v-slot:top>
          <v-row>
            <v-col cols="8" sm="4" md="3">
                <v-switch v-model="singleSelect" label="单选" class="pa-3"></v-switch>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="8" sm="4" md="2">
                <v-btn class="ma-2"  color="error" dark >
                  <v-icon left>lock_open</v-icon>解锁
                </v-btn>
            </v-col>
          </v-row>
         </template>
      </v-data-table>
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
        text: "病案解锁",
        disabled: true,
        href: "breadcrumbs_dashboard"
      }
    ],
    headers: [
      { text: "封锁状态", value: "lockFlag",lign: "left", sortable: false },
      { text: "住院号", value: "pid" },
      { text: "姓名", value: "patientName" },
      { text: "医师", value: "phyName" },
      { text: "科室", value: "deptName" },
      { text: "质控名称", value: "qcName" },
      { text: "质控结果", value: "qcStatus" },
      { text: "时效结果", value: "qcReason" },
      { text: "质控内容", value: "qcContent" },
      { text: "时限要求", value: "qcRule" },
      //{ text: "入院时间", value: "inDate" },
      { text: "应该完成时间", value: "expectTime" },
      //{ text: "实际完成时间", value: "realTime" },
      { text: "质控人", value: "opcode" }
    ],
    singleSelect: false,
    selected: [],
    desserts: [
      {
        lockFlag:"已封锁",
        pid: "Z00000067835",
        patientName: "张天",
        phyName: "男",
        deptName: 24,
        qcName: "12345678900099",
        qcStatus: "1%",
        qcReason: "Z00000067835",
        qcContent: "张天",
        qcRule: "男",
        //inDate: 24,
        expectTime: "12345678900099",
        //realTime: "1%",
        opcode: "1%"
      }
    ]
  })
};
</script>
<style >
.mytable table tr th,td {
    border: 1px solid rgba(113, 219, 191, 0.911);
    padding: 0 0 0 0 ;
    margin: 0 0 0 0;
    
}
.mytable th{
    background-color: #3AB796;    
}
</style>