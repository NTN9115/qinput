<template>
  <div>
    <el-card class="box-card">
      <div class="qtitle">{{data.title}}</div>
      <div class="qintroduce">{{data.introduce}}</div>
    </el-card>
    <QuestionGroup :question_group="item" :index="index" />
    <el-row type="flex" justify="space-between" class="button-group" :gutter="20">
      <el-col :span="12">
        <el-button class="button" type="primary" v-if="index!=0" @click="getPriv()">上一页</el-button>
      </el-col>
      <el-col :span="12">
        <el-button
          class="button right"
          type="primary"
          v-if="index!=index_all"
          @click="getNext()"
          :disabled="disabled"
        >下一页</el-button>
        <el-button
          :disabled="disabled"
          class="button right"
          type="primary"
          v-if="index==index_all"
          @click="submit"
        >提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import QuestionGroup from "./QuestionGroup";
import { mapGetters } from "vuex";

export default {
  name: "Questionnaire1",
  components: {
    QuestionGroup
  },
  props: {
    data: {}
  },
  data() {
    return {
      item: {},
      index: 0,
      index_all: 0
    };
  },
  created() {
    this.getFirst();
    this.getindexAll();
  },
  computed: {
    ...mapGetters({
      disabled: "submitData/getCurrentFinishStatus"
    })
  },
  methods: {
    runScroll() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    submit() {
      this.$emit("submit");
    },
    getItem() {
      this.item = this.data.question_group[this.index];
      this.setCurretDisplayQuestion();
    },
    getFirst() {
      this.getItem();
    },
    getindexAll() {
      this.index_all = this.data.question_group.length - 1;
    },
    getNext() {
      this.index++;
      this.getItem();
      this.runScroll();
    },
    getPriv() {
      this.index--;
      this.getItem();
      this.runScroll();
    },
    setCurretDisplayQuestion() {
      let currentIndex = this.item.question_cells.map(t2 => t2.index);
      this.$store.commit("submitData/setCurrentIndex", currentIndex);
    }
  }
};
</script>
<style scoped>
.button {
  width: 92%;
}
.right {
  float: right;
}
</style>