<template>
  <el-row>
    <el-col :xs="1" :sm="2" :md="4" :lg="4" :xl="4">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :xs="22" :sm="20" :md="16" :lg="16" :xl="16">
      <div class="grid-content bg-purple-light">
        <div v-for="(item,index) in fdata.data.question_group" :key="index">
          <QuestionGroup :question_group="item" />
        </div>
      </div>
    </el-col>
    <el-col :xs="1" :sm="2" :md="4" :lg="4" :xl="4">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>

<script>
import QuestionGroup from "./components/QuestionGroup";
export default {
  name: "app",
  components: {
    QuestionGroup
  },
  data() {
    return {
      fdata: {
        code: 200,
        msg: "success",
        data: {
          id: "5e390077424b160fe05cd388",
          title: "小新",
          introduce: "人平日平日平日盘",
          pagination: 0,
          question_group: [
            {
              title: "基本情况",
              question_cells: [
                {
                  title: "是多发发",
                  answer_cells: [
                    {
                      type: "choice",
                      choice: [
                        "选项但是上的分",
                        "选项上的分",
                        "awsl",
                        "选你项"
                      ],
                      is_multi: false
                    }
                  ],
                  must_answer: 1
                },
                {
                  title: "沙发",
                  answer_cells: [
                    {
                      type: "choice",
                      choice: ["12311", "345", "33443"],
                      is_multi: false
                    }
                  ],
                  must_answer: 1
                },
                {
                  title: "阿三多发多发",
                  answer_cells: [
                    {
                      type: "date",
                      vdate: false,
                      vtime: false
                    }
                  ],
                  must_answer: 1
                },
                {
                  title: "string",
                  answer_cells: [
                    {
                      type: "comment"
                    }
                  ],
                  must_answer: 1
                },
                {
                  title: "是多发发",
                  answer_cells: [
                    {
                      type: "choice",
                      choice: ["选项但是上的分", "选项上的分"],
                      is_multi: false
                    }
                  ],
                  must_answer: 1
                },
                {
                  title: "沙发",
                  answer_cells: [
                    {
                      type: "choice",
                      choice: ["12311", "345", "33443"],
                      is_multi: false
                    }
                  ],
                  must_answer: 1
                },
                {
                  title: "是多发发",
                  answer_cells: [
                    {
                      type: "comment",
                      limit: 20,
                      line: 4,
                      empty: true
                    }
                  ],
                  must_answer: 1
                },
                {
                  title: "阿三多发多发",
                  answer_cells: [
                    {
                      type: "date",
                      vdate: false,
                      vtime: false
                    }
                  ],
                  must_answer: 0
                },
                {
                  title: "上的分胜负",
                  answer_cells: [
                    {
                      type: "choice",
                      choice: ["选项1", "选项2", "选项3", "选项4"],
                      is_multi: true
                    },
                    {
                      type: "comment",
                      limit: 100,
                      line: 2,
                      empty: false
                    }
                  ],
                  must_answer: 1
                },
                {
                  title: "是多发发",
                  answer_cells: [
                    {
                      type: "comment",
                      limit: 20,
                      line: 4,
                      empty: true
                    }
                  ],
                  must_answer: 1
                },
                {
                  title: "沙发",
                  answer_cells: [
                    {
                      type: "choice",
                      choice: ["12311", "345", "33443"],
                      is_multi: false
                    }
                  ],
                  must_answer: 1
                }
              ]
            }
          ]
        }
      }
    };
  }
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #ffffff;
}
.bg-purple-light {
  background: #ffffff;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
