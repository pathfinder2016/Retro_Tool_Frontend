<template>
    <div>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>

      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>

      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import Card from '../component/Card'
  import Constant from '../../../common/constant/constant'

  export default {
    components: {
      draggable,
      Card
    },

    data() {
      return {
        public: {
          wellCards: [],
          notWellCards: [],
          suggestionCards: []
        },
        private: {
          wellCards: [],
          notWellCards: [],
          suggestionCards: []
        },
        cardNum: 0
      }
    },

    methods: {
      //https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
      dragstart_handler(ev) {
        ev.dataTransfer.setData("text/plain", ev.target.id)
        ev.dataTransfer.dropEffect = "copy"
      },

      drop_handler(ev) {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("text")
        ev.target.appendChild(document.getElementById(data));
      },

      drop_over_handler: function (ev) {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move"
      },

      add_private_well_card() {
        this.cardNum = this.cardNum + 1
        this.private.wellCards.push({
          type: Constant.CARD_TYPE.WELL,
          order: this.cardNum,
          isPrivate: false
        })
      },

      add_private_not_well_card() {
        this.cardNum = this.cardNum + 1
        this.private.notWellCards.push({
          type: Constant.CARD_TYPE.NOT_WELL,
          order: this.cardNum,
          isPrivate: false
        })
      },

      add_private_suggestion_card() {
        this.cardNum = this.cardNum + 1
        this.private.suggestionCards.push({
          type: Constant.CARD_TYPE.SUGGESTION,
          order: this.cardNum,
          isPrivate: false
        })
      }

    }
  }
</script>

<style>

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  #retro_card_id{
    display:inline-block;
  }

  #public_well_card_group_div_id, #public_not_well_card_div_id, #public_suggestion_card_div_id,
  #private_well_card_div_id, #private_not_well_card_div_id, #private_suggestion_card_div_id{
    width: 630px;
    height: 400px;
  }

  #public_card_wrap_id, #private_card_wrap_id{
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    margin: 10px;
  }
  .public-retro {
    background-color: aliceblue;
    color: #333;
    text-align: center;
    line-height: 10px;
  }

  .private-retro {
    background-color: aliceblue;
    color: #333;
    text-align: center;
    line-height: 10px;
  }

  .view-content {
    border-radius: 4px;
    min-height: 340px;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  /*Drag handle selector within list items*/
  /* selector 格式为简单css选择器的字符串，使列表单元中符合选择器的元素成为拖动的手柄，只有按住拖动手柄才能使列表单元进行拖动*/
  .my-handle {
    cursor: move;
    cursor: -webkit-grabbing;
  }

  .list-group-item {
    cursor: move;
  }

</style>
