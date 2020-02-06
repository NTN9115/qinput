<template>
  <div>
    <div v-if="cell['is_multi']==false">
      <el-radio-group v-model="radio">
        <el-col v-for="choice in cell['choice']" :key="choice">
          <el-radio class="choice" v-model="radio" :label="choice"></el-radio>
        </el-col>
      </el-radio-group>
    </div>
    <div v-if="cell['is_multi']">
      <el-checkbox-group v-model="checked">
        <el-col v-for="choice in cell['choice']" :key="choice">
          <el-checkbox class="choice" v-model="radio" :label="choice"></el-checkbox>
        </el-col>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "Choice",
  props: {
    cell: {
    }
  },
  data() {
    return {
      radio: "",
      checked: []
    };
  },
  watch: {
    radio: function(n) {

      if (n != "") {
        this.$emit("full");
      } else {
        this.$emit("unfull");
      }
    },
    checked: function(n) {
      if (n.length!=0) {
        this.$emit("full");
      } else {
        this.$emit("unfull");
      }
    }
  }
};
</script>
<style scoped>
.el-radio-group {
  width: 100%;
}
.el-radio {
}
.choice {
  margin: 15px;
}
.el-radio {
  display: flex;
}

.el-radio__label {
  white-space: normal !important;
  word-break: break-all;
}
</style>