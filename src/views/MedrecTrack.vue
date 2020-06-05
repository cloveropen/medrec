<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage
      v-bind:dialogSuccess="dialogSuccess"
      v-bind:dialogError="dialogError"
      v-bind:dialogSuccessContent="dialogSuccessContent"
      v-bind:dialogErrorContent="dialogErrorContent"
    />
    <v-container>
      <div>
        <v-toolbar class="elevation-0">
          <v-toolbar-title>病案跟踪</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </v-toolbar>
      </div>
      <!--时间线-->
      <v-row dense>
        <!-- <v-col
          v-for="item in item1"
          :key="item.id"
        >
          <v-card>
              <v-card-title v-text="item.trackStatus"></v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <p>{{item.patientName}}</p>
              <v-spacer></v-spacer>
              <p class="display-1 text--primary">
                    {{item.optime}}
                  </p>
                  <v-spacer></v-spacer>
                  <p>{{item.caseNo}}{{item.patientName}}</p>
                  <v-spacer></v-spacer>
                  <div class="text--primary">
                    操作员{{item.operator}}<br>
                    借阅人{{item.medrecUser}}
                  </div>
            </v-card-actions>
          </v-card>
        </v-col>-->
        <v-col v-for="item1 in medrecTrack" :key="item1">
          <v-timeline :align-top="alignTop" :dense="dense" :reverse="reverse">
            <v-timeline-item
              v-for="item in item1"
              :key="item.id"
              :fill-dot="fillDot"
              :hide-dot="hideDot"
              :icon="icon ? 'mdi-star' : ''"
              :icon-color=" iconColor ? 'deep-orange' : ''"
              :left="left"
              :right="right"
              :small="small"
            >
              <template v-slot:icon>
                <v-avatar v-if="avatar">
                  <img src="http://i.pravatar.cc/64" />
                </v-avatar>
              </template>
              <span slot="opposite">{{item.optime}}</span>
              <v-card class="elevation-2">
                <v-card-title class="headline">{{item.trackStatus}}</v-card-title>
                <v-card-text>
                  病案号：{{item.caseNo}}
                  <br />
                  患者姓名：{{item.patientName}}
                  <br />
                  操作员：{{item.operator}}
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
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
    medrecTrack: [],
    items: [
      {
        text: "归档与借阅",
        disabled: false,
        href: "/"
      },
      {
        text: "病案跟踪",
        disabled: true,
        href: "breadcrumbs_dashboard"
      }
    ],
    dialogSuccess: false,
    dialogError: false,
    dialogSuccessContent: "",
    dialogErrorContent: "",
    timeIndex: 2,
    timeLineList: [
      {
        timestamp: "2012年",
        color: "#999",
        fontsize: 18,
        size: "28",
        bgcolor: "#e4e7ed",
        icon: "el-iconprev",
        year: "2012",
        info: "chengli"
      },
      {
        timestamp: "2013年",
        color: "#999",
        fontsize: 18,
        size: "28",
        bgcolor: "#e4e7ed",
        year: "2013",
        info: "工作室更名为：西安拓美网络科技有限公司"
      },
      {
        timestamp: "2014年",
        color: "#999",
        fontsize: 18,
        size: "28",
        bgcolor: "#e4e7ed",
        year: "2014",
        info: "工作室更名为：西安拓美网络科技有限公司"
      },
      {
        timestamp: "2015年",
        color: "#999",
        fontsize: 18,
        year: "2015",
        size: "28",
        bgcolor: "#e4e7ed",
        info: "工作室更名为：西安拓美网络科技有限公司"
      },
      {
        timestamp: "2016年",
        color: "#999",
        fontsize: 18,
        size: "28",
        year: "2016",
        bgcolor: "#e4e7ed",
        info: "工作室更名为：西安拓美网络科技有限公司"
      },
      {
        timestamp: "2017年",
        color: "#999",
        fontsize: 18,
        size: "28",
        bgcolor: "#e4e7ed",
        year: "2017",
        info: "工作室更名为：西安拓美网络科技有限公司"
      },
      {
        timestamp: "2018年",
        color: "#999",
        fontsize: 18,
        size: "28",
        bgcolor: "#e4e7ed",
        year: "2018",
        info: "工作室更名为：西安拓美网络科技有限公司"
      },
      {
        timestamp: "2019年",
        color: "#999",
        fontsize: 18,
        year: "2019",
        bgcolor: "#e4e7ed",
        size: "28",
        info: "工作室更名为：西安拓美网络科技有限公司"
      }
    ]
  }),
  mounted: function() {
    this.getMedrecTrackList();
  },
  methods: {
    getMedrecTrackList() {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "getMedrec/track", {
        method: "get",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          if (!response.ok) {
            sel.dialogError = true;
            sel.dialogErrorContent = "请求失败 " + response.err;
          }
          return response.json();
        })
        .then(function(data) {
          console.log("data=" + JSON.stringify(data)); // this will be a string
          let topstatus = data.resultCode;
          if (topstatus == "0") {
            sel.medrecTrack = JSON.parse(data.outdata);
            sel.medrecTrack.map(function(tdata) {
              tdata.map(function(val) {
                if (val.trackStatus == 1) {
                  val.trackStatus = "病案归档";
                } else if (val.trackStatus == 2) {
                  val.trackStatus = "病案退回";
                } else if (val.trackStatus == 3) {
                  val.trackStatus = "病案借阅";
                } else if (val.trackStatus == 4) {
                  val.trackStatus = "病案归还";
                }
              });
            });
          } else {
            sel.dialogError = true;
            sel.dialogErrorContent = data.errorMsg;
          }
        })
        .catch(function(err) {
          sel.dialogError = true;
          sel.dialogErrorContent = "请求异常：" + err;
        });
    },
    getMedrecTrackByCaseNo() {
      let sel = this;
      fetch(process.env.VUE_APP_MAIN_URL + "medrec/track", {
        method: "get",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          if (!response.ok) {
            sel.dialogError = true;
            sel.dialogErrorContent = "请求失败 " + response.err;
          }
          return response.json();
        })
        .then(function(data) {
          console.log("data=" + JSON.stringify(data)); // this will be a string
          let topstatus = data.resultCode;
          if (topstatus == "0") {
            sel.medrecTrack = JSON.parse(data.outdata);
          } else {
            sel.dialogError = true;
            sel.dialogErrorContent = data.errorMsg;
          }
        })
        .catch(function(err) {
          sel.dialogError = true;
          sel.dialogErrorContent = "请求异常：" + err;
        });
    }
  }
};
</script>
<style scoped>
.my_timeline_prev,
.my_timeline_next {
  float: left;
  display: inline-block;
  background-color: #fff;
  cursor: pointer;
}
.my_timeline_prev {
  width: 200px;
  float: left;
}
.my_timeline_next {
  width: 34px;
  margin-left: -22px;
}
.ul_box {
  width: 900px;
  height: 60px;
  display: inline-block;
  float: left;
  margin-top: 2px;
  overflow: hidden;
}
.my_timeline_item {
  display: inline-block;
  width: 220px;
}
.my_timeline_node {
  box-sizing: border-box;
  border-radius: 50%;
  cursor: pointer;
}
.my_timeline_node.active {
  background-color: #fff !important;
  border: 6px solid #f68720;
}
.my_timeline_item_line {
  width: 100%;
  height: 10px;
  margin: -14px 0 0 28px;
  border-top: 2px solid #e4e7ed;
  border-left: none;
}
.my_timeline_item_content {
  margin: 10px 0 0 -10px;
}
</style>