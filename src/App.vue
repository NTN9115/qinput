<template>
  <el-row>
    <el-col :xs="1" :sm="2" :md="4" :lg="4" :xl="4">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :xs="22" :sm="20" :md="16" :lg="16" :xl="16">
      <div class="grid-content bg-purple-light">
        <div v-if="fdata.code==200">
          <div v-if="fdata.data.pagination==0">
            <Questionnaire0 :data="fdata.data" @submit="sendSubmitData"/>
          </div>
          <div v-if="fdata.data.pagination==1">
            <Questionnaire1 :data="fdata.data" @submit="sendSubmitData" />
          </div>
          <div v-if="fdata.data.pagination==2">
            <Questionnaire2 :data="fdata.data" @submit="sendSubmitData" />
          </div>
        </div>
        <div v-if="fdata.code!=200">
          <div class="code">{{fdata.code}}</div>
          <div class="msg">{{fdata.msg}}</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="1" :sm="2" :md="4" :lg="4" :xl="4">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>

<script>
import Questionnaire0 from "./components/Questionnaire0";
import Questionnaire1 from "./components/Questionnaire1";
import Questionnaire2 from "./components/Questionnaire2";
import api from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "app",
  components: {
    Questionnaire0,
    Questionnaire1,
    Questionnaire2
  },

  created() {
    let uri = window.location.pathname;
    this.$store.commit("submitData/setUri", uri);
    this.$store.dispatch("submitData/init");
  },
  computed: {
    ...mapGetters({
      fingerprint: "submitData/getFingerprint",
      fdata: "submitData/getQData",
      submitData: "submitData/get"
    })
  },
  methods: {
    sendSubmitData() {
      api
        .submitData(this.submitData)
        .then(data => alert(data))
        .catch(error => alert(error));
    }
  },
  data() {
    return {
      uri: "",
      sdata: {
        id: "",
        answer_groups: [],
        fingerprint: ""
      }
    };
  }
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #ffffff;
}
.bg-purple-light {
  background: #ffffff;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.code {
  font-size: 370%;
  color: grey;
}
.msg {
  font-size: 170%;
  color: rgb(44, 44, 44);
}
.qtitle {
  font-size: 28px;
  text-align: center;
}
.qintroduce {
  color: rgb(42, 42, 42);
}
</style>
