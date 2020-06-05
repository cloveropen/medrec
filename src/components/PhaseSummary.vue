<template>
  <v-container class="grey lighten-5">
    <v-form ref="formReg" id="printMe" lazy-validation>
      <!--  v-model="valid" -->
      <v-card class="mx-auto" max-width="99%" min-width="100%">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="phaseSummary.patientName" label="姓名" required></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="phaseSummary.gender" label="性别" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="phaseSummary.birthDate" label="出生日期"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="phaseSummary.age" label="年龄(岁)"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="phaseSummary.inDate" label="入院时间"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="phaseSummary.summaryTime" label="小结时间"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="phaseSummary.bedNumber" label="床位号"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="phaseSummary.recordPhy" label="医师签名"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="phaseSummary.narrate" label="病人主诉"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="phaseSummary.inCondition" label="入院情况"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="phaseSummary.treatment" label="诊疗经过"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="phaseSummary.curCondition" label="目前情况"></v-text-field>
            </v-col>
          </v-row>
             <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="phaseSummary.inDiag" label="入院诊断"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="phaseSummary.curDiag" label="目前诊断"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="phaseSummary.treatPlan" label="诊疗计划"></v-text-field>
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
    phaseSummary: Object
  },
  data: () => ({
    phaseSummary: {}
    // //------------------获取指定省份的市列表---------------------------
    // provChanged() {
    //   let tprovid = this.phaseSummary.addrProv;
    //   this.addrCitys = getcitys(tprovid);
    // },
    // //------------------获取指定市的区县列表---------------------------
    // cityChanged() {
    //   let tcityid = this.phaseSummary.addrCity;
    //   this.addrCountys = getcountys(tcityid);
    // },
    // //------------------获取指定区县的街道列表---------------------------
    // countyChanged() {
    //   let tcountyid = this.phaseSummary.addrCounty;
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
