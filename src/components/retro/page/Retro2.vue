<template>
  <el-container direction="vertical">
    <el-main class="public-retro">public-retro
      <el-row>
        <el-col :span="8">
          <div class="view-content bg-purple"
               @dragstart="public_well_card_dragstart_hanlder">
            <transition-group>
              <card v-for="card in public.wellCards"
                    :id="card.order"
                    :key="card.order"
                    :type="card.type"
                    :isPrivate="card.isPrivate"
                    :order="card.order"
                    draggable="true"
                    aria-hidden="true"
                    class="my-handle list-group-item">
              </card>
            </transition-group>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="view-content bg-purple-light"
               @drop="public_not_well_card_drop_handler"
               @dragover="public_not_well_card_drag_over_handler">
            <transition-group>
              <card v-for="card in public.notWellCards"
                    :id="card.order"
                    :key="card.order"
                    :type="card.type"
                    :isPrivate="card.isPrivate"
                    :order="card.order"
                    draggable="true"
                    aria-hidden="true"
                    class="my-handle list-group-item">
              </card>
            </transition-group>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
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
      public_well_card_dragstart_hanlder(ev) {
        console.log('public_well_card_dragstart_hanlder,,,,,,,,')
        console.log(ev.target.id)
        ev.dataTransfer.setData("text/plain", ev.target.id)
        ev.dataTransfer.dropEffect = "copy"
      },

      public_not_well_card_drop_handler(ev){
        // Get the id of the target and add the moved element to the target's DOM
        ev.preventDefault();
        let data = ev.dataTransfer.getData("text")
        ev.target.appendChild(document.getElementById(data));
      },

      public_not_well_card_drag_over_handler(ev){
        ev.preventDefault();
        // Set the dropEffect to move
        ev.dataTransfer.dropEffect = "move"
      },

      // public_well_card_drop_effect_handler(event){
      //
      // },

      addPublicWellCard() {
        this.cardNum = this.cardNum + 1
        this.public.wellCards.push({
          type: Constant.CARD_TYPE.WELL,
          order: this.cardNum,
          isPrivate: false
        })
      },

      addPublicNotWellCard() {
        this.cardNum = this.cardNum + 1
        this.public.notWellCards.push({
          type: Constant.CARD_TYPE.NOT_WELL,
          order: this.cardNum,
          isPrivate: false
        })
      },

      allowDrop: function (ev) {
        ev.preventDefault();
      },

      addSuggestionWellCard() {
        this.cardNum = this.cardNum + 1
        this.public.suggestionCards.push({
          type: Constant.CARD_TYPE.SUGGESTION,
          order: this.cardNum,
          isPrivate: false
        })
      }

    },

    mounted() {
      this.addPublicWellCard()
      this.addPublicWellCard()
      // this.addPublicNotWellCard()
    }
  }
</script>

<style>
  .list-group {
    min-height: 1px;
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

  /*Class name for the drop placeholder (default sortable-ghost).*/
  /*这些地方我们有很多的样式用不了，但是后面可以在事件之中添加它们*/
  .ghost {
    /*opacity: 0.4;*/
    background: chartreuse;
  }
</style>
