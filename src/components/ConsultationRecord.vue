<template>
  <v-container class="grey lighten-5">
    <v-form ref="formReg" id="printMe" lazy-validation>
      <!--  v-model="valid" -->
      <v-card class="mx-auto" max-width="99%" min-width="100%">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="consultationRecord.patientName" label="姓名" required></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="consultationRecord.gender" label="性别" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="consultationRecord.birthDate" label="出生日期"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="consultationRecord.age" label="年龄(岁)"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="consultationRecord.inDate" label="入院时间"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="consultationRecord.applyTime" label="申请会诊时间"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="consultationRecord.consultateTime" label="会诊时间"></v-text-field>
            </v-col>
                        <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="consultationRecord.recordTime" label="记录时间"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="consultationRecord.consultationType" label="会诊类型"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="consultationRecord.bedNumber" label="床位号"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="consultationRecord.conditions" label="病人病情"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="consultationRecord.treatment" label="诊疗情况"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="consultationRecord.applyReason" label="申请会诊理由和目的"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="consultationRecord.applyDept" label="申请会诊科室"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="consultationRecord.consultationDept" label="被邀会诊科室"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="consultationRecord.applyPhy" label="申请医生"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field class="abc" v-model="consultationRecord.consultationPhy" label="被邀会诊专家"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                class="abc"
                v-model="consultationRecord.suggestion"
                label="会诊意见"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                class="abc"
                v-model="consultationRecord.recordDept"
                label="会诊科室签名"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="abc"
                v-model="consultationRecord.recordPhy"
                label="会诊医生签名"
              ></v-text-field>
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
    consultationRecord: Object
  },
  data: () => ({
    consultationRecord: {}
    // //------------------获取指定省份的市列表---------------------------
    // provChanged() {
    //   let tprovid = this.consultationRecord.addrProv;
    //   this.addrCitys = getcitys(tprovid);
    // },
    // //------------------获取指定市的区县列表---------------------------
    // cityChanged() {
    //   let tcityid = this.consultationRecord.addrCity;
    //   this.addrCountys = getcountys(tcityid);
    // },
    // //------------------获取指定区县的街道列表---------------------------
    // countyChanged() {
    //   let tcountyid = this.consultationRecord.addrCounty;
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
