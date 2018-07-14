<template>
  <!--https://blog.csdn.net/zjiang1994/article/details/79809687-->
  <!--
    options: Type:object, Option used to initialize the sortable object

  -->
  <el-container direction="vertical"  @dragover="allowDrop">
    <el-main class="public-retro">public-retro
      <el-row>
        <el-col :span="8">
          <div class="view-content bg-purple">
            <draggable v-model="public.wellCards" class="list-group" :options="dragOptions"
                       :drop="testtest"
                       :move="handleMovePublicWellCard"
                       :end="handleDragPublicWellCardEnd">
              <transition-group>
                <card v-for="card in public.wellCards"
                      :key="card.order"
                      :type="card.type"
                      :isPrivate="card.isPrivate"
                      :order="card.order"
                      aria-hidden="true"
                      class="my-handle list-group-item">
                </card>
              </transition-group>
            </draggable>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="view-content bg-purple-light">
            <draggable v-model="public.notWellCards" class="list-group" :options="dragOptions"
                       :drop="testtest"
                       :add="handleAddPublicNotWellCards">
              <transition-group>

                <card v-if="public.notWellCards.length > 0" v-for="card in public.notWellCards"
                      :key="card.order"
                      class="my-handle list-group-item">
                </card>
                <card v-else class="list-group"></card>
              </transition-group>
            </draggable>
          </div>
        </el-col>

        <<el-col :span="8">
        <div class="view-content bg-purple">
            <draggable v-model="public.suggestionCards" class="list-group" :options="dragOptions"
                       @drop="testtest"
                       @add="handleAddPublicNotWellCards">
              <transition-group>
                <card v-for="card in public.suggestionCards"
                      :key="card.order"
                      class="my-handle list-group-item">
                </card>
              </transition-group>
            </draggable>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import retroService from '../service/retroService'
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
      testtest(event){
        debugger
      },
      async test() {
        let result = await retroService.getRetros();
        console.log(result);
      },

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

      allowDrop:function (ev) {
        ev.preventDefault();
      },

      addSuggestionWellCard() {
        this.cardNum = this.cardNum + 1
        this.public.suggestionCards.push({
          type: Constant.CARD_TYPE.SUGGESTION,
          order: this.cardNum,
          isPrivate: false
        })
      },

      handleAddPublicNotWellCards(event) {
        debugger
      },

      handleDragPublicWellCardEnd(event) {
        debugger
      },

      handleMovePublicWellCard(event){
        console.log('handleMovePublicWellCard....')
        // debugger
      }
    },

    computed: {

      /*
      * group option: https://github.com/RubaXa/Sortable#group-option
      *
      * */

      dragOptions() {
        return {
          animation: 100,
          group: 'retroCards',
          sort: true, // sorting inside list
          // disabled: true, // Disables the sortable if set to true.
          // ghostClass: 'ghost',
          // scroll: true,   //If set to true, the page (or sortable-area) scrolls when coming to an edge.
          handle: '.my-handle',
          // forceFallback:true, // ignore the HTML5 DnD behaviour and force the fallback to kick in
          // fallbackClass:'draggingStyle'  // Class name for the cloned DOM Element when using forceFallback
        };
      }
    },

    mounted() {
      this.addPublicWellCard()
      this.addPublicWellCard()
      this.addPublicNotWellCard()
      // this.addSuggestionWellCard()
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
