<template>
  <div>
    <el-card class="box-card title">
      <div>{{question_group.title}}</div>
      <el-progress :show-text="false" :stroke-width="6" :percentage="percentage"></el-progress>
    </el-card>

    <div v-for="(cell,index) in question_group.question_cells" :key="index">
      <div>
        <QuestionCard :question_cell="cell" @add="add" @minus="minus" />
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from "./QuestionCard";
export default {
  components: {
    QuestionCard
  },
  props:{
    question_group:{}
  },
  mounted: function() {
    this.total_num = this.question_group.question_cells.length;
  },
  methods: {
    add() {
      this.anwserd_num += 1;
      this.percentage = (this.anwserd_num / this.total_num) * 100;
    },
    minus() {
      this.anwserd_num -= 1;
      this.percentage = (this.anwserd_num / this.total_num) * 100;
    }
  },
  data() {
    return {
      percentage: 0,
      anwserd_num: 0,
      total_num: 0,
    };
  }
};
</script>
<style>
.title {
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  background: #5a2f2f;
  text-align: left center;
}
</style>