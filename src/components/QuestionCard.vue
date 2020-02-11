<template>
  <el-card class="SingleChoice">
    <div slot="header" class="clearfix">
      <QuestionTitle :title="question_cell.title" :must_answer="question_cell.must_answer" />
    </div>
    <div v-for="(answer_cell,a_index) in question_cell.answer_cells" :key="a_index">
      <Choice
        :cell="answer_cell"
        v-if="answer_cell.type==='choice'"
      />
      <DateChoice
        :cell="answer_cell"
        v-else-if="answer_cell.type==='date'"
      />
      <Comment
        :cell="answer_cell"
        v-else-if="answer_cell.type==='comment'"
      />
    </div>
  </el-card>
</template>


<script>
import QuestionTitle from "./QuestionTitle";
import Choice from "./type/Choice";
import DateChoice from "./type/DateChoice";
import Comment from "./type/Comment";
export default {
  components: {
    QuestionTitle,
    Choice,
    DateChoice,
    Comment
  },
  props: {
    question_cell: {
      title: String,
      answer_cells: [],
      must_answer: Number,
    }
  },
  data() {
    return {
      fulled: false
    };
  },
  watch: {
    fulled: function(n) {
      if (n) {
        this.$emit("add");
      } else {
        this.$emit("minus");
      }
    }
  }
};
</script>
<style>
.el-card {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>