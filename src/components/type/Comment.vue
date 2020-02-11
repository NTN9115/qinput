<template>
  <div>
    <div style="margin: 20px 0;"></div>
    <el-input
      type="textarea"
      :autosize="{ minRows: cell['line']!=null?cell['line']:1, maxRows: cell['line']!=null?cell['line']:2}"
      placeholder="请输入内容"
      v-model="textarea"
      :maxlength="cell['limit']"
      show-word-limit
    ></el-input>
  </div>
</template>
<script>
export default {
  name: "Comment",
  props: {
    cell: {
      index: []
    }
  },
  watch: {
    textarea: function(n) {
      this.$store.commit("setAnswer", {
        index: this.cell.index,
        answer: n
      });
    }
  },
  // methods: {
  //   getData() {
  //     this.textarea = this.$store.getters.getAnswer(this.index);
  //   }
  // },
  // created() {
  //   this.getData();
  // },
  data() {
    return {
      textarea: ""
    };
  }
};
</script>