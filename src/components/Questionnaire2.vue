<template>
  <div>
    <el-card class="box-card">
      <div class="qtitle">{{data.title}}</div>
      <div class="qintroduce">{{data.introduce}}</div>
    </el-card>
    <div v-for="(item,index) in this.groupListItem" :key="index">
      <QuestionGroup :question_group="item" :index="item.index" />
    </div>
    <el-row type="flex" justify="space-between" class="button-group" :gutter="20">
      <el-col :span="12">
        <el-button class="button" type="primary" v-if="groupListIndex!=0" @click="getPriv()">上一页</el-button>
      </el-col>
      <el-col :span="12">
        <el-button
          class="button right"
          type="primary"
          v-if="groupListIndex!=groupList.length-1"
          @click="getNext()"
          :disabled="disabled"
        >下一页</el-button>
        <el-button
          :disabled="disabled"
          class="button right"
          type="primary"
          v-if="groupListIndex==groupList.length-1 "
          @click='submit'
        >提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import QuestionGroup from "./QuestionGroup";
import { mapGetters } from "vuex";
export default {
  name: "Questionnaire2",
  components: {
    QuestionGroup
  },
  props: {
    data: {}
  },
  created() {
    this.getPageSize();
    this.getMaxGroupIndex();
    this.getGroupList();
    this.getCurrent();
  },
  data() {
    return {
      groupIndex: 0,
      maxGroupIndex: 0,
      index: 0,
      pageSize: 0,
      flag: false,
      groupList: [],
      groupListIndex: 0,
      groupListItem: {}
    };
  },
  computed: {
    ...mapGetters({
      disabled: "submitData/getCurrentFinishStatus"
    })
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
    getCurrent() {
      this.groupListItem = this.groupList[this.groupListIndex];
      this.setCurretDisplayQuestion();
    },
    getPriv() {
      this.groupListIndex--;
      this.groupListItem = this.groupList[this.groupListIndex];
      this.setCurretDisplayQuestion();
    },
    getNext() {
      this.groupListIndex++;
      this.groupListItem = this.groupList[this.groupListIndex];
      this.setCurretDisplayQuestion();
    },
    getGroupList() {
      while (this.flag == false) {
        this.groupList.push(this.getPage());
      }
    },
    getPage() {
      let qGroup = [];
      let group = this.getGroup();
      let cell = group.question_cells;
      let cells = cell.slice(this.index, this.index + this.pageSize);
      if (cells.length != 0) {
        qGroup.push({
          title: group.title,
          question_cells: cells,
          index: this.groupIndex
        });
      }
      let df = this.pageSize - cells.length;
      this.index = this.index + cells.length;
      if (this.groupIndex == this.maxGroupIndex && this.index >= cell.length) {
        this.flag = true;
      }
      while (df != 0) {
        this.groupIndex++;
        if (this.groupIndex > this.maxGroupIndex) {
          this.flag = true;
          break;
        }
        let lgroup = this.getGroup();
        let lcell = lgroup.question_cells;
        let lcells = lcell.slice(0, df);
        qGroup.push({
          title: lgroup.title,
          question_cells: lcells,
          index: this.groupIndex
        });
        this.index = lcells.length;
        df = df - lcells.length;
        if (
          this.index >= lcell.length &&
          this.groupIndex == this.maxGroupIndex
        ) {
          this.flag = true;
          break;
        }
      }
      return qGroup;
    },
    setCurretDisplayQuestion() {
      let currentIndex = this.groupListItem
        .flatMap(t1 => t1.question_cells)
        .map(t2 => t2.index);
      this.$store.commit("submitData/setCurrentIndex", currentIndex);
    },
    getPageSize() {
      this.pageSize = this.data.page_size;
    },
    getMaxGroupIndex() {
      this.maxGroupIndex = this.data.question_group.length - 1;
    },
    getGroup() {
      return this.data.question_group[this.groupIndex];
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