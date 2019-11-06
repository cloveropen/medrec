<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container>
      <div>
        <v-toolbar>
          <v-toolbar-title>词典设置</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
          <!-- <v-toolbar-items>
        <v-btn text>病案导入</v-btn>
        <v-btn text>患者信息查询</v-btn>
        <v-btn text>患者详细信息</v-btn>
          </v-toolbar-items>-->
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
      <v-data-table
      :headers="headers"
      :items="desserts"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    ></v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
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
        text: "疾病目录",
        disabled: true,
        href: "breadcrumbs_dashboard"
      }
    ],
    page: 1,
    pageCount: 0,
    itemsPerPage: 2,
    headers: [
      {
        text: "疾病编码",
        textcolor:"red",
        align: "left",
        sortable: false,
        value: "pid"
      },
      { text: "疾病名称", value: "patientName" }
    ],
    desserts: [
      {
        pid: "Z00000067835",
        patientName: "1预覆盖URhioff阿克苏"
      },
      {
        pid: "Z00000067835",
        patientName: "2预覆盖URhioff阿克苏"
      }
    ]
  })
};
</script>
