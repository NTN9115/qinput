<template>
  <div>
    <div style="margin: 20px 0;"></div>
    <el-input
      type="textarea"
      :autosize="{ minRows: cell['line']!=null?cell['line']:1, maxRows: cell['line']!=null?cell['line']:2}"
      placeholder="请输入内容"
      v-model="answer.answer"
      :maxlength="cell['limit']"
      show-word-limit
    ></el-input>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Comment",
  props: {
    cell: {
      index: []
    }
  },

  computed: {
    ...mapGetters({
      setAnswer: "submitData/getAnswer"
    }),
    answer: {
      get() {
        return this.setAnswer(this.cell.index);
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