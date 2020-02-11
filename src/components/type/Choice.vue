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
/* eslint-disable no-console */
import { mapGetters } from "vuex";
export default {
  name: "Choice",
  props: {
    cell: {
      index: []
    }
  },
  data() {
    return {
      // answer:'',
      answer2: []
    };
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
  },
  methods: {
    change2(label) {
      console.log(this.$store.getters.getAnswer(this.cell.index));
      this.$store.dispatch("setAnswer", {
        index: this.cell.index,
        answer: label
      });
    }
  }

  // watch: {
  //   answer: function(n) {
  //     console.log("change")
  //     console.log(n)
  //     this.$store.commit("setAnswer", {
  //       index: this.cell.index,
  //       answer: n
  //     });
  //   }
  // }
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