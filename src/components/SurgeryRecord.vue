<template>
  <v-container class="grey lighten-5">
    <v-form ref="formReg" id="printMe" lazy-validation>
      <!--  v-model="valid" -->
      <v-card class="mx-auto" max-width="99%" min-width="100%">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="surgeryRecord.patientName" label="姓名" required></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="surgeryRecord.gender" label="性别" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="surgeryRecord.birthDate" label="出生日期"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="surgeryRecord.age" label="年龄(岁)"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="surgeryRecord.inDate" label="入院时间"></v-text-field>
            </v-col>
           <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="surgeryRecord.bedNumber" label="床位号"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="surgeryRecord.inDepid" label="住院科室"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.surgeryBdTime" label="手术开始时间"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.surgeryEdTime" label="手术结束时间"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.preDiag" label="术前诊断"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.curDiag" label="术中诊断"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.surgeryName" label="手术名称"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.anesType" label="麻醉方式"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.operPosition" label="手术体位"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.incisionSite" label="切口部位"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field class="abc" v-model="surgeryRecord.operDrugs" label="术中用药"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="abc" v-model="surgeryRecord.skinDisinfection" label="皮肤消毒"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.surgeryInstructor" label="手术指导者"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.surgeryPhy" label="手术者"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.surgeryAssistant" label="助手"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.anesPhy" label="麻醉医师"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.nurseInstru" label="器械护士"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.nurseTour" label="洗手及巡回护士"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.optime" label="记录时间"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="surgeryRecord.recordPhy" label="手术医师签名"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="surgeryRecord.bfAbstract" label="术前病例摘要"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="surgeryRecord.surgeryProcess" label="手术步骤及经过"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="surgeryRecord.pathoFind" label="病理所见"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="surgeryRecord.patCond" label="手术完成是病人情况"></v-text-field>
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
    surgeryRecord: Object
  },
  data: () => ({
    surgeryRecord: {}
    // //------------------获取指定省份的市列表---------------------------
    // provChanged() {
    //   let tprovid = this.surgeryRecord.addrProv;
    //   this.addrCitys = getcitys(tprovid);
    // },
    // //------------------获取指定市的区县列表---------------------------
    // cityChanged() {
    //   let tcityid = this.surgeryRecord.addrCity;
    //   this.addrCountys = getcountys(tcityid);
    // },
    // //------------------获取指定区县的街道列表---------------------------
    // countyChanged() {
    //   let tcountyid = this.surgeryRecord.addrCounty;
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
