<template>
  <div>
    <el-card class="box-card">
      <div class="qtitle">{{data.title}}</div>
      <div class="qintroduce">{{data.introduce}}</div>
    </el-card>
    <div v-for="(item,index) in data.question_group" :key="index">
      <QuestionGroup :question_group="item" :index="index" />
    </div>
    <el-row type="flex" justify="space-between" class="button-group" :gutter="20">
      <el-col :span="12"></el-col>
      <el-col :span="12">
        <el-button :disabled="disabled" class="button right" type="primary">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import QuestionGroup from "./QuestionGroup";
import { mapGetters } from "vuex";

export default {
  name: "Questionnaire0",
  components: {
    QuestionGroup
  },
  props: {
    data: {}
  },
  created() {
    this.setCurretDisplayQuestion();
  },
  computed: {
    ...mapGetters({
      disabled: "submitData/getCurrentFinishStatus",
    })
  },
  methods: {
    setCurretDisplayQuestion() {
      let currentIndex = this.data.question_group
        .flatMap(t1 => t1.question_cells)
        .map(t2 => t2.index);
      this.$store.commit("submitData/setCurrentIndex", currentIndex);
    }
  }
};
</script>
<style scoped>
.button {
  width: 92%;
}
.right {
  float: right;
}
</style>