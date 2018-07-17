<template>
  <div class="board-column">
    <draggable class="board-column-content" :list="list" :options="options">
      <div class="box-card" v-for="card in list" :key="card.order" >
        <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
      </div>
    </draggable>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'

  export default {
    components: {
      draggable
    },
    props: {
      options: {
        type: Object,
        default() {
          return {}
        }
      },
      list: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>
<style lang="scss">
  .box-card {
    margin: 1px;
    padding: 5px 5px 5px 5px;
    width: 280px;
    height: 120px;
    border-radius: 20px;
    background-color: rgba(255, 221, 178, 0.69);
  }

  .card-textarea{
    width: 270px;
    height: 110px;
    border-radius: 20px;
    font-family: Aleo,sans-serif;
    background:rgba(225, 225, 225, 0.69);
    font-size: 18px;
  }

  .board-column {
    min-width: 620px;
    min-height: 500px;
    height: auto;
    overflow: hidden;
    border-radius: 3px; //圆角边框

    .board-column-header {
      height: 50px;
      line-height: 50px;
      overflow: hidden;
      padding: 0 20px;
      text-align: center;
      background: #333;
      color: #fff;
      border-radius: 3px 3px 0 0;
    }

    .board-column-content {
      height: auto;
      overflow: hidden;
      border: 1px solid transparent;
      min-height: 60px;
      display: inline-flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-start;
      align-content: flex-start;
    }
  }
</style>

