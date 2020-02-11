<template>
  <div>
    <el-card class="box-card">
      <div class="qtitle">{{data.title}}</div>
      <div class="qintroduce">{{data.introduce}}</div>
    </el-card>
    <QuestionGroup :question_group="item" :index ='index'/>
    <el-row type="flex" justify="space-between" class="button-group" :gutter="20">
      <el-col :span="12">
        <el-button class="button" type="primary" v-if="index!=0" @click="getPriv()">上一页</el-button>
      </el-col>
      <el-col :span="12">
        <el-button class="button right" type="primary" v-if="index!=index_all" @click="getNext()">下一页</el-button>
        <el-button class="button right" type="primary" v-if="index==index_all" >提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import QuestionGroup from "./QuestionGroup";

export default {
  name: "Questionnaire1",
  components: {
    QuestionGroup
  },
  props: {
    data: {}
  },
  data() {
    return {
      item: {},
      index: 0,
      index_all: 0
    };
  },
  created() {
    this.getFirst();
    this.getindexAll();
  },
  methods: {
    getItem() {
      this.item = this.data.question_group[this.index];
    },
    getFirst() {
      this.getItem();
    },
    getindexAll() {
      this.index_all = this.data.question_group.length - 1;
    },
    getNext() {
      this.index++;
      this.getItem();
    },
    getPriv() {
      this.index--;
      this.getItem();
    }
  }
};
</script>
<style scoped>
.button {
  width: 92%;
}
.right {
  float:right;
}

</style>