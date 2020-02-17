<template>
  <div>
    <el-radio-group v-model="answer" v-if="cell['is_multi']==false">
      <el-radio v-for="choice in cell['choice']" :key="choice" class="choice" :label="choice"></el-radio>
    </el-radio-group>
    <!-- <div>{{get}}</div> -->
    <el-checkbox-group v-model="answer" v-if="cell['is_multi']">
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
      getAnswer: "submitData/getAnswer",
    }),
    answer: {
      get() {
        if (this.cell.is_multi) {
          return this.getAnswer(this.cell.index);
        } else {
          return this.getAnswer(this.cell.index)[0] == null
            ? ""
            : this.getAnswer(this.cell.index)[0];
        }
      },
      set(label) {
        if (this.cell.is_multi) {
          this.$store.commit("submitData/setAnswer", {
            index: this.cell.index,
            answer: label
          });
        } else {
          this.$store.commit("submitData/setAnswer", {
            index: this.cell.index,
            answer: [label]
          });
        }
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