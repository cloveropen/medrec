<template>
  <v-container>
    <v-btn class="success" @click="exportN041()">导出</v-btn>
    <v-form ref="formReg" id="printMe" lazy-validation>
      <v-card class="mx-auto" max-width="99%" min-width="100%">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-select :items="items" label="导出类型"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
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
                  <v-text-field
                    v-model="dateEnd"
                    label="结束时间"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateEnd"
                  height="100%"
                  locale="zh-cn"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              
            </v-col>
          </v-row>
        </v-card-text>
        
      </v-card>
      
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: ['卫统四表'],
    dateBegin: new Date().toISOString().substr(0, 10),
    dateEnd: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false
  }),
  methods: {
    exportN041 () {
      let sel = this;
      let tin = sel.dateBegin + "|" + sel.dateEnd;
      fetch(process.env.VUE_APP_MAIN_URL+"excel/" + tin, {
        method: 'get',
        responseType: 'blob'
      }).then(res => {
        return res.blob();
      }).then(blob => {
        let bl = new Blob([blob], { type: "excel/xlsx" });
        let fileName = Date.parse(new Date()) + ".xlsx";
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(link.href);
      })
    }
  }
}
</script>
