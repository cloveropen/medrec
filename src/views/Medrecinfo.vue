<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container>
      <div>
        <v-toolbar>
          <v-toolbar-title>病案统计报表</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </v-toolbar>
      </div>
      <!-- 按条件查询  -->
      <v-row>
        <v-col cols="8" sm="6" md="3">
          <v-text-field label="请输入疾病编码" outlined></v-text-field>
        </v-col>
        <v-col cols="8" sm="6" md="3">
          <v-text-field label="请输入疾病名称" outlined></v-text-field>
        </v-col>
        <v-col cols="8" sm="6" md="2">
          <v-btn class="ma-2" outlined color="indigo">查 询</v-btn>
        </v-col>
      </v-row>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="1">
              <v-text-field loader-height=1 v-model="firstname" :rules="nameRules" solo ></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-text-field v-model="lastname" :rules="nameRules" solo></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-text-field v-model="email" :rules="emailRules" solo></v-text-field>
            </v-col>
             <v-col cols="12" md="1">
              <v-text-field v-model="email" :rules="emailRules" solo></v-text-field>
            </v-col>
             <v-col cols="12" md="1">
              <v-text-field v-model="email" :rules="emailRules" solo></v-text-field>
            </v-col>
             <v-col cols="12" md="1">
              <v-text-field v-model="email" :rules="emailRules" solo></v-text-field>
            </v-col>
             <v-col cols="12" md="1">
              <v-text-field v-model="email" :rules="emailRules" solo></v-text-field>
            </v-col>
             <v-col cols="12" md="1">
              <v-text-field v-model="email" :rules="emailRules" solo></v-text-field>
            </v-col>
             <v-col cols="12" md="1">
              <v-text-field v-model="email" :rules="emailRules" solo></v-text-field>
            </v-col>
             <v-col cols="12" md="1">
              <v-text-field loader-height=1 v-model="firstname" :rules="nameRules" solo ></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-text-field v-model="lastname" :rules="nameRules" solo></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-text-field v-model="email" :rules="emailRules" solo></v-text-field>
            </v-col>
             <v-col cols="12" md="1">
              <v-text-field v-model="email" :rules="emailRules" solo></v-text-field>
            </v-col>
             <v-col cols="12" md="1">
              <v-text-field v-model="email" :rules="emailRules" solo></v-text-field>
            </v-col>
             <v-col cols="12" md="1">
              <v-text-field v-model="email" :rules="emailRules" solo></v-text-field>
            </v-col>
             <v-col cols="12" md="1">
              <v-text-field v-model="email" :rules="emailRules" solo></v-text-field>
            </v-col>
             <v-col cols="12" md="1">
              <v-text-field v-model="email" :rules="emailRules" solo></v-text-field>
            </v-col>
             <v-col cols="12" md="1">
              <v-text-field v-model="email" :rules="emailRules" solo></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
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
        text: "卫统表",
        disabled: true,
        href: "breadcrumbs_dashboard"
      }
    ],
    height:"10"
  })
};
</script>
