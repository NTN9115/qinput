<template>
  <div>
    <el-radio-group v-model="answer.answer" v-if="cell['is_multi']==false">
      <el-radio v-for="choice in cell['choice']" :key="choice" class="choice" :label="choice"></el-radio>
    </el-radio-group>
    <!-- <div>{{get}}</div> -->
    <el-checkbox-group v-model="answer.answer" v-if="cell['is_multi']">
      <el-checkbox v-for="choice in cell['choice']" :key="choice" class="choice" :label="choice"></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Choice",
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
<style scoped>
.el-radio-group {
  width: 100%;
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