<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage v-bind:dialogSuccess="dialogSuccess" v-bind:dialogError="dialogError" v-bind:dialogSuccessContent="dialogSuccessContent" v-bind:dialogErrorContent="dialogErrorContent"/>
    <v-container>
      <div>
        <v-toolbar class="elevation-0">
          <v-toolbar-title>病案复印登记</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </v-toolbar>
      </div>
      <v-form ref="formReg" id="printMe" lazy-validation>
      <v-row>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="copyRegister.applyCopy" label="申请复印人" required></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="copyRegister.caseNo" label="病案号" required></v-text-field>
            </v-col>
            
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="copyRegister.noteTaker" label="记录人"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
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
          </v-row>
          <v-row>
            <v-col cols="12" >
              <v-text-field class="abc" v-model="copyRegister.remarks" label="备注"></v-text-field>
            </v-col>
          </v-row>
      </v-form>
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
    copyRegister:[],
    dialogSuccess: false,
    dialogError: false,
    dialogSuccessContent: "",
    dialogErrorContent: "",
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  }
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