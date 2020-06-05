<template>
  <v-container class="grey lighten-5">
    <v-form ref="formReg" id="printMe" lazy-validation>
      <!--  v-model="valid" -->
      <v-card class="mx-auto" max-width="99%" min-width="100%">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="more30daysDiscuss.patientName" label="姓名" required></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="more30daysDiscuss.gender" label="性别" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="more30daysDiscuss.birthDate" label="出生日期"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="more30daysDiscuss.age" label="年龄(岁)"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="more30daysDiscuss.inDate" label="入院时间"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="more30daysDiscuss.recordTime" label="记录时间"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!-- <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="more30daysDiscuss.brithPlace" label="出生地"></v-text-field>
            </v-col> -->
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="more30daysDiscuss.profession" label="职业"></v-text-field>
            </v-col>
            <!-- <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="more30daysDiscuss.nation" label="患者病情"></v-text-field>
            </v-col> -->
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="more30daysDiscuss.superiorPhy" label="上级医师签名"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="more30daysDiscuss.recordPhy" label="医师签名"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea class="abc" v-model="more30daysDiscuss.discussContent" label="讨论内容"></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>
<script>
export default {
  props: {
    more30daysDiscuss: Object
  },
  data: () => ({
    more30daysDiscuss: {}
    // //------------------获取指定省份的市列表---------------------------
    // provChanged() {
    //   let tprovid = this.more30daysDiscuss.addrProv;
    //   this.addrCitys = getcitys(tprovid);
    // },
    // //------------------获取指定市的区县列表---------------------------
    // cityChanged() {
    //   let tcityid = this.more30daysDiscuss.addrCity;
    //   this.addrCountys = getcountys(tcityid);
    // },
    // //------------------获取指定区县的街道列表---------------------------
    // countyChanged() {
    //   let tcountyid = this.more30daysDiscuss.addrCounty;
    //   this.addrTownships = getstreets(tcountyid);
    // }
    // ---------------------end methods----------------
  })
};
</script>

<style media="print">
@page {
  margin: 15mm;
}
.abc {
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  font-size: 14px;
}
</style>
