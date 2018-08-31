<template>
  <div>
    <Action></Action>
    <div class="components-container">
      <div class="board-column" v-show="isShowWellBoard">
        <div class="well-board-column-header">
          <div>Well</div>
          <div>
            <el-button round class="el-icon-rank" @click="well_card_full_screen_handler"></el-button>
          </div>
        </div>
        <draggable class="public-board-column-content" :options="dropOptions" :list="public.wellCards"
                   @add="handle_move_to_public_well">
          <div class="box-card evenflow_scale" v-for="card in public.wellCards" :key="card.order">
            <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
            <i class="el-icon-delete operation-column-area" @click="well_card_remove_handler(card)"></i>
          </div>
        </draggable>
        <div class="private_area">
          <el-button @click="add_private_well_card">+</el-button>
          <div class="board-column">
            <draggable class="private-board-column-content" :options="dropOptions" :list="private.wellCards">
              <div class="box-card evenflow_scale" v-for="card in private.wellCards" :key="card.order">
                <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
              </div>
            </draggable>
          </div>
        </div>
      </div>

      <div class="board-column" v-show="isShowNotWellBoard">
        <div class="notwell-board-column-header">
          <div>Not Well</div>
          <div>
            <el-button round class="el-icon-rank" @click="not_well_card_full_screen_handler"></el-button>
          </div>
        </div>
        <draggable class="public-board-column-content" :options="dropOptions" :list="public.notWellCards"
                   @add="handle_move_to_public_not_well">
          <div class="box-card evenflow_scale" v-for="card in public.notWellCards" :key="card.order">
            <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
            <i class="el-icon-delete operation-column-area" @click="not_well_card_remove_handler(card)"></i>
          </div>
        </draggable>
        <div class="private_area">
          <el-button @click="add_private_not_well_card">+</el-button>
          <div class="board-column">
            <draggable class="private-board-column-content" :options="dropOptions" :list="private.notWellCards">
              <div class="box-card evenflow_scale" v-for="card in private.notWellCards" :key="card.order">
                <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
              </div>
            </draggable>
          </div>
        </div>
      </div>

      <div class="board-column" v-show="isShowSuggestionBoard">
        <div class="suggestion-board-column-header">
          <div>Suggestion</div>
          <div>
            <el-button round class="el-icon-rank" @click="suggestion_card_full_screen_handler"></el-button>
          </div>
        </div>
        <draggable class="public-board-column-content" :options="dropOptions" :list="public.suggestionCards"
                   @add="handle_move_to_public_suggestion">
          <div class="box-card evenflow_scale" v-for="card in public.suggestionCards" :key="card.order">
            <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
            <i class="el-icon-delete operation-column-area" @click="suggestion_card_remove_handler(card)"></i>
          </div>
        </draggable>
        <div class="private_area">
          <el-button @click="add_private_suggestion_card">+</el-button>
          <div class="board-column">
            <draggable class="private-board-column-content" :options="dropOptions" :list="private.suggestionCards">
              <div class="box-card evenflow_scale" v-for="card in private.suggestionCards" :key="card.order">
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
  import '../../../common/css/evenFlow.css';

  export default {
    components: {
      draggable,
      Action
    },

    data() {
      return {
        isShowWellBoard: true,
        isShowNotWellBoard: true,
        isShowSuggestionBoard: true,
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
        let newAddCards = this.public.wellCards.filter((card)=>{return card.id===undefined});
        cardService.upsertPublicCards(newAddCards, Constant.CARD_TYPE.WELL);
      },

      handle_move_to_public_not_well() {
        let newAddCards = this.public.notWellCards.filter((card)=>{return card.id===undefined});
        cardService.upsertPublicCards(newAddCards, Constant.CARD_TYPE.NOT_WELL);
      },

      handle_move_to_public_suggestion() {
        let newAddCards = this.public.suggestionCards.filter((card)=>{return card.id===undefined});
        cardService.upsertPublicCards(newAddCards, Constant.CARD_TYPE.SUGGESTION);
      },

      well_card_remove_handler(card) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.public.wellCards.splice(card, 1)
          cardService.del(card, Constant.CARD_TYPE.WELL)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      not_well_card_remove_handler(card) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.public.notWellCards.splice(card, 1)
          cardService.del(card, Constant.CARD_TYPE.NOT_WELL)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      suggestion_card_remove_handler(card) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.public.suggestionCards.splice(card, 1)
          cardService.del(card, Constant.CARD_TYPE.SUGGESTION)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      well_card_full_screen_handler() {
        if (this.isFullscreen) {
          this.isShowWellBoard = true
          this.isShowNotWellBoard = true
          this.isShowSuggestionBoard = true
        } else {
          this.isShowNotWellBoard = false
          this.isShowSuggestionBoard = false
        }
        this.isFullscreen = !this.isFullscreen;
      },

      not_well_card_full_screen_handler() {
        if (this.isFullscreen) {
          this.isShowWellBoard = true
          this.isShowNotWellBoard = true
          this.isShowSuggestionBoard = true
        } else {
          this.isShowWellBoard = false
          this.isShowSuggestionBoard = false
        }
        this.isFullscreen = !this.isFullscreen;
      },

      suggestion_card_full_screen_handler() {
        if (this.isFullscreen) {
          this.isShowWellBoard = true
          this.isShowNotWellBoard = true
          this.isShowSuggestionBoard = true
        } else {
          this.isShowWellBoard = false
          this.isShowNotWellBoard = false
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

      notSupportRefresh(){
        //禁止右键弹出菜单
        window.oncontextmenu = function () {
          return false;
        }
        window.onkeydown = function (e) {
            var ev = window.event || e;
            var code = ev.keyCode || ev.which;
            if (code == 116) {
              WebsocketHandler.onclose();
              // alert('注意：页面支持F5 刷新，但是不支持直接点击浏览器上方按钮进行刷新');
              event.keyCode = 0;
              event.cancelBubble = true;
              return false;
            }
        }
      }
    },

    mounted() {
      WebsocketHandler.initWebsocket(this.websocketServerUrl, this.refresh)
      this.notSupportRefresh()
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
    margin: 8px;
    padding: 5px 5px 0px 0px;
    width: 280px;
    height: 130px;
    background-color: rgba(255, 255, 255, 0.69);
    display: inline-flex;
    cursor:move;
  }

  .card-textarea {
    width: 100%;
    height: 97%;
    border: 0;
    font-family: Aleo, sans-serif;
    background-color: rgba(255, 221, 178, 0.69);
    font-size: 18px;
    resize: none;
  }

  .operation-column-area {
    background-color: rgba(255, 221, 178, 0.69);
    cursor:default;
  }

  .card-textarea:hover{
  background-color: rgba(230, 255, 204, 0.95);
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
</style>
