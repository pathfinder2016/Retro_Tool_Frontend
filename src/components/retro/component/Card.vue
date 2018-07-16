<template>
  <div class="box-card">
    <textarea v-model="content" class="card-textarea" type="textarea" :rows="3"></textarea>
  </div>
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
    padding: 5px 5px 5px 5px;
    width: 290px;
    height: 120px;
    border-radius: 20px;
    background-color: rgba(255, 221, 178, 0.69);
  }

  .card-textarea{
    width: 280px;
    height: 110px;
    border-radius: 20px;
    font-family: Aleo,sans-serif;
    background:rgba(225, 225, 225, 0.69);
    font-size: 18px;
  }
</style>
