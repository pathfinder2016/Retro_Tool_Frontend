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
          <div class="board-column">
            <draggable class="board-column-content" :options="dropOptions" :list="public.wellCards" @add="handle_move_to_public_well">
              <div class="box-card" v-for="card in public.wellCards" :key="card.order" >
                <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
                <i class="el-icon-delete "></i>
              </div>
            </draggable>
          </div>
        </div>
        <div class="kanban private_area">
          <el-button @click="add_private_well_card">+</el-button>
          <div class="board-column">
            <draggable class="board-column-content" :options="dropOptions" :list="private.wellCards">
              <div class="box-card" v-for="card in private.wellCards" :key="card.order" >
                <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
              </div>
            </draggable>
          </div>
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

          <div class="board-column">
            <draggable class="board-column-content" :options="dropOptions" :list="public.notWellCards">
              <div class="box-card" v-for="card in public.notWellCards" :key="card.order" >
                <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
              </div>
            </draggable>
          </div>

          <!--<Kanban header-text="Not Well" class="kanban notwell" :options="dropOptions" :list="public.notWellCards"></Kanban>-->
        </div>
        <div class="kanban private_area">
          <el-button @click="add_private_not_well_card">+</el-button>
          <div class="board-column">
            <draggable class="board-column-content" :options="dropOptions" :list="private.notWellCards">
              <div class="box-card" v-for="card in private.notWellCards" :key="card.order" >
                <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
              </div>
            </draggable>
          </div>
          <!--<Kanban :options="dropOptions" :list="private.notWellCards"></Kanban>-->
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
          <div class="board-column">
            <draggable class="board-column-content" :options="dropOptions" :list="public.suggestionCards">
              <div class="box-card" v-for="card in public.suggestionCards" :key="card.order" >
                <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
              </div>
            </draggable>
          </div>
          <!--<Kanban header-text="Suggestion" class="kanban suggestion" :options="dropOptions" :list="public.suggestionCards"></Kanban>-->
        </div>
        <div class="kanban private_area">
          <el-button @click="add_private_suggestion_card">+</el-button>
          <div class="board-column">
            <draggable class="board-column-content" :options="dropOptions" :list="private.suggestionCards">
              <div class="box-card" v-for="card in private.suggestionCards" :key="card.order" >
                <textarea v-model="card.content" class="card-textarea" :rows="3"></textarea>
              </div>
            </draggable>
          </div>
          <!--<Kanban :options="dropOptions" :list="private.suggestionCards"></Kanban>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import retroService from '../service/retroService'
  import Constant from "@/common/constant/constant"
  import draggable from 'vuedraggable'

  export default {
    components: {
      draggable
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
        socket:{}
      }
    },

    methods: {
      handle_move_to_public_well(){
        console.log('handle_move_to_public_well')
        retroService.upsertPublicWellCards(this.public.wellCards);

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

      add_public_well_card(content){
        this.cardNum = this.cardNum + 1
        this.public.wellCards.push({
          type: Constant.CARD_TYPE.WELL,
          order: this.cardNum,
          // isPrivate: false,
          content: content
        })
      },

      add_public_not_well_card(content){
        this.cardNum = this.cardNum + 1
        this.public.notWellCards.push({
          type: Constant.CARD_TYPE.NOT_WELL,
          order: this.cardNum,
          // isPrivate: false,
          content: content
        })
      },

      add_public_suggestion_card(content){
        this.cardNum = this.cardNum + 1
        this.public.suggestionCards.push({
          type: Constant.CARD_TYPE.SUGGESTION,
          order: this.cardNum,
          // isPrivate: false,
          content: content
        })
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
      },

      reset(){
        this.cardNum = 0
        this.public.wellCards = []
        this.public.notWellCards = []
        this.public.suggestionCards = []
      },

      // 先来粗糙的解决手段，直接全部全刷新
      refresh(cards){
        this.reset();
        cards.forEach((card, index)=>{
          // if(card.type === 'WELL'){
          //   let sameArray = _this.public.wellCards.filter((currentValue) =>{
          //     return (currentValue.content === card.content) //内容，类型一样
          //   })
          //   if(sameArray === 'undefined' || sameArray.length === 0){
          //     this.add_public_well_card(sameArray[0].content)
          //   }
          // }

          if(card.type === Constant.CARD_TYPE.WELL){
              this.add_public_well_card(card.content)
          }else if(card.type === Constant.CARD_TYPE.NOT_WELL){
            this.add_public_not_well_card(card.content)
          }else if(card.type === Constant.CARD_TYPE.SUGGESTION){
            this.add_public_suggestion_card(card.content)
          }else{

          }
        })

      },

      //https://www.cnblogs.com/bianzy/p/5822426.html
      initWebSocket() {
        if (typeof (WebSocket) === 'undefined') {
          console.log("您的浏览器不支持WebSocket");
        } else {
          console.log("您的浏览器支持WebSocket");
          let _this = this;
          //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
          this.socket = new WebSocket("ws://146.222.43.190:8090/websocket")
          this.socket.onopen = () => {
            console.log("Socket 已打开");
            this.socket.send(this.public.wellCards);
          }

          //获得消息事件
          this.socket.onmessage = function (msg) {
            console.dir("Receive from backend.....")
            let message = JSON.parse(msg.data)
            console.log(message);
            _this.refresh(message)
            //发现消息进入    调后台获取
          };

          //连接关闭的回调方法
          this.socket.onclose = function () {
            console.log("I am closing")
            _this.socket.close();

          }

          this.socket.onerror = function () {
            _this.socket.close()
          }

        }
      }
    },

    watch:{
      // 'public.wellCards': function () {
      //   console.log("public.wellCards")
      //   console.dir(this.public.wellCards)
      //   retroService.upsertPublicWellCards(this.public.wellCards);
      // },

      'public.notWellCards': function () {
        console.dir(this.public.notWellCards)
      },

      'public.suggestionCards': function () {
        console.dir(this.public.suggestionCards)
      }
    },

    mounted(){
      //Access websocket
      this.initWebSocket();
    }
  }

  window.onbeforeunload = function(event) {
    console.log('您正在刷新网页');
    return 'Are you sure?';
  };
</script>

<style lang="scss">

  .box-card {
    margin: 1px;
    padding: 5px 5px 5px 5px;
    width: 280px;
    height: 120px;
    border-radius: 20px;
    background-color: rgba(255, 221, 178, 0.69);
    display: inline-flex;
  }

  .card-textarea{
    width: 270px;
    height: 110px;
    border-radius: 20px;
    font-family: Aleo,sans-serif;
    background:rgba(225, 225, 225, 0.69);
    font-size: 18px;
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
        height: 500px;
        overflow-y:auto;
      }
    }

    &.private_area {
      .board-column-content{
        border: 1px dashed;
        min-width: 620px;
        height: 270px;
        overflow-y:auto;
      }
    }

    &.notwell {
      .board-column-header {
        background: #f9944a;
      }
      .board-column-content{
        border: 1px dashed;
        min-width: 620px;
        height: 500px;
        overflow-y:auto;
      }
    }
    &.suggestion {
      .board-column-header {
        background: #2ac06d;
      }
      .board-column-content{
        border: 1px dashed;
        min-width: 620px;
        height: 500px;
        overflow-y:auto;
      }
    }
  }


</style>
