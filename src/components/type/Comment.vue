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
    }
  },
  watch: {
    textarea: function(n) {
      if (n != "") {
        this.$emit("full");
      } else {
        this.$emit("unfull");
      }
    }
  },
  data() {
    return {
      textarea: ""
    };
  }
};
</script>