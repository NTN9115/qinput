<template>
  <div>
    <el-card class="box-card">
      <div class="qtitle">{{data.title}}</div>
      <div class="qintroduce">{{data.introduce}}</div>
    </el-card>
    <div v-for="(item,index) in data.question_group" :key="index">
      <QuestionGroup :question_group="item" />
    </div>
  </div>
</template>

<script>
import QuestionGroup from "./QuestionGroup";

export default {
  name: "Questionnaire0",
  components: {
    QuestionGroup
  },
  props: {
    data: {}
  },
};
</script>