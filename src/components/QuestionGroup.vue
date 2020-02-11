<template>
  <div>
    <el-card class="box-card title">
      <div>{{question_group.title}}</div>
      <el-progress :show-text="false" :stroke-width="6" :status='percentageInfo.status' :percentage="percentageInfo.percentage"></el-progress>
    </el-card>

    <div v-for="(cell,index) in question_group.question_cells" :key="index">
      <div>
        <QuestionCard :question_cell="cell"/>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from "./QuestionCard";
import { mapGetters } from "vuex";
export default {
  components: {
    QuestionCard
  },
  props: {
    question_group: {},
    index:Number
  },
  data() {
    return {
      status: "warning"
    };
  },
  computed: {
    ...mapGetters("submitData", {
      getPercentage: "getGroupAnsweredPercentage",
    }),
    percentageInfo(){return this.getPercentage(this.index)}
  },
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