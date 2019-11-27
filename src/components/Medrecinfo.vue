<template>
  <v-container class="grey lighten-5">
    <v-form ref="formReg" id="printMe" lazy-validation>
      <!--  v-model="valid" -->
      <v-card class="mx-auto" max-width="99%" min-width="100%">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                class="abc"
                v-model="medrecInfo.healthyNo"
                label="健康卡号"
                @input="expidChanged($event)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                class="abc"
                v-model="medrecInfo.inTimes"
                label="住院次数"
                @input="expidChanged($event)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecInfo.caseNo" label="病案号" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.pname" label="姓名" required></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.gender" label="性别" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecInfo.birthday" label="出生日期"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.age" label="年龄(岁)"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.nationality" label="国籍"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecInfo.ageMonths" label="(年龄不足1周岁的) 年龄(月)"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecInfo.weightBirth" label="新生儿出生体重(g)"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecInfo.weightAdm" label="新生儿入院体重(g)"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field class="abc" v-model="medrecInfo.birthplace" label="出生地"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecInfo.nativePlace" label="籍贯"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.nation" label="民族"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecInfo.idcard" label="身份证号(读卡或扫码获取)" disabled></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.occupation" label="职业"></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-text-field class="abc" v-model="medrecInfo.maritalStatus" label="婚姻"></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="1.未婚" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="2.已婚" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="3.丧偶" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="4.离婚" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="9.其他" value></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <v-select
                class="abc"
                v-model="medrecInfo.addrProv"
                :items="addrProvs"
                item-text="item-text"
                item-value="item-value"
                :rules="[v => !!v || '现住址省份不能为空']"
                label="现住址(省份)"
                hide-details
                prepend-icon="business"
                required
                @input="provChanged"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                class="abc"
                v-model="medrecInfo.addrCity"
                :items="addrCitys"
                item-text="item-text"
                item-value="item-value"
                :rules="[v => !!v || '现住址-市不能为空']"
                label="现住址(市)"
                hide-details
                prepend-icon="business"
                required
                @input="cityChanged"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                class="abc"
                v-model="medrecInfo.addrCounty"
                :items="addrCountys"
                item-text="item-text"
                item-value="item-value"
                :rules="[v => !!v || '现住址-区县不能为空']"
                label="现住址(区县)"
                hide-details
                prepend-icon="business"
                required
                @input="countyChanged"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                class="abc"
                v-model="medrecInfo.presentAddr"
                :items="addrTownships"
                item-text="item-text"
                item-value="item-value"
                :rules="[v => !!v || '现住址-街道社区不能为空']"
                label="现住址(街道社区)"
                hide-details
                prepend-icon="business"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.presentTel" label="电话"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.presentPcode" label="邮编"></v-text-field>
            </v-col>
          </v-row>
          <!-- <v-spacer></v-spacer>           -->
          <v-row>
            <v-col cols="12" md="2">
              <v-select
                class="abc"
                v-model="medrecInfo.addrProv"
                :items="addrProvs"
                item-text="item-text"
                item-value="item-value"
                :rules="[v => !!v || '户口地址省份不能为空']"
                label="户口地址(省份)"
                hide-details
                prepend-icon="business"
                required
                @input="provChanged"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                class="abc"
                v-model="medrecInfo.addrCity"
                :items="addrCitys"
                item-text="item-text"
                item-value="item-value"
                :rules="[v => !!v || '户口地址-市不能为空']"
                label="户口地址(市)"
                hide-details
                prepend-icon="business"
                required
                @input="cityChanged"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                class="abc"
                v-model="medrecInfo.addrCounty"
                :items="addrCountys"
                item-text="item-text"
                item-value="item-value"
                :rules="[v => !!v || '户口地址-区县不能为空']"
                label="户口地址(区县)"
                hide-details
                prepend-icon="business"
                required
                @input="countyChanged"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                class="abc"
                v-model="medrecInfo.addrTownship"
                :items="addrTownships"
                item-text="item-text"
                item-value="item-value"
                :rules="[v => !!v || '户口地址-街道社区不能为空']"
                label="户口地址(街道社区)"
                hide-details
                prepend-icon="business"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.regAddr" label="户口地址(详细地址)"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.regPcode" label="邮编"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field class="abc" v-model="medrecInfo.companyAddr" label="工作单位及地址"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.companyTel" label="单位电话"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.companyPcode" label="邮编"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.contactName" label="联系人姓名"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.contactRel" label="关系"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecInfo.contactAddr" label="地址"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.contactTel" label="电话"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.admWay" label="入院途径"></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="1.急诊" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="2.门诊" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="2">
              <v-checkbox class="abc" label="3.其他医疗机构入院" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="9.其他" value></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="medrecInfo.admTime"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    class="abc"
                    v-model="medrecInfo.admTime"
                    label="入院时间"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="medrecInfo.admTime" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">取消</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">确定</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.admDep" label="入院科别"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.admWard" label="病房"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.transDep" label="转科科别"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="medrecInfo.disTime"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    class="abc"
                    v-model="medrecInfo.disTime"
                    label="出院时间"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="medrecInfo.disTime" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">取消</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">确定</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.disDep" label="出院科别"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.disWard" label="病房"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.stayDays" label="实际住院天数"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.maritalStatus" label="实施临床路径"></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="1.中医" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="2.西医" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="3.否" value></v-checkbox>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.maritalStatus" label="使用医疗机构中药制剂"></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="1.是" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="2.否" value></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.maritalStatus" label="使用中医诊疗设备"></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="1.是" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="2.否" value></v-checkbox>
            </v-col>

            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.maritalStatus" label="使用中医诊疗技术"></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="1.是" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="2.否" value></v-checkbox>
            </v-col>

            <v-col cols="12" md="1">
              <v-text-field class="abc" v-model="medrecInfo.maritalStatus" label=" 辨证施护"></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="1.是" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="2.否" value></v-checkbox>
            </v-col>
          </v-row>
           <v-simple-table>
            <template>
              <thead>
                <tr>
                  <th class="text-center" colspan="2">出院诊断</th>
                  <th class="text-center" >疾病编码</th>
                  <th class="text-center" >入院情况</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in desserts" :key="item.caseNo">
                  <td class="text-center">
                    <div v-if="item.diagType === '1'">
                      <span>主要诊断:</span>
                    </div>
                    <div v-else>
                      <span>其他诊断:</span>
                    </div>
                  </td>
                  <td>
                    <v-text-field class="abc" v-model="item.diagName" ></v-text-field>
                  </td>
                  <td class="text-center"><v-text-field class="abc" v-model="item.diagCode" ></v-text-field></td>
                  <td class="text-center"><v-text-field class="abc" v-model="item.inCondition" ></v-text-field></td>
                </tr>
              </tbody>
              </template>
          </v-simple-table>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="medrecInfo.maritalStatus"
                disable
                label=" 入院病情：1.有，2.临床未确定，3.情况不明，4.无"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                class="abc"
                v-model="medrecInfo.maritalStatus"
                disable
                label="损伤、中毒的外部原因"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecInfo.maritalStatus" disable label="疾病编码"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field class="abc" v-model="medrecInfo.maritalStatus" disable label="病理诊断"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.maritalStatus" disable label="疾病编码"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.maritalStatus" disable label="病理号"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.drugAlle" label="药物过敏"></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="1.无" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="2.有" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.drugAlleName" label="过敏药物"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.autopsyDp" label="死亡患者尸检"></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="1.是" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="2.否" value></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="1">
              <v-text-field class="abc" v-model="medrecInfo.bloodType" label="血型"></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="1.A" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="2.B" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="3.O" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="4.AB" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="5.不祥" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="6.未查" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-text-field class="abc" v-model="medrecInfo.rh" label="Rh"></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="1.阴" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="2.阳" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="3.不祥" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="4.未查" value></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.director" label="科主任"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.seniorDoc" label="主任（副主任）医师"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.consultDoc" label="主治医师"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.residentDoc" label="住院医师"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.priNurse" label="责任护士"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.refreDoc" label="进修医师"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.interne" label="实习医师"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.encoder" label="编码员"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.quality" label="病案质量"></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="1.甲" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="2.乙" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="3.丙" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.qcDoc" label="质控医师"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.qcNurse" label="质控护士"></v-text-field>
            </v-col>
          </v-row>
          <v-simple-table>
            <template>
              <thead>
                <tr>
                  <th class="text-center" >手术及操作编码</th>
                  <th class="text-center" >手术及操作日期</th>
                  <th class="text-center" >手术级别</th>
                  <th class="text-center" colspan="2">手术及操作名称</th>
                  <th class="text-center" >术者</th>
                  <th class="text-center" >Ⅰ助</th>
                  <th class="text-center" >Ⅱ助</th>
                  <th class="text-center" >切口愈合等级</th>
                  <th class="text-center" >麻醉方式</th>
                  <th class="text-center" >麻醉医师</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in desserts2" :key="item.caseNo">
                  <td class="text-center"><v-text-field class="abc" v-model="item.operCode" ></v-text-field></td>
                  <td class="text-center"><v-text-field class="abc" v-model="item.operDate" ></v-text-field></td>
                  <td class="text-center"><v-text-field class="abc" v-model="item.operLevel" ></v-text-field></td>
                  <td class="text-center" colspan="2"><v-text-field class="abc" v-model="item.operName" ></v-text-field></td>
                  <td class="text-center"><v-text-field class="abc" v-model="item.operDoc" ></v-text-field></td>
                  <td class="text-center"><v-text-field class="abc" v-model="item.iAssist" ></v-text-field></td>
                  <td class="text-center"><v-text-field class="abc" v-model="item.iiAssist" ></v-text-field></td>
                  <td class="text-center"><v-text-field class="abc" v-model="item.wohealLevel" ></v-text-field></td>
                  <td class="text-center"><v-text-field class="abc" v-model="item.aneWay" ></v-text-field></td>
                  <td class="text-center"><v-text-field class="abc" v-model="item.aneDoc" ></v-text-field></td>
                </tr>
              </tbody>
              </template>
          </v-simple-table>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecInfo.disWay" label="离院方式"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-checkbox class="abc" label="1.医嘱离院" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="2">
              <v-checkbox class="abc" label="2.医嘱转院" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.disHosOrg" label="拟接收医疗机构名称"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-checkbox class="abc" label="3.医嘱转社区卫生服务机构/乡镇卫生院" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.disComOrg" label="拟接收医疗机构名称"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-checkbox class="abc" label="4.非医嘱离院" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="5.死亡" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="6.其他" value></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.readm" label="是否有出院31天内再住院计划"></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="1.无" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="1">
              <v-checkbox class="abc" label="2.有" value></v-checkbox>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.readmPurp" label="目的"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecInfo.cinjPreDays" label="颅脑损伤患者昏迷时间"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field class="abc" v-model="medrecCost.allsum" label="住院费用（元）：总费用"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.selfFee" label="自付金额"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                class="abc"
                v-model="medrecCost.mediServFee"
                label="1.综合医疗服务类：（1）一般医疗服务费"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.maritalStatus" label="(中医辨证论治费"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.maritalStatus" label="中医辨证论治会诊费)"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecCost.treatOperFee" label="（2）一般治疗操作费"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.careFee" label="（3）护理费"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.mediElseFee" label="（4）其他费用"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.pathoDiagFee" label="2.诊断类：（5）病理诊断费"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.labDiagFee" label="（6）实验室诊断费"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.imageDiagFee" label="（7）影像学诊断费"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.cliDiagFee" label="（8）临床诊断项目费"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="5">
              <v-text-field class="abc" v-model="medrecCost.notOperFee" label="3.治疗类：（9）非手术治疗项目费"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.cliPhysFee" label="（临床物理治疗费）"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="5">
              <v-text-field class="abc" v-model="medrecCost.operTreatFee" label="（10）手术治疗费"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.aneFee" label="（麻醉费"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.operFee" label="手术费）"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field class="abc" v-model="medrecCost.recoveryFee" label="4.康复类：（11）康复费"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="5">
              <v-text-field
                class="abc"
                v-model="medrecCost.tcmFee"
                label="5.中医类（中医和民族医医疗服务）（12）中医诊断"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.maritalStatus" label="（13）中医治疗"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.maritalStatus" label="（中医外治"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecCost.maritalStatus" label="中医骨伤"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecCost.maritalStatus" label="针刺与灸法"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecCost.maritalStatus" label="中医推拿治疗"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecCost.maritalStatus" label="中医肛肠治疗"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecCost.maritalStatus" label="中医特殊治疗）"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.maritalStatus" label="（14）中医其他"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecCost.maritalStatus" label="（中药特殊调配加工"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.maritalStatus" label="辨证施膳）"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecCost.wMedFee" label="6.西药类：（15）西药费"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecCost.antiMedFee" label="（抗菌药物费用）"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.cpatentMedFee" label="7.中药类：（16）中成药费"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecCost.maritalStatus" label="（医疗机构中药制剂费）"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecCost.cherbMedFee" label="（17）中草药费"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecCost.bloodFee" label="8.血液和血液制品类：（18）血费"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecCost.wproteinFee" label="（19）白蛋白类制品费"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field class="abc" v-model="medrecCost.gproteinFee" label="（20）球蛋白类制品费"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecCost.bloodFacFee" label="（21）凝血因子类制品费"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="abc" v-model="medrecCost.cellFacFee" label="（22）细胞因子类制品费"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="5">
              <v-text-field
                class="abc"
                v-model="medrecCost.examDispFee"
                label="9.耗材类：（23）检查用一次性医用材料费"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.treatDispFee" label="（24）治疗用一次性医用材料费"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field class="abc" v-model="medrecCost.operDispFee" label="（25）手术用一次性医用材料费"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="5">
              <v-text-field class="abc" v-model="medrecCost.elseFee" label="10.其他类：（26）其他费"></v-text-field>
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
    desserts: Object,
    desserts2: Object,
    medrecInfo: Object,
    medrecCost: Object
  },
  data: () => ({
    headers: [
      { text: "疾病编码", value: "diagCode" },
      { text: "出院诊断", value: "diagName" },
      { text: "入院情况", value: "inCondition" }
    ],
    desserts: [],
    headers2: [
      { text: "手术及操作编码", value: "operCode" },
      { text: "手术及操作日期", value: "operDate" },
      { text: "手术级别", value: "operLevel" },
      { text: "手术及操作名称", value: "operName" },
      { text: "手术及操作医师", value: "operDoc" },
      { text: "术者", value: "operDoc" },
      { text: "Ⅰ助", value: "iAssist" },
      { text: "Ⅱ助", value: "iiAssist" },
      { text: "切口愈合等级", value: "wohealLevel" },
      { text: "麻醉方式", value: "aneWay" },
      { text: "麻醉医师", value: "aneDoc" }
    ],
    desserts2: [],
    medrecInfo: {
      caseNo: "",
      pid: "",
      pname: "",
      inTimes: "",
      payType: "",
      healthyNo: "",
      insuranceNo: "",
      pathologyNo: "",
      gender: "",
      birthday: "",
      age: 0,
      ageMonths: "",
      weightBirth: 0.0,
      weightAdm: 0.0,
      birthplace: "",
      nativePlace: "",
      nationality: "",
      nation: "",
      idcard: "",
      occupation: "",
      maritalStatus: "",
      presentAddr: "",
      presentTel: "",
      presentPcode: "",
      regAddr: "",
      regPcode: "",
      companyAddr: "",
      companyTel: "",
      companyPcode: "",
      contactName: "",
      contactRel: "",
      contactAddr: "",
      contactTel: "",
      admTime: "",
      admDep: "",
      admWard: "",
      transDep: "",
      disTime: "",
      disDep: "",
      disWard: "",
      stayDays: "0",
      rescueTimes: "0",
      resSucTimes: "0",
      rescueReason: "",
      causeDeath: "",
      diagacOutpDis: "",
      diagacPreAft: "",
      diagacCliPath: "",
      diagacRadiPath: "",
      disWay: "",
      disHosOrg: "",
      disComOrg: "",
      readm: "",
      readmPurp: "",
      cinjPreDays: "",
      cinjPreHours: "",
      cinjPreMins: "",
      cinjAftDays: "",
      cinjAftHours: "",
      cinjAftMins: "",
      drugAlle: "",
      drugAlleName: "",
      autopsyDp: "",
      bloodType: "",
      rh: "",
      director: "",
      seniorDoc: "",
      consultDoc: "",
      residentDoc: "",
      priNurse: "",
      refreDoc: "",
      interne: "",
      encoder: "",
      quality: "",
      qcDoc: "",
      qcNurse: "",
      qcDate: "",
      admWay: "",
      archTime: "",
      pathway: ""
    },
    medrecCost: {
      allsum: 0.0,
      selfFee: 0.0,
      mediServFee: 0.0,
      treatOperFee: 0.0,
      careFee: 0.0,
      mediElseFee: 0.0,
      pathoDiagFee: 0.0,
      labDiagFee: 0.0,
      imageDiagFee: 0.0,
      cliDiagFee: 0.0,
      notOperFee: 0.0,
      cliPhysFee: 0.0,
      operTreatFee: 0.0,
      aneFee: 0.0,
      operFee: 0.0,
      recoveryFee: 0.0,
      tcmFee: 0.0,
      wMedFee: 0.0,
      antiMedFee: 0.0,
      cpatentMedFee: 0.0,
      cherbMedFee: 0.0,
      bloodFee: 0.0,
      wproteinFee: 0.0,
      gproteinFee: 0.0,
      bloodFacFee: 0.0,
      cellFacFee: 0.0,
      examDispFee: 0.0,
      treatDispFee: 0.0,
      operDispFee: 0.0,
      elseFee: 0.0
    }
    // //------------------获取指定省份的市列表---------------------------
    // provChanged() {
    //   let tprovid = this.medrecInfo.addrProv;
    //   this.addrCitys = getcitys(tprovid);
    // },
    // //------------------获取指定市的区县列表---------------------------
    // cityChanged() {
    //   let tcityid = this.medrecInfo.addrCity;
    //   this.addrCountys = getcountys(tcityid);
    // },
    // //------------------获取指定区县的街道列表---------------------------
    // countyChanged() {
    //   let tcountyid = this.medrecInfo.addrCounty;
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
