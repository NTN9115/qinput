<template>
  <div>
    <span v-if="cell['vtime']==false&&cell['vdate']==true">
      <el-time-picker arrow-control v-model="datetime" placeholder="请选择"></el-time-picker>
    </span>
    <span v-if="cell['vtime']==true&&cell['vdate']==false">
      <el-date-picker arrow-control v-model="datetime" placeholder="请选择"></el-date-picker>
    </span>
    <span v-if="cell['vtime']==false&&cell['vdate']==false">
      <el-date-picker v-model="datetime" type="datetime" placeholder="请选择" align="right"></el-date-picker>
    </span>
  </div>
</template>

<script>
export default {
  name: "DateChoice",
  props: {
    cell: {
    }
  },
  watch: {
    datetime: function(n) {
      if (n != null) {
        this.$emit("full");
      } else {
        this.$emit("unfull");
      }
    }
  },
  data() {
    return {
      datetime: ""
    };
  }
};
</script>