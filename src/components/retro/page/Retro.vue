<template>
  <el-row>
    <el-button type="primary" @click="test">Test get data from backend, see console.log</el-button>
  </el-row>
</template>


<script>
  import retroService from '../service/retroService'
  export default {
    methods:{
      async test(){
        let result = await retroService.getRetros();
        console.log(result);
      }
    }
  }
</script>

<style>

</style>
