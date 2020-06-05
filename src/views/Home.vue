<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage v-bind:dialogSuccess="dialogSuccess" v-bind:dialogError="dialogError" v-bind:dialogSuccessContent="dialogSuccessContent" v-bind:dialogErrorContent="dialogErrorContent"/>
    <v-container fluid style="background-color:rgb(255,255,255);">
      <div class="text--primary" >
        <v-layout row wrap>
          <v-flex d-flex>
           <v-hover>
              <template v-slot="{ hover }">
                <div
                  :class="`elevation-${hover ? 24 : 6}`"
                  class="mx-auto pa-2 transition-swing"
                  style="width:600px"
                >
                  <b>病案首页</b>
                  <v-row class='mb-6' dense>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('receive')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        病案录入
                      </div>
                    </v-col>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('data_audit')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        病案审核
                      </div>
                    </v-col>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('query')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        病案查询
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </template>
            </v-hover>
          </v-flex>

          <v-flex d-flex>
            <!-- Using a dynamic class -->
            <v-hover>
              <template v-slot="{ hover }">
                <div
                  :class="`elevation-${hover ? 24 : 6}`"
                  class="mx-auto pa-2 transition-swing"
                  style="width:600px"
                >
                  <b>统计报表</b>
                  <v-row class='mb-6' dense>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('ward_daily')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        病房日报统计
                      </div>
                    </v-col>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('outp_daily')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        门诊日报统计
                      </div>
                    </v-col>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('medi_daily')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        医技日报统计
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </template>
            </v-hover>
          </v-flex>
          <v-flex d-flex>
            <v-hover>
              <template v-slot="{ hover }">
                <div
                  :class="`elevation-${hover ? 24 : 6}`"
                  class="mx-auto pa-2 transition-swing"
                  style="width:600px"
                >
                  <b>病案归档及借阅</b>
                  <v-row class='mb-6' dense>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('medrec_file')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        病案归档与退回
                      </div>
                    </v-col>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('medrec_borrow')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        病案借阅与归还
                      </div>
                    </v-col>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('medrec_track')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        病案跟踪
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </template>
            </v-hover>
          </v-flex>
          <v-flex d-flex>
            <v-hover>
              <template v-slot="{ hover }">
                <div
                  :class="`elevation-${hover ? 24 : 6}`"
                  class="mx-auto pa-2 transition-swing"
                  style="width:600px"
                >
                  <b>病案输出</b>
                  <v-row class='mb-6' dense>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('medrec_prn')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        病案打印
                      </div>
                    </v-col>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('medrec_copy')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        病案复印
                      </div>
                    </v-col>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('data_upload')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        病案上传
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </template>
            </v-hover>
          </v-flex>
          <v-flex d-flex>
            <v-hover>
              <template v-slot="{ hover }">
                <div
                  :class="`elevation-${hover ? 24 : 6}`"
                  class="mx-auto pa-2 transition-swing"
                  style="width:600px"
                >
                  <b>词典设置</b>
                  <v-row class='mb-6' dense>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('dict_icd10')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        ICD10诊断词典
                      </div>
                    </v-col>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('dict_icd9_cm')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        手术编码词典
                      </div>
                    </v-col>
                    <v-col>
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('dict_dise_patt')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        中医病证词典
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </template>
            </v-hover>
          </v-flex>

          <v-flex d-flex>
            <v-hover>
              <template v-slot="{ hover }">
                <div
                  :class="`elevation-${hover ? 24 : 6}`"
                  class="mx-auto pa-2 transition-swing"
                  style="width:600px"
                >
                  <b>系统管理</b>
                  <v-row class='mb-6' dense>
                    <v-col>
                      <div class="my-3" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('role_setter')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        权限管理
                      </div>
                    </v-col>
                    <v-col>
                      <div class="my-3" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('user_setter')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        用户管理
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </template>
            </v-hover>
          </v-flex>
        </v-layout>
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
  data:()=>({
    dialogSuccess: false,
    dialogError: false,
    dialogSuccessContent: "",
    dialogErrorContent: "",
  }),
  methods: {
    clickItem(tstr) {
      console.log("点击=" + tstr);
      if (tstr === "logout") {
        localStorage.removeItem("user");
        this.$router.push({ path: "/login" });
      }
      switch (tstr) {
        case "receive":
          this.$router.push({ path: "/receive" });
          break;
        case "data_audit":
          this.$router.push({ path: "/data_audit" });
          break;
        case "query":
          this.$router.push({ path: "/query" });
          break;
        case "ward_daily":
          this.$router.push({ path: "/ward_daily" });
          break;
        case "outp_daily":
          this.$router.push({ path: "/outp_daily" });
          break;
        case "medi_daily":
          this.$router.push({ path: "/medi_daily" });
          break;
        case "medrec_prn":
          this.$router.push({ path: "/medrec_prn" });
          break;
        case "medrec_copy":
          this.$router.push({ path: "/medrec_copy" });
          break;
        case "data_upload":
          this.$router.push({ path: "/data_upload" });
          break;
        case "detail_undo":
          this.$router.push({ path: "/detailundo" });
          break;
        case "detail_op":
          this.$router.push({ path: "/detailop" });
          break;
        case "mg_dict":
          this.$router.push({ path: "/mgdict" });
          break;
        case "dict_icd9_cm":
          this.$router.push({ path: "/dictIcd9Cm" });
          break;
        case "dict_icd10":
          this.$router.push({ path: "/dictIcd10" });
          break;
        case "medrec_file":
          this.$router.push({ path: "/medrec_file" });
          break;
        case "medrec_borrow":
          this.$router.push({ path: "/medrec_borrow" });
          break;
        case "medrec_track":
          this.$router.push({ path: "/medrec_track" });
          break;
        case "role_setter":
          this.$router.push({ path: "/role_setter" });
          break;
        case "user_setter":
          this.$router.push({ path: "/user_setter" });
          break;
        default:
          localStorage.removeItem("user");
          this.$router.push({ path: "/login" });
      }
    },
    selectSource() {
      window.location.href = "http://localhost:8888";
    }
  }
};
</script>
