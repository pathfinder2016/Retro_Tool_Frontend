<template>
  <div>
    <div id="retro_card_id" class="components-container board">
      <div class="kanban_header" :style="displayStyle.wellBoard">
        <div class="public_well_card_div">
          <div class="board-column-header">Well</div>
          <div>
            <el-button round class="el-icon-rank" @click="well_card_full_screen_handler"></el-button>
          </div>
          <Kanban class="kanban well" :options="dropOptions" :list="public.wellCards"></Kanban>
        </div>
        <div class="private_well_card_div">
          <el-button @click="add_private_well_card">+</el-button>
          <Kanban class="kanban well" :options="dropOptions" :list="private.wellCards"></Kanban>
        </div>
      </div>

      <div class="kanban_header" :style="displayStyle.notWellBoard">
        <div class="public_not_well_card_div">
          <div class="board-column-header">Not Well</div>
          <div>
            <el-button round class="el-icon-rank" @click="not_well_card_full_screen_handler"></el-button>
          </div>
          <Kanban header-text="Not Well" class="kanban notwell" :options="dropOptions" :list="public.notWellCards"></Kanban>
        </div>
        <div class="private_not_well_card_div">
          <el-button @click="add_private_not_well_card">+</el-button>
          <Kanban class="kanban well" :options="dropOptions" :list="private.notWellCards"></Kanban>
        </div>
      </div>

      <div class="kanban_header" :style="displayStyle.suggestionBoard">
        <div class="public_suggestion_card_div">
          <div class="board-column-header">Suggestion</div>
          <div>
            <el-button round class="el-icon-rank" @click="suggestion_card_full_screen_handler"></el-button>
          </div>
          <Kanban header-text="Suggestion" class="kanban suggestion" :options="dropOptions" :list="public.suggestionCards"></Kanban>
        </div>
        <div class="private_suggestion_card_div">
          <el-button @click="add_private_suggestion_card">+</el-button>
          <Kanban class="kanban well" :options="dropOptions" :list="private.suggestionCards"></Kanban>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Constant from '../../../common/constant/constant'
  import Kanban from '../component/Kanban'
  import screenfull from 'screenfull'

  export default {
    components: {
      Kanban
    },

    data() {
      return {
        displayStyle:{
          wellBoard: "display:block",
          notWellBoard: "display:block",
          suggestionBoard: "display:block"
        },
        isFullscreen: false,
        dropOptions:{
          group: 'retro'
        },
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
      public_well_card_full_screen_handler(){ //Unless UI behaviour
        if (!screenfull.enabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          })
          return false
        }
        screenfull.toggle()
      },

      well_card_full_screen_handler(){
        if(this.isFullscreen){
          this.displayStyle.suggestionBoard = "display:block"
          this.displayStyle.notWellBoard = "display:block"
        }else{
          this.displayStyle.suggestionBoard = "display:none"
          this.displayStyle.notWellBoard = "display:none"
        }
        this.isFullscreen = !this.isFullscreen;
        // this.public_well_card_full_screen_handler()
      },
      not_well_card_full_screen_handler(){
        if(this.isFullscreen){
          this.displayStyle.wellBoard = "display:block"
          this.displayStyle.suggestionBoard = "display:block"
        }else{
          this.displayStyle.wellBoard = "display:none"
          this.displayStyle.suggestionBoard = "display:none"
        }
        this.isFullscreen = !this.isFullscreen;
      },

      suggestion_card_full_screen_handler(){
        if(this.isFullscreen){
          this.displayStyle.wellBoard = "display:block"
          this.displayStyle.notWellBoard = "display:block"
        }else{
          this.displayStyle.wellBoard = "display:none"
          this.displayStyle.notWellBoard = "display:none"
        }
        this.isFullscreen = !this.isFullscreen;
      },

      add_public_well_card() {
        this.cardNum = this.cardNum + 1
        this.public.wellCards.push({
          type: Constant.CARD_TYPE.WELL,
          order: this.cardNum,
          isPrivate: false
        })
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

<style lang="scss">
  .components-container {
    position: relative;
    height: 100vh;
  }

  .board {
    width: 1000px;
    margin-left: 10px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: flex-start;
  }

  #well_card_header_div_id {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
  }

  #well_card_div_id:-webkit-full-screen {
    width: 100%;
    height: 100%;
  }

  #retro_card_id {
    display: -webkit-flex;
    display: flex;
    width: 100%;
    flex-direction: row;
  }

  #public_well_card_group_div_id, #public_not_well_card_div_id, #public_suggestion_card_div_id {
    width: 630px;
    height: 500px;
    border: 1px;
    border-style: dashed;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    align-items: flex-start;
    align-content: flex-start;
  }

  #private_well_card_div_id, #private_not_well_card_div_id, #private_suggestion_card_div_id {
    width: 630px;
    height: 150px;
    border: 1px;
    border-style: dashed;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    align-items: flex-start;
    align-content: flex-start;
  }

  #card_wrap_id, #private_card_wrap_id {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    margin: 10px;
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

  .kanban {
    &.well {
      .board-column-header {
        background: #4A9FF9;
      }
      .board-column-content{
        background: lightcyan;
      }
    }
    &.notwell {
      .board-column-header {
        background: #f9944a;
      }
      .board-column-content{
        background: lavender;
      }
    }
    &.suggestion {
      .board-column-header {
        background: #2ac06d;
      }
      .board-column-content{
        background: lightcyan;
      }
    }
  }

</style>
