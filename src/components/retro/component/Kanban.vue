<template>
  <div class="board-column">
    <div class="board-column-header">
      {{headerText}}
    </div>
    <draggable class="board-column-content" :list="list" :options="options">
      <card class="board-item" v-for="card in list" :key="card.order" :type="card.type" :order="card.order"></card>
    </draggable>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  import Card from './Card'

  export default {
    components: {
      draggable,
      Card
    },
    props: {
      headerText: {
        type: String,
        default: 'Header'
      },
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
  .board-column {
    min-width: 620px;
    min-height: 500px;
    height: auto;
    overflow: hidden;
    background: #f0f0f0;
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
      border: 10px solid transparent;
      min-height: 60px;
      display: inline-flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: start;
      align-items: flex-start;
      align-content: flex-start;
    }
  }
</style>

