<template>
  <v-container class="grey lighten-5">
    <v-form ref="formReg" id="printMe" lazy-validation>
      <!--  v-model="valid" -->
      <v-card class="mx-auto" max-width="99%" min-width="100%">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="shiftInRecord.patientName" label="姓名" required></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="shiftInRecord.gender" label="性别" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="shiftInRecord.birthDate" label="出生日期"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="shiftInRecord.age" label="年龄(岁)"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="shiftInRecord.inDate" label="入院时间"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="shiftInRecord.shiftTime" label="接班时间"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="shiftInRecord.bedNumber" label="床位号"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="shiftInRecord.recordPhy" label="交班医师签名"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="shiftInRecord.inCondition" label="入院情况"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="shiftInRecord.inDiag" label="入院诊断"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="shiftInRecord.treatment" label="治疗经过"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="shiftInRecord.curCondition" label="目前情况"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="shiftInRecord.curDiag" label="目前诊断"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="shiftInRecord.treatPlan" label="接班后的诊疗计划"></v-text-field>
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
    shiftInRecord: Object
  },
  data: () => ({
    shiftInRecord: {}
    // //------------------获取指定省份的市列表---------------------------
    // provChanged() {
    //   let tprovid = this.shiftInRecord.addrProv;
    //   this.addrCitys = getcitys(tprovid);
    // },
    // //------------------获取指定市的区县列表---------------------------
    // cityChanged() {
    //   let tcityid = this.shiftInRecord.addrCity;
    //   this.addrCountys = getcountys(tcityid);
    // },
    // //------------------获取指定区县的街道列表---------------------------
    // countyChanged() {
    //   let tcountyid = this.shiftInRecord.addrCounty;
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
