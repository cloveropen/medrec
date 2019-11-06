<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container>
      <div>
        <v-toolbar>
          <v-toolbar-title>病案催交</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </v-toolbar>
      </div>
      <!-- 按时间查询 时间选择器 -->
      <!-- <v-row>
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
      </v-row>-->
      <v-data-table
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
                <v-btn class="ma-2" color="success" dark>一键通知</v-btn>
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
    items: [
      {
        text: "病案催交",
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
      { text: "医师编号", value: "idCardNo" },
      { text: "医生姓名", value: "iron" }
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
  }
};
</script>
