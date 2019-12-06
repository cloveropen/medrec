<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container>
      <v-toolbar>
        <v-toolbar-title>数据上报</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-breadcrumbs :items="items"></v-breadcrumbs>
      </v-toolbar>
      <DataExport/>
    </v-container>
  </v-app>
</template>
<script>
import Basepage from "../components/Basepage";
import DataExport from "../components/DataExport";
export default {
  components: {
    Basepage,
    DataExport
  },
  data: () => ({
    items: [
      {
        text: "数据上报",
        disabled: true
      },
      {
        text: "导出数据",
        disabled: true
      }
    ]
  })
};
</script>
