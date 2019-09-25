<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container fluid fill-height>
      <div class="text--primary" >
        <v-layout row wrap>
          <v-flex d-flex>
            <!-- Using a dynamic class -->
            <v-hover>
              <template v-slot="{ hover }">
                <div
                  :class="`elevation-${hover ? 24 : 6}`"
                  class="mx-auto pa-6 transition-swing"
                >
                  <b>病案接口</b>
                  <v-layout row wrap>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="success" fab x-large dark>
                          <v-icon>mdi-domain</v-icon>
                        </v-btn>
                        <div class="my-6"></div>
                        患者病案查询
                      </div>
                    </v-flex>
                    <v-spacer>&emsp;&emsp;</v-spacer
                    ><v-spacer>&emsp;&emsp;</v-spacer>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="success" fab x-large dark>
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
                        <v-btn color="success" fab x-large dark>
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
          <v-spacer>&emsp;&emsp;</v-spacer><v-spacer>&emsp;&emsp;</v-spacer>

          <v-flex d-flex>
            <!-- Using a dynamic class -->
            <v-hover>
              <template v-slot="{ hover }">
                <div
                  :class="`elevation-${hover ? 24 : 6}`"
                  class="mx-auto pa-2 transition-swing"
                >
                  <b>数字化病案</b>
                  <v-layout row wrap>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="success" fab x-large dark>
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
                        <v-btn color="success" fab x-large dark>
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
                        <v-btn color="success" fab x-large dark>
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
          <v-spacer>&emsp;&emsp;</v-spacer><v-spacer>&emsp;&emsp;</v-spacer>

          <v-flex d-flex>
            <v-hover>
              <template v-slot="{ hover }">
                <div
                  :class="`elevation-${hover ? 24 : 6}`"
                  class="mx-auto pa-2 transition-swing"
                >
                  <b>数字化病案跟踪</b>
                  <v-layout row wrap>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="success" fab x-large dark>
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
                        <v-btn color="success" fab x-large dark>
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
                        <v-btn color="success" fab x-large dark>
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
                >
                  <b>病案统计报表</b>
                  <v-layout row wrap>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="success" fab x-large dark>
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
                        <v-btn color="success" fab x-large dark>
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
                        <v-btn color="success" fab x-large dark>
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
                >
                  <b>病案服务</b>
                  <v-layout row wrap>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="success" fab x-large dark>
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
                        <v-btn color="success" fab x-large dark>
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
                        <v-btn color="success" fab x-large dark>
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
                >
                  <b>词典设置</b>
                  <v-layout row wrap>
                    <v-flex d-flex
                      >&emsp;
                      <div class="my-2" align="center">
                        <v-btn color="success" fab x-large dark>
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
                        <v-btn color="success" fab x-large dark>
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
                        <v-btn color="success" fab x-large dark>
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
  }
};
</script>
