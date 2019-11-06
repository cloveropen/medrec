<template>
  <v-app id="medrec.cloveropen.com">
    <Basepage />
    <v-container class="grey lighten-5">
      <v-form ref="form_reg" v-model="valid" lazy-validation>
        <v-card class="mx-auto" max-width="99%" min-width="100%">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="medrec_info.healthy_no"
                  label="健康卡号"
                  @input="expidChanged($event)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="medrec_info.in_times"
                  label="住院次数"
                  @input="expidChanged($event)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="medrec_info.case_no" label="病案号" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="2">
                <v-text-field v-model="medrec_info.patient_name" label="姓名" required></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-select
                  v-model="medrec_info.gender"
                  :items="genders"
                  item-text="item-text"
                  item-value="item-value"
                  :rules="[v => !!v || '患者性别不能为空']"
                  label="性别"
                  hide-details
                  prepend-icon="info"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="medrec_info.birthday" label="出生日期"></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field v-model="medrec_info.age" label="年龄(岁)"></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field v-model="medrec_info.nationality" label="国籍"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="medrec_info.age_months" label="(年龄不足1周岁的) 年龄(月)"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="medrec_info.weight_birth" label="新生儿出生体重(g)"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="medrec_info.weight_adm" label="新生儿入院体重(g)"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="medrec_info.birthplace" label="出生地"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="medrec_info.native_place" label="籍贯"></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field v-model="medrec_info.nation" label="民族"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="medrec_info.idcard" label="身份证号(读卡或扫码获取)" disabled></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field v-model="medrec_info.occupation" label="职业"></v-text-field>
              </v-col>
              <!-- <v-col cols="12" md="5">
                
                <v-select v-model="medrec_info.marital_status" label="婚姻" required :items="reg_types" item-text="item-text" item-value="item-value" :rules="[v => !!v || '婚姻类别不能为空']" hide-details
                  prepend-icon="donut_small" @input="reg_typeChanged($event)" ></v-select>
                  
              </v-col>-->
              <v-col cols="12" md="1">
                <v-text-field v-model="medrec_info.marital_status" label="婚姻"></v-text-field>
              </v-col>
              <v-col cols="12" md="1">
                <v-checkbox label="1.未婚" value></v-checkbox>
              </v-col>
              <v-col cols="12" md="1">
                <v-checkbox label="2.已婚" value></v-checkbox>
              </v-col>
              <v-col cols="12" md="1">
                <v-checkbox label="3.丧偶" value></v-checkbox>
              </v-col>
              <v-col cols="12" md="1">
                <v-checkbox label="4.离婚" value></v-checkbox>
              </v-col>
              <v-col cols="12" md="1">
                <v-checkbox label="9.其他" value></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="2">
                <v-select
                  v-model="medrec_info.addr_prov"
                  :items="addr_provs"
                  item-text="item-text"
                  item-value="item-value"
                  :rules="[v => !!v || '现住址省份不能为空']"
                  label="现住址(省份)"
                  hide-details
                  prepend-icon="business"
                  required
                  @input="prov_Changed"
                ></v-select>
              </v-col>
              <v-col cols="12" md="2">
                <v-select
                  v-model="medrec_info.addr_city"
                  :items="addr_citys"
                  item-text="item-text"
                  item-value="item-value"
                  :rules="[v => !!v || '现住址-市不能为空']"
                  label="现住址(市)"
                  hide-details
                  prepend-icon="business"
                  required
                  @input="city_Changed"
                ></v-select>
              </v-col>
              <v-col cols="12" md="2">
                <v-select
                  v-model="medrec_info.addr_county"
                  :items="addr_countys"
                  item-text="item-text"
                  item-value="item-value"
                  :rules="[v => !!v || '现住址-区县不能为空']"
                  label="现住址(区县)"
                  hide-details
                  prepend-icon="business"
                  required
                  @input="county_Changed"
                ></v-select>
              </v-col>
              <v-col cols="12" md="2">
                <v-select
                  v-model="medrec_info.present_addr"
                  :items="addr_townships"
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
                <v-text-field v-model="medrec_info.present_tel" label="电话"></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field v-model="medrec_info.present_pcode" label="邮编"></v-text-field>
              </v-col>
            </v-row>
            <!-- <v-spacer></v-spacer>           -->
            <v-row>
              <v-col cols="12" md="2">
                <v-select
                  v-model="medrec_info.addr_prov"
                  :items="addr_provs"
                  item-text="item-text"
                  item-value="item-value"
                  :rules="[v => !!v || '户口地址省份不能为空']"
                  label="户口地址(省份)"
                  hide-details
                  prepend-icon="business"
                  required
                  @input="prov_Changed"
                ></v-select>
              </v-col>
              <v-col cols="12" md="2">
                <v-select
                  v-model="medrec_info.addr_city"
                  :items="addr_citys"
                  item-text="item-text"
                  item-value="item-value"
                  :rules="[v => !!v || '户口地址-市不能为空']"
                  label="户口地址(市)"
                  hide-details
                  prepend-icon="business"
                  required
                  @input="city_Changed"
                ></v-select>
              </v-col>
              <v-col cols="12" md="2">
                <v-select
                  v-model="medrec_info.addr_county"
                  :items="addr_countys"
                  item-text="item-text"
                  item-value="item-value"
                  :rules="[v => !!v || '户口地址-区县不能为空']"
                  label="户口地址(区县)"
                  hide-details
                  prepend-icon="business"
                  required
                  @input="county_Changed"
                ></v-select>
              </v-col>
              <v-col cols="12" md="2">
                <v-select
                  v-model="medrec_info.addr_township"
                  :items="addr_townships"
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
                <v-text-field v-model="medrec_info.reg_addr" label="户口地址(详细地址)"></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field v-model="medrec_info.reg_pcode" label="邮编"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="medrec_info.company_addr" label="工作单位及地址"></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="medrec_info.company_tel" label="单位电话"></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="medrec_info.company_pcode" label="邮编"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field v-model="medrec_info.contact_name" label="联系人姓名"></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field v-model="medrec_info.contact_rel" label="关系"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="medrec_info.contact_addr" label="地址"></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="medrec_info.contact_tel" label="电话"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="2">
                <v-text-field v-model="medrec_info.marital_status" label="入院途径"></v-text-field>
              </v-col>
              <v-col cols="12" md="1">
                <v-checkbox label="1.急诊" value></v-checkbox>
              </v-col>
              <v-col cols="12" md="1">
                <v-checkbox label="2.门诊" value></v-checkbox>
              </v-col>
              <v-col cols="12" md="2">
                <v-checkbox label="3.其他医疗机构入院" value></v-checkbox>
              </v-col>
              <v-col cols="12" md="1">
                <v-checkbox label="9.其他" value></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="入院时间"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">取消</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">确定</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-row no-gutters>
              <v-col>
                <v-spacer></v-spacer>
              </v-col>
              <v-col cols="3">
                <v-radio-group row v-model="medrec_info.pay_type">
                  <v-radio key="cash" label="现金" color="success" value="cash"></v-radio>
                  <v-radio key="wechat" label="微信" value="wechat"></v-radio>
                  <v-radio key="alipay" label="支付宝" value="alipay"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="8">
                <v-btn id="snap" :disabled="!valid" color="success" @click="capture">拍照</v-btn>
                <v-btn color="success" :style="display_btn_readhealth" @click="validate">读 健 康 卡</v-btn>
                <v-btn
                  :style="display_btn_readmi"
                  color="success"
                  v-on:click="readcardClicked($event)"
                >读 医 保 卡</v-btn>
                <v-btn :disabled="!valid" color="success" @click="outregcashClicked($event)">确 认 挂 号</v-btn>
                <v-btn color="warning" :disabled="!valid" @click="prnClicked($event)">打印挂号单</v-btn>
                <v-btn :disabled="!valid" color="success" @click="schweixinClicked($event)">查询支付订单</v-btn>
              </v-col>
            </v-row>
            <!-- <v-btn color="warning" @click="reset">下一位</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-form>
      <v-divider></v-divider>
      <v-spacer></v-spacer>

      <canvas ref="canvas" id="canvas" width="640" height="480" hidden></canvas>
      <v-row no-gutters>
        <v-col cols="12" sm="12">
          <v-row no-gutters>
            <v-col>
              <img v-bind:src="this.medrec_info_pic.pic1" height="240" />
            </v-col>
            <v-col>
              <img v-bind:src="this.medrec_info_pic.pic2" height="240" />
            </v-col>
            <v-col>
              <img v-bind:src="this.medrec_info_pic.pic3" height="240" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <img v-bind:src="this.medrec_info_pic.pic4" height="240" />
            </v-col>
            <v-col>
              <img v-bind:src="this.medrec_info_pic.pic5" height="240" />
            </v-col>
            <v-col>
              <img v-bind:src="this.medrec_info_pic.pic6" height="240" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
// import {
//   getpatient_type,
//   get_regopcode,
//   getgender,
//   getid_type,
//   getreg_type,
//   getdept_codes,
//   getdoctor_codes,
//   getprovs,
//   getcitys,
//   getcountys,
//   getstreets,
//   getpatient,
//   readcard_mi,
//   outreg_cash,
//   // outreg_weixin,
//   outreg_pic,
//   sch_weixin,
//   getregprice
// } from "../scripts/outreg.js";
import Basepage from "../components/Basepage";

export default {
  components: {
    Basepage
  },
  data: () => ({
    valid: true,
    nameRules: [
      v => !!v || "姓名不能为空",
      v => (v && v.length >= 2) || "姓名长度不能少于2个汉字"
    ],
    //barcodeRules: [
    //  v => !!v || "条形码不能为空",
    //  v => (v && v.length >= 13) || "条形码应该为13位数字"
    //],
    patient_types: [], //患者类别列表
    genders: [], //性别列表
    idcard_types: [], //身份证件类型列表
    dept_codes: [], //就诊科室列表
    doctor_codes: [], //专家号专家列表
    reg_types: [], //挂号类别
    addr_provs: [], //单位或现住址(省份)
    addr_citys: [], //单位或现住址(市)
    addr_countys: [], //单位或现住址(区县)
    addr_townships: [], //单位或现住址(街道)
    medrec_info: {
      hsp_code: process.env.VUE_APP_HSP_CODE,
      pid: "", //门诊号
      pid_type: "O", //患者标识类别
      ex_pid: "", //条形码
      patient_name: "", //患者姓名
      gender: "", //性别代码
      age_y: 0, // 年龄
      age_m: 0, //  年龄
      age_d: 0, //  年龄
      patient_type: "", //患者类型
      reg_type: "pz", // 挂号类别
      reg_price: 0.0, //挂号费
      check_price: 0.0, //诊察费
      visit_priority: "1", //就诊优先标志
      dept_code: "", //就诊科室
      doctor_code: "", //门诊接诊医生
      idcard: "", //患者身份证号码
      idcard_type: "jmsfz", //患者身份证件类别
      addr_prov: process.env.VUE_APP_HSP_PROV, //地址
      addr_city: process.env.VUE_APP_HSP_CITY,
      addr_county: process.env.VUE_APP_HSP_COUNTY,
      addr_township: "",
      addr_street: "",
      addr_house_nmb: "",
      company: "",
      mi_pacc_left: 0.0,
      mi_company: "",
      mi_str: "",
      mi_type: "",
      micard: "",
      pay_type: "cash", //支付方式选择
      reg_opcode: "", //挂号员
      pay_cash: 0.0, //现金支付金额
      pay_pacc: 0.0, //医保(农合)个人帐户支付金额
      pay_fund: 0.0, //医保(农合)统筹支付金额
      pay_nfc: 0.0, //移动支付金额
      invoice_nmb: "", //挂号单收据流水号
      flow_nmb: "", //挂号单操作员流水号
      mch_ip: "", //本机局域网IP地址
      ver: process.env.VUE_APP_VERSION //版本号
    },
    video: {},
    canvas: {},
    //captures: [],
    capture_num: 0,
    medrec_info_pic: {
      hsp_code: process.env.VUE_APP_HSP_CODE,
      pid: "",
      ex_pid: "",
      patient_name: "",
      idcard: "",
      health_id: "",
      micard: "",
      capture_time: "",
      capture_opid: "",
      mch_ip: "",
      pic1: "",
      pic2: "",
      pic3: "",
      pic4: "",
      pic5: "",
      pic6: ""
    },
    display_btn_readhealth: "display:none",
    display_btn_readmi: "display:none",
    isdisabled_patient_name: false
  }),
  created() {
    this.medrec_info.reg_opcode = get_regopcode().split("|")[0];
    window.alert("this.medrec_info.reg_opcode=" + this.medrec_info.reg_opcode);
    this.patient_types = getpatient_type();
    this.genders = getgender();
    this.idcard_types = getid_type();
    this.reg_types = getreg_type();
    this.dept_codes = getdept_codes();
    this.addr_provs = getprovs();
    this.addr_citys = getcitys(process.env.VUE_APP_HSP_PROV);
    this.addr_countys = getcountys(process.env.VUE_APP_HSP_CITY);
    this.addr_townships = getstreets(process.env.VUE_APP_HSP_COUNTY);
  },
  mounted() {
    this.video = this.$refs.video;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.srcObject = stream;
        this.video.play();
      });
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    expidChanged(e) {
      let texpid = e;
      console.log("texpid e=" + e);
      if (texpid.length < 10) {
        return;
      }
      getpatient(texpid).then(data => {
        this.medrec_info = data;
      });
    },
    //------------------医保类别医保1*读卡显示,农合2*显示读健康卡--------------
    patientTypeChanged(e) {
      let tptype = e;
      console.log("tptype e=" + tptype);
      this.display_btn_readmi = "display:none";
      this.display_btn_readhealth = "display:none";
      this.isdisabled_patient_name = false;
      if (tptype.slice(0, 1) == "1") {
        //医保
        this.display_btn_readmi = "";
        this.isdisabled_patient_name = true;
      }
      if (tptype.slice(0, 1) == "2") {
        //农合
        this.display_btn_readhealth = "";
      }
    },
    readcardClicked(e) {
      console.log("e=" + e.target.innerText);
      readcard_mi();
    },
    outregcashClicked(e) {
      console.log("确认挂号e=" + e);
      if (!this.$refs.form_reg.validate()) {
        window.alert("请选择必须填写的字段");
        return;
      }
      outreg_cash(this.medrec_info).then(data => {
        this.medrec_info.pid = data;
        this.medrec_info.ex_pid = data.substr(0, 9);
        console.log(
          "outregcashClicked this.medrec_info_pic.pid=" +
            this.medrec_info_pic.pid
        );
        this.medrec_info_pic.pid = this.medrec_info.pid;
        this.medrec_info_pic.ex_pid = this.medrec_info.ex_pid;
        this.medrec_info_pic.patient_name = this.medrec_info.patient_name;
        this.medrec_info_pic.idcard = this.medrec_info.idcard;
        this.medrec_info_pic.health_id = this.medrec_info.health_id;
        this.medrec_info_pic.micard = this.medrec_info.micard;
        this.medrec_info_pic.capture_opid = this.medrec_info.reg_opcode;
        outreg_pic(this.medrec_info_pic);
      });
    },
    schweixinClicked(e) {
      console.log("e=" + e.target.innerText);
      sch_weixin();
    },
    dept_codeChanged(e) {
      let tdept_code = this.medrec_info.dept_code;
      console.log("dept_codeChanged e=" + e);
      let tpost_tech = "1";
      this.doctor_codes = getdoctor_codes(tdept_code, tpost_tech);
    },
    reg_typeChanged(e) {
      console.log("reg_typeChanged e=" + e);
      let treg_type = this.medrec_info.reg_type;
      getregprice(treg_type).then(data => {
        this.medrec_info.reg_price = data[0];
        this.medrec_info.check_price = data[1];
      });
    },
    //------------------获取指定省份的市列表---------------------------
    prov_Changed() {
      let tprovid = this.medrec_info.addr_prov;
      this.addr_citys = getcitys(tprovid);
    },
    //------------------获取指定市的区县列表---------------------------
    city_Changed() {
      let tcityid = this.medrec_info.addr_city;
      this.addr_countys = getcountys(tcityid);
    },
    //------------------获取指定区县的街道列表---------------------------
    county_Changed() {
      let tcountyid = this.medrec_info.addr_county;
      this.addr_townships = getstreets(tcountyid);
    },
    //-------------------打印挂号单--------------------------------------------------
    prnClicked(e) {
      console.log("e=" + e.target.innerText);
      this.$htmlToPaper("print_reg");
    },
    capture() {
      this.canvas = this.$refs.canvas;
      var ctx = this.canvas.getContext("2d");
      //console.log(this.$refs.canvas.toDataURL("image/png"));
      ctx.drawImage(this.video, 0, 0, 640, 480);
      //this.captures.push(this.$refs.canvas.toDataURL("image/png"));
      switch (this.capture_num) {
        case 0:
          this.medrec_info_pic.pic1 = this.$refs.canvas.toDataURL("image/png");
          this.capture_num++;
          break;
        case 1:
          this.medrec_info_pic.pic2 = this.$refs.canvas.toDataURL("image/png");
          this.capture_num++;
          break;
        case 2:
          this.medrec_info_pic.pic3 = this.$refs.canvas.toDataURL("image/png");
          this.capture_num++;
          break;
        case 3:
          this.medrec_info_pic.pic4 = this.$refs.canvas.toDataURL("image/png");
          this.capture_num++;
          break;
        case 4:
          this.medrec_info_pic.pic5 = this.$refs.canvas.toDataURL("image/png");
          this.capture_num++;
          break;
        case 5:
          this.medrec_info_pic.pic6 = this.$refs.canvas.toDataURL("image/png");
          this.capture_num++;
          break;
        default:
          this.capture_num = 0;
          this.medrec_info_pic.pic1 = this.$refs.canvas.toDataURL("image/png");
      }
      //--
    }
    // ---------------------end methods----------------
  }
};
</script>

<style>
.regfee {
  display: inline;
}
</style>
