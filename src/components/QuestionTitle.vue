<template>
  <div>
    <span>{{title}}</span>
    <span class="red">{{ifMust()}}</span>
  </div>
</template>

<script>
export default {
  name: "QuestionTitle",
  props: {
    title: String,
    must_answer: Number
  },
  methods: {
    ifMust: function() {
      return this.must_answer == 1 ? "*" : "";
    }
  }
};
</script>

<style>
.red {
  color: red;
}
</style>