<template>
  <el-container direction="vertical">
    <el-main class="public-retro">public-retro
      <el-row>
        <el-col :span="8">
          <div class="view-content bg-purple"
               @dragstart="dragstart_hanlder"
               @drop="drop_handler"
               @dragover="drop_over_handler">
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
               @dragstart="dragstart_hanlder"
               @drop="drop_handler"
               @dragover="drop_over_handler">
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

        <el-col :span="8">
          <div class="view-content bg-purple"
               @dragstart="dragstart_hanlder"
               @drop="drop_handler"
               @dragover="drop_over_handler">
            <transition-group>
              <card v-for="card in public.suggestionCards"
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

    <el-main class="private-retro">public-retro
      <el-row>
        <el-col :span="8">
          <div class="view-content bg-purple"
               @dragstart="dragstart_hanlder"
               @drop="drop_handler"
               @dragover="drop_over_handler">
            <transition-group>
              <card v-for="card in private.wellCards"
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
            <el-button @click="add_private_well_card">+</el-button>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="view-content bg-purple-light"
               @dragstart="dragstart_hanlder"
               @drop="drop_handler"
               @dragover="drop_over_handler">
            <transition-group>
              <card v-for="card in private.notWellCards"
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
            <el-button @click="add_private_not_well_card">+</el-button>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="view-content bg-purple"
               @dragstart="dragstart_hanlder"
               @drop="drop_handler"
               @dragover="drop_over_handler">
            <transition-group>
              <card v-for="card in private.suggestionCards"
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
            <el-button @click="add_private_suggestion_card">+</el-button>
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
      dragstart_hanlder(ev) {
        ev.dataTransfer.setData("text/plain", ev.target.id)
        ev.dataTransfer.dropEffect = "copy"
      },

      drop_handler(ev){
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
