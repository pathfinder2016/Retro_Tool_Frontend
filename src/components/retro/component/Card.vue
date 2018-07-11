<template>
  <el-card class="box-card">
    <el-input v-model="content" class="card-input" type="textarea" :rows="3" placeholder="Please offer your idea">
    </el-input>
  </el-card>
</template>

<script>
  export default {
    props: {
      type: String,
      isPrivate: Boolean,
      order: Number
    },
    data(){
      return {
        content: '',
        likeNum: 0
      }
    }
  }
</script>

<style>
  .box-card {
    margin: 1px;
    padding: 0px;
    width: 300px;
    height: 110px;
    background-color: rgba(255, 221, 178, 0.69);
  }
</style>
