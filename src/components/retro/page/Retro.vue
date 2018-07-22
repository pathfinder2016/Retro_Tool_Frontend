<template>
  <div>
    <Action></Action>
    <div class="components-container">
      <div class="board-column" :style="displayStyle.wellBoard">
        <div class="well-board-column-header">
          <div>Well</div>
          <div>
            <el-button round class="el-icon-rank" @click="well_card_full_screen_handler"></el-button>
          </div>
        </div>
        <draggable class="public-board-column-content" :options="dropOptions" :list="public.wellCards"
                   @add="handle_move_to_public_well">
          <div class="box-card" v-for="card in public.wellCards" :key="card.order">
            <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
            <i class="el-icon-delete operation-column-area" @click="well_card_remove_handler(card)"></i>
          </div>
        </draggable>
        <div class="private_area">
          <el-button @click="add_private_well_card">+</el-button>
          <div class="board-column">
            <draggable class="private-board-column-content" :options="dropOptions" :list="private.wellCards">
              <div class="box-card" v-for="card in private.wellCards" :key="card.order">
                <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
              </div>
            </draggable>
          </div>
        </div>
      </div>

      <div class="board-column" :style="displayStyle.wellBoard">
        <div class="notwell-board-column-header">
          <div>Not Well</div>
          <div>
            <el-button round class="el-icon-rank" @click="not_well_card_full_screen_handler"></el-button>
          </div>
        </div>
        <draggable class="public-board-column-content" :options="dropOptions" :list="public.notWellCards"
                   @add="handle_move_to_public_not_well">
          <div class="box-card" v-for="card in public.notWellCards" :key="card.order">
            <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
            <i class="el-icon-delete operation-column-area" @click="not_well_card_remove_handler(card)"></i>
          </div>
        </draggable>
        <div class="private_area">
          <el-button @click="add_private_not_well_card">+</el-button>
          <div class="board-column">
            <draggable class="private-board-column-content" :options="dropOptions" :list="private.notWellCards">
              <div class="box-card" v-for="card in private.notWellCards" :key="card.order">
                <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
              </div>
            </draggable>
          </div>
        </div>
      </div>

      <div class="board-column" :style="displayStyle.suggestionCards">
        <div class="suggestion-board-column-header">
          <div>Well</div>
          <div>
            <el-button round class="el-icon-rank" @click="suggestion_card_full_screen_handler"></el-button>
          </div>
        </div>
        <draggable class="public-board-column-content" :options="dropOptions" :list="public.suggestionCards"
                   @add="handle_move_to_public_suggestion">
          <div class="box-card" v-for="card in public.suggestionCards" :key="card.order">
            <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
            <i class="el-icon-delete operation-column-area" @click="suggestion_card_remove_handler(card)"></i>
          </div>
        </draggable>
        <div class="private_area">
          <el-button @click="add_private_suggestion_card">+</el-button>
          <div class="board-column">
            <draggable class="private-board-column-content" :options="dropOptions" :list="private.suggestionCards">
              <div class="box-card" v-for="card in private.suggestionCards" :key="card.order">
                <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cardService from '../service/cardService'
  import Constant from "@/common/constant/constant"
  import draggable from 'vuedraggable'
  import Action from '../component/Action'
  import WebsocketHandler from '../service/WebsocketHandler'

  export default {
    components: {
      draggable,
      Action
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
        cardNum: 0,
        socket: {},
        websocketServerUrl: "ws://146.222.43.190:8090/websocket"
      }
    },

    methods: {
      handle_move_to_public_well() {
        console.log('handle_move_to_public_well')
        cardService.upsertPublicWellCards(this.public.wellCards);

      },

      handle_move_to_public_not_well() {
        console.log('handle_move_to_public_not_well')
        cardService.upsertPublicNotWellCards(this.public.notWellCards);
      },

      handle_move_to_public_suggestion() {
        console.log('handle_move_to_public_suggestion')
        cardService.upsertPublicSuggestionCards(this.public.suggestionCards);
      },

      well_card_remove_handler(card) {
        this.public.wellCards.splice(card, 1)
        cardService.del(card, Constant.CARD_TYPE.WELL)
      },

      not_well_card_remove_handler(card) {
        this.public.notWellCards.splice(card, 1)
        cardService.del(card, Constant.CARD_TYPE.NOT_WELL)
      },

      suggestion_card_remove_handler(card) {
        this.public.suggestionCards.splice(card, 1)
        cardService.del(card, Constant.CARD_TYPE.SUGGESTION)
      },

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

      add_public_well_card(card) {
        this.cardNum = this.cardNum + 1
        this.public.wellCards.push({
          type: card.type,
          order: this.cardNum,
          content: card.content,
          id: card.id
        })
      },

      add_public_not_well_card(card) {
        this.cardNum = this.cardNum + 1
        this.public.notWellCards.push({
          type: card.type,
          order: this.cardNum,
          content: card.content,
          id: card.id
        })
      },

      add_public_suggestion_card(card) {
        this.cardNum = this.cardNum + 1
        this.public.suggestionCards.push({
          type: card.type,
          order: this.cardNum,
          content: card.content,
          id: card.id
        })
      },

      add_private_well_card() {
        this.cardNum = this.cardNum + 1
        this.private.wellCards.push({
          order: this.cardNum,
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
      },

      reset() {
        this.cardNum = 0
        this.public.wellCards = []
        this.public.notWellCards = []
        this.public.suggestionCards = []
      },

      refresh(cards) {
        this.reset()
        cards.forEach((card) => {
          if (card.type === Constant.CARD_TYPE.WELL) {
            this.add_public_well_card(card)
          } else if (card.type === Constant.CARD_TYPE.NOT_WELL) {
            this.add_public_not_well_card(card)
          } else if (card.type === Constant.CARD_TYPE.SUGGESTION) {
            this.add_public_suggestion_card(card)
          }
        })
      },

    },

    mounted() {
      WebsocketHandler.initWebsocket(this.websocketServerUrl, this.refresh)
    }
  }
</script>

<style lang="scss">
  .components-container {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .board-column {
    min-width: 33.3%;
    min-height: 500px;
    height: auto;
    display: flex;
    flex-direction: column;
  }

  .well-board-column-header {
    background: #4A9FF9;
  }

  .notwell-board-column-header {
    background: #f9944a;
  }

  .suggestion-board-column-header {
    background: #2ac06d;
  }

  .public-board-column-content {
    border: 1px dashed;
    height: 580px;
    overflow-y: auto;
    width: 100%;
  }

  .private_area {
    height: 300px;
  }

  .box-card {
    margin: 1px;
    padding: 5px 5px 5px 5px;
    width: 290px;
    height: 130px;
    background-color: rgba(255, 221, 178, 0.69);
    display: inline-flex;
  }

  .card-textarea {
    width: 100%;
    height: 100%;
    border: 0;
    font-family: Aleo, sans-serif;
    background-color: rgba(255, 221, 178, 0.69);
    font-size: 18px;
  }

  .private-board-column-content {
    height: auto;
    overflow: hidden;
    border: 1px dashed;
    min-height: 260px;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
  }

  .operation-column-area {
    background-color: rgba(255, 221, 178, 0.69);
  }
</style>
