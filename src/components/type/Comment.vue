<template>
  <div>
    <div style="margin: 20px 0;"></div>
    <el-input
      type="textarea"
      :autosize="{ minRows: cell['line']!=null?cell['line']:1, maxRows: cell['line']!=null?cell['line']:2}"
      placeholder="请输入内容"
      v-model="answer"
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
      getAnswer: "submitData/getAnswer",
      getQuestion: "submitData/getFirstAnswer"
    }),
    answer: {
      get() {
        if (this.cell.index[2] == 0) {
          return this.getAnswer(this.cell.index);
        } else {
          let c = this.getQuestion(this.cell.index);
          let a = this.getAnswer(this.cell.index);
          if (c.is_multi) {
            let answer = "";
            for (let i = 0; i < a.length; i++) {
              const e = a[i];
              if (!c.choice.includes(e)) {
                answer = e;
                break;
              }
            }
            return answer;
          } else {
            if (c.choice.includes(a[0])) {
              return "";
            } else {
              return a[0];
            }
          }
        }
      },
      set(label) {
        if (this.cell.index[2] == 0) {
          this.$store.commit("submitData/setAnswer", {
            index: this.cell.index,
            answer: label
          });
        } else {
          let c = this.getQuestion(this.cell.index);
          let choice = c.choice;
          if (c.is_multi) {
            let list = [];
            let a = this.getAnswer(this.cell.index);
            for (let i = 0; i < a.length; i++) {
              const e = a[i];
              if (choice.includes(e)) {
                list.push(e);
              }
            }
            if(label!= ""){
              list.push(label);
            }
            this.$store.commit("submitData/setAnswer", {
              index: this.cell.index,
              answer: list
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
  }
};
</script>