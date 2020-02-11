<template>
  <div>
    <span v-if="cell['vtime']==false&&cell['vdate']==true">
      <el-time-picker arrow-control v-model="test" placeholder="请选择"></el-time-picker>
    </span>
    <span v-if="cell['vtime']==true&&cell['vdate']==false">
      <el-date-picker arrow-control v-model="answer.answer" placeholder="请选择"></el-date-picker>
    </span>
    <span v-if="cell['vtime']==false&&cell['vdate']==false">
      <el-date-picker v-model="answer.answer" type="datetime" placeholder="请选择" align="right"></el-date-picker>
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DateChoice",
  props: {
    cell: {
      index: []
    }
  },
  data() {
    return {
      test:''
    }
  },
  computed: {
    ...mapGetters({
      getAnswer: "submitData/getAnswer"
    }),
    answer: {
      get() {
        return this.getAnswer(this.cell.index);
      },
      set(label) {
        this.$store.commit("submitData/setAnswer", {
          index: this.cell.index,
          answer: label
        });
      }
    }
  }
};
</script>