<template>
    <el-container direction="vertical">
      <el-main class="public-retro">public-retro
        <el-row>
          <el-col :span="8"><div class="view-content bg-purple">
            <card></card>
            <card></card>
          </div></el-col>
          <el-col :span="8"><div class="view-content bg-purple-light"></div></el-col>
          <el-col :span="8"><div class="view-content bg-purple"></div></el-col>
        </el-row>
      </el-main>
      <el-main class="private-retro">private-retro
        <el-row>
          <el-col :span="8"><div class="view-content bg-purple"></div></el-col>
          <el-col :span="8"><div class="view-content bg-purple-light"></div></el-col>
          <el-col :span="8"><div class="view-content bg-purple"></div></el-col>
        </el-row>
      </el-main>
    </el-container>
</template>

<script>
  import retroService from '../service/retroService'
  import draggable from 'vuedraggable'
  import Card from '../component/Card'

  export default {
    components:{
      draggable,
      Card
    },
    methods:{
      async test(){
        let result = await retroService.getRetros();
        console.log(result);
      }
    }
  }
</script>

<style>
  .public-retro {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 10px;
  }

  .private-retro {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 10px;
  }

  .view-content {
    border-radius: 4px;
    min-height: 340px;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 280px;
  }

</style>
