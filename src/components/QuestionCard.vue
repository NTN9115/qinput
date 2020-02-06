<template>
  <el-card class="SingleChoice">
    <div slot="header" class="clearfix">
      <QuestionTitle :title="question_cell.title" :must_answer="question_cell.must_answer" />
    </div>
    <div v-for="(answer_cell,index) in question_cell.answer_cells" :key="index">
      <Choice :cell="answer_cell" v-if="answer_cell.type==='choice'" @full="full" @unfull="unfull" />
      <DateChoice
        :cell="answer_cell"
        v-else-if="answer_cell.type==='date'"
        @full="full"
        @unfull="unfull"
      />
      <Comment
        :cell="answer_cell"
        v-else-if="answer_cell.type==='comment'"
        @full="full"
        @unfull="unfull"
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
      must_answer: Number
    }
  },
  data() {
    return {
      fulled: false
    };
  },
  methods: {
    full: function() {
      this.fulled = true;
    },
    unfull: function() {
      this.fulled = false;
    }
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