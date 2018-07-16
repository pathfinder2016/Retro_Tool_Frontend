<template>
  <div>
    <div id="retro_card_id" class="components-container board">
      <div class="kanban_header" :style="displayStyle.wellBoard">
        <div class="kanban well">
          <div class="board-column-header">
            <div >Well</div>
            <div>
              <el-button round class="el-icon-rank" @click="well_card_full_screen_handler"></el-button>
            </div>
          </div>
          <Kanban :options="dropOptions" :list="public.wellCards"></Kanban>
        </div>
        <div class="kanban private_area">
          <el-button @click="add_private_well_card">+</el-button>
          <Kanban :options="dropOptions" :list="private.wellCards"></Kanban>
        </div>
      </div>

      <div class="kanban_header" :style="displayStyle.notWellBoard">
        <div class="kanban notwell">
          <div class="board-column-header">
            <div>Not Well</div>
            <div>
              <el-button round class="el-icon-rank" @click="not_well_card_full_screen_handler"></el-button>
            </div>
          </div>
          <Kanban header-text="Not Well" class="kanban notwell" :options="dropOptions" :list="public.notWellCards"></Kanban>
        </div>
        <div class="kanban private_area">
          <el-button @click="add_private_not_well_card">+</el-button>
          <Kanban :options="dropOptions" :list="private.notWellCards"></Kanban>
        </div>
      </div>

      <div class="kanban_header" :style="displayStyle.suggestionBoard">
        <div class="kanban suggestion">
          <div class="board-column-header">
            <div>Suggestion</div>
            <div>
              <el-button round class="el-icon-rank" @click="suggestion_card_full_screen_handler"></el-button>
            </div>
          </div>
          <Kanban header-text="Suggestion" class="kanban suggestion" :options="dropOptions" :list="public.suggestionCards"></Kanban>
        </div>
        <div class="kanban private_area">
          <el-button @click="add_private_suggestion_card">+</el-button>
          <Kanban :options="dropOptions" :list="private.suggestionCards"></Kanban>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Kanban from '../component/Kanban'
  import retroService from '../service/retroService'
  export default {
    components: {
      Kanban
    },

    data() {
      return {
        displayStyle: {
          wellBoard: "display:block",
          notWellBoard: "display:block",
          suggestionBoard: "display:block"
        },
        isFullscreen: false,
        dropOptions: {
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
      well_card_full_screen_handler() {
        if (this.isFullscreen) {
          this.displayStyle.suggestionBoard = "display:block"
          this.displayStyle.notWellBoard = "display:block"
        } else {
          this.displayStyle.suggestionBoard = "display:none"
          this.displayStyle.notWellBoard = "display:none"
        }
        this.isFullscreen = !this.isFullscreen;
      },

      not_well_card_full_screen_handler() {
        if (this.isFullscreen) {
          this.displayStyle.wellBoard = "display:block"
          this.displayStyle.suggestionBoard = "display:block"
        } else {
          this.displayStyle.wellBoard = "display:none"
          this.displayStyle.suggestionBoard = "display:none"
        }
        this.isFullscreen = !this.isFullscreen;
      },

      suggestion_card_full_screen_handler() {
        if (this.isFullscreen) {
          this.displayStyle.wellBoard = "display:block"
          this.displayStyle.notWellBoard = "display:block"
        } else {
          this.displayStyle.wellBoard = "display:none"
          this.displayStyle.notWellBoard = "display:none"
        }
        this.isFullscreen = !this.isFullscreen;
      },

      add_private_well_card() {
        this.cardNum = this.cardNum + 1
        this.private.wellCards.push({
          // type: Constant.CARD_TYPE.WELL, //meaningless: because user can change the card between kanbans
          order: this.cardNum,
          // isPrivate: false,
          content: ''
        })
      },

      add_private_not_well_card() {
        this.cardNum = this.cardNum + 1
        this.private.notWellCards.push({
          order: this.cardNum
        })
      },

      add_private_suggestion_card() {
        this.cardNum = this.cardNum + 1
        this.private.suggestionCards.push({
          order: this.cardNum
        })
      }
    },

    watch:{
      'public.wellCards': function () {
        console.dir(this.public.wellCards)
        retroService.upsertPublicWellCards(this.public.wellCards);
      },

      'public.notWellCards': function () {
        console.dir(this.public.notWellCards)
      },

      'public.suggestionCards': function () {
        console.dir(this.public.suggestionCards)
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

  #retro_card_id {
    display: -webkit-flex;
    display: flex;
    width: 100%;
    flex-direction: row;
  }

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
        border: 1px dashed;
        min-width: 620px;
        min-height: 500px;
      }
    }

    &.private_area {
      .board-column-content{
        border: 1px dashed;
        min-width: 620px;
        min-height: 270px;
      }
    }

    &.notwell {
      .board-column-header {
        background: #f9944a;
      }
      .board-column-content{
        border: 1px dashed;
        min-width: 620px;
        min-height: 500px;
      }
    }
    &.suggestion {
      .board-column-header {
        background: #2ac06d;
      }
      .board-column-content{
        border: 1px dashed;
        min-width: 620px;
        min-height: 500px;
      }
    }
  }

</style>
