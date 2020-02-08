<template>
  <el-row>
    <el-col :xs="1" :sm="2" :md="4" :lg="4" :xl="4">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :xs="22" :sm="20" :md="16" :lg="16" :xl="16">
      <div class="grid-content bg-purple-light">
        <div v-if="fdata.code==200">
          <div v-if="fdata.data.pagination==0">
            <Questionnaire0 :data="fdata.data" />
          </div>
          <div v-if="fdata.data.pagination==1">
            <Questionnaire1 :data="fdata.data" />
          </div>
          <div v-if="fdata.data.pagination==2">
            <Questionnaire2 :data="fdata.data" />
          </div>
          <!-- <el-card class="box-card">
            <div class="qtitle">{{fdata.data.title}}</div>
            <div class="qintroduce">{{fdata.data.introduce}}</div>
          </el-card>
          <div v-for="(item,index) in fdata.data.question_group" :key="index">
            <QuestionGroup :question_group="item" />
          </div>-->
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

import axios from "axios";
import Fingerprint2 from "fingerprintjs2";
export default {
  name: "app",
  components: {
    // QuestionGroup,
    Questionnaire0,
    Questionnaire1,
    Questionnaire2
  },
  created() {
    this.getFp().then(() => this.getData());
  },
  methods: {
    async getData() {
      let uri = window.location.pathname;
      if (uri != "/") {
        axios
          .get("http://192.168.0.114:8000/questionnaireEntity" + uri, {
            params: {
              fingerprint: this.fingerprint
            }
          })
          .then(response => {
            this.fdata = response.data;
            this.getSendDataFormat();
          })
          .catch(error => {
            alert(error);
          });
      }
    },
    async getFp() {
      return new Promise(resolve => {
        Fingerprint2.get(components => {
          var values = components.map(function(component, index) {
            if (index === 0) {
              return component.value.replace(/\bNetType\/\w+\b/, "");
            }
            return component.value;
          });
          var murmur = Fingerprint2.x64hash128(values.join(""), 31);
          this.fingerprint = murmur;
          resolve();
        });
      });
    },
    getSendDataFormat() {
      if (this.fdata.code == 200) {
        let data = this.fdata.data;
        this.sdata.id = data.id;
        let group = data.question_group;
        let groups = [];
        for (let i = 0; i < group.length; i++) {
          const element = group[i];
          let question_cell = [];
          for (let a = 0; a < element.question_cells.length; a++) {
            const member = element.question_cells[a];
            let answers = [];
            for (let b = 0; b < member.answer_cells.length; b++) {
              const answer = member.answer_cells[b];
              answers.push({
                type: answer.type,
                answer: ""
              });
            }
            question_cell.push({
              title: member.title,
              answers: answers
            });
          }
          groups.push({
            title: element.title,
            answers_cell: question_cell
          });
        }
        this.sdata.answer_groups = groups;
        this.sdata.fingerprint = this.fingerprint;
      }
    }
  },
  data() {
    return {
      fdata: {
        code: "",
        data: {
          question_group: []
        }
      },
      sdata: {
        id: "",
        answer_groups: [],
        fingerprint: ""
      },
      fingerprint: ""
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
  font-size: 36px;
  text-align: center;
}
.qintroduce {
  color: rgb(42, 42, 42);
}
</style>
