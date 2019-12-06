<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container fluid style="background-color:rgb(255,255,255);">
      <div class="text--primary" >
        <v-layout row wrap>
          <v-flex d-flex>
            <!-- Using a dynamic class -->
            <v-hover>
              <template v-slot="{ hover }">
                <div
                  :class="`elevation-${hover ? 24 : 6}`"
                  class="mx-auto pa-6 transition-swing"
                  style="width:600px"
                >
                  <b>病案接口</b>
                  <v-layout row wrap>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('query')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        患者病案查询
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer>
                    <v-spacer>&emsp;&emsp;</v-spacer>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        归档病案
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('unlock')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        病案解锁
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                  </v-layout>
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
                  <b>数字化病案</b>
                  <v-layout row wrap>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        历史病案扫描
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        医疗文书扫描
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        历史病案浏览
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                  </v-layout>
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
                  <b>数字化病案跟踪</b>
                  <v-layout row wrap>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        患者病案跟踪
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        借阅跟踪
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        挂失封存跟踪
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                  </v-layout>
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
                  <b>病案统计报表</b>
                  <v-layout row wrap>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('medrec_info')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        卫统表
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        市级报表
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        本院报表
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                  </v-layout>
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
                  <b>病案服务</b>
                  <v-layout row wrap>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        病案打印
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        病案借阅浏览
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        病案云复印预约
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                  </v-layout>
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
                  <v-layout row wrap>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark @click="clickItem('dict_icd10')">
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        疾病编码目录
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        科室词典
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="#3AB796" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        操作人员
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                  </v-layout>
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
  methods: {
    clickItem(tstr) {
      console.log("点击=" + tstr);
      if (tstr === "logout") {
        localStorage.removeItem("user");
        this.$router.push({ path: "/login" });
      }
      switch (tstr) {
        case "query":
          this.$router.push({ path: "/query" });
          break;
        case "out_cash":
          this.$router.push({ path: "/outcash" });
          break;
        case "unlock":
          this.$router.push({ path: "/unlock" });
          break;
        case "out_receipt":
          this.$router.push({ path: "/outreceipt" });
          break;
        case "detail_reg":
          this.$router.push({ path: "/detailreg" });
          break;
        case "detail_cash":
          this.$router.push({ path: "/detailcash" });
          break;
        case "detail_chk":
          this.$router.push({ path: "/detailchk" });
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
        case "medrec_info":
          this.$router.push({ path: "/medrecinfo" });
          break;
        case "dict_icd10":
          this.$router.push({ path: "/dictIcd10" });
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
