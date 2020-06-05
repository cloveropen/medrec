<template>
  <v-container class="grey lighten-5">
    <v-form ref="formReg" id="printMe" lazy-validation>
      <!--  v-model="valid" -->
      <v-card class="mx-auto" max-width="99%" min-width="100%">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="ran.patientName" label="姓名" required></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="ran.gender" label="性别" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="ran.birthDate" label="出生日期"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="ran.age" label="年龄(岁)"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="ran.inDate" label="入院时间"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="ran.recordTime" label="记录时间"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="ran.representor" label="病情陈述者"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="abc" v-model="ran.reliability" label="可靠性"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="ran.bedNumber" label="床位号"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="ran.solarTerm" label="发病节气"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea auto-grow v-model="ran.narrate" label="主诉"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea auto-grow v-model="ran.ishis" label="现病史"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea auto-grow v-model="ran.pasthis" label="既往史"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea auto-grow v-model="ran.personhis" label="个人史"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <v-textarea auto-grow v-model="ran.marryhis" label="月经史/婚育史"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea auto-grow v-model="ran.familyhis" label="家族史"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea auto-grow v-model="ran.phyExam" label="体格检查"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea auto-grow v-model="ran.specialExam" label="专科检查"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea auto-grow v-model="ran.assistExam" label="辅助检查"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea auto-grow v-model="ran.firstdiagName" label="初步诊断"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea auto-grow v-model="ran.confirmdiagName" label="确定诊断"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea auto-grow v-model="ran.revisediagName" label="修订诊断"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea auto-grow v-model="ran.adddiagName" label="补充诊断"></v-textarea>
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
    ran: Object
  },
  data: () => ({
    ran: {}
    // //------------------获取指定省份的市列表---------------------------
    // provChanged() {
    //   let tprovid = this.ran.addrProv;
    //   this.addrCitys = getcitys(tprovid);
    // },
    // //------------------获取指定市的区县列表---------------------------
    // cityChanged() {
    //   let tcityid = this.ran.addrCity;
    //   this.addrCountys = getcountys(tcityid);
    // },
    // //------------------获取指定区县的街道列表---------------------------
    // countyChanged() {
    //   let tcountyid = this.ran.addrCounty;
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
