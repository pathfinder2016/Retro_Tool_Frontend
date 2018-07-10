<template>
  <el-card class="box-card">
    <el-input type="textarea" :rows="3" placeholder="Please offer your idea">
    </el-input>
  </el-card>
</template>

<script>
  export default {
    props: {
      type: String
    },
    data(){
      return {
        content: '',
        likeNum: 0,
        isPrivate: true
      }
    }
  }
</script>

<style>
  .box-card {
    width: 300px;
    height: 110px;
    background-color: rgba(255, 221, 178, 0.69);
  }
</style>
