<template>
  <el-container direction="vertical">
    <el-main class="public-retro">public-retro
      <el-row>
        <el-col :span="8"><div class="view-content bg-purple">
          <!--用draggable包裹被拖拽的元素-->
          <draggable element="div" v-model="public.wellCards" :options="dragOptions" @end="addPublicWellCard" @add="addPublicWellCard">
            <transition-group type="transition" :name="'flip-list'">
              <div v-for="card in public.wellCards" :key="card.order">
                <card class="my-handle ghost"></card>
              </div>
            </transition-group>
            <card></card>
          </draggable>
        </div>
        </el-col>

        <!--
        transition-group 拥有transition所有属性
        <transition-group> 元素作为多个元素/组件的过渡效果
        但是需要关注的是它们的不同之处：
            transition本身不会渲染出元素
            但是transition-group 会渲染出元素节点；默认  tag属性为<span>，可修改。
            ps:transition-group 的元素必须指定key 属性
            https://cn.vuejs.org/v2/api/#transition-group
        -->
        <el-col :span="8">
          <div class="view-content bg-purple-light">
            <draggable element="div" v-model="public.notWellCards" :options="dragOptions">
              <transition-group type="transition">
                <div v-for="card in public.notWellCards" :key="card.order">
                  <card class="my-handle"></card>
                </div>
              </transition-group>
            </draggable>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="view-content bg-purple-light">
            <draggable element="div" v-model="public.suggestionCards" :options="dragOptions">
              <transition-group type="transition">
                <div v-for="card in public.suggestionCards" :key="card.order">
                  <card class="my-handle"></card>
                </div>
              </transition-group>
            </draggable>
          </div>
        </el-col>

      </el-row>
    </el-main>

    <!--The same as above-->
    <el-main class="private-retro">private-retro
      <el-row>
        <el-col :span="8"><div class="view-content bg-purple">
          <draggable element="div" v-model="private.wellCards" :move="getData" @end="testEnd" @update="dataGragEnd" :options="dragOptions" @start="privateWellCardStart">
            <transition-group type="transition">
              <div v-for="card in private.wellCards" :key="card.order">
                <card class="my-handle ghost"></card>
              </div>
            </transition-group>
          </draggable>
          <!--ingore-elements: use for add new card-->
          <el-button @click="addPrivateWellCard">+</el-button>
        </div>
        </el-col>

        <el-col :span="8">
          <div class="view-content bg-purple-light">
            <draggable element="div" v-model="private.notWellCards" :options="dragOptions">
              <transition-group type="transition">
                <div v-for="card in private.notWellCards" :key="card.order">
                  <card class="my-handle"></card>
                </div>
              </transition-group>
            </draggable>
            <el-button @click="addPrivateNotWellCard">+</el-button>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="view-content bg-purple-light">
            <draggable element="div" v-model="private.suggestionCards" :options="dragOptions">
              <transition-group type="transition">
                <div v-for="card in private.suggestionCards" :key="card.order">
                  <card class="my-handle"></card>
                </div>
              </transition-group>
            </draggable>
            <el-button @click="addPrivateSuggestionCard">+</el-button>
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
  import Vue from 'Vue'
  import ElementUI from 'element-ui';
  Vue.use(ElementUI)

  let CardEntity = Vue.extend(Card)

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
        }

      }

    },

    methods: {
      testEnd(event){
        debugger
      },

// Event when you move an item in the list or between lists
      getData(evt){
        debugger
        console.dir(evt)
        console.log(evt.draggedContext.element.id);
      },

      dataGragEnd(evt){
        debugger
        console.log('拖动前的索引：'+evt.oldIndex);
        console.log('拖动后的索引：'+evt.newIndex);
      },
      async test() {
        let result = await retroService.getRetros();
        console.log(result);
      },

      movePrivateWellCard({to, from, dragged, draggedRect, related, relateRect}){
        console.dir(to)
        console.dir(from)
        console.dir(dragged)
        console.dir(draggedRect)
        console.dir(related)
        console.dir(relateRect)

      },

      privateWellCardStart(event){
        // debugger
        event.oldIndex;  // element index within parent
        console.dir(event.item)
        console.log('-----')
        console.dir('---from----')
        console.dir(event.from)
        console.dir('---to----')
        console.dir(event.to)
      },

      handlePublicWellCardsInput(event, test){
        debugger
      },

      addPublicWellCard() {
        // debugger
        // let card = new CardEntity();
        // card.type = Constant.CARD_TYPE.WELL
        // card.isPrivate = false
        // card.order = this.public.wellCards.length + 1;
        // console.log("Add well card " + card.order)
        // this.public.wellCards.push(card)
      },
      addPublicNotWellCard() {
        let card = new CardEntity();
        card.type = Constant.CARD_TYPE.NOT_WELL
        card.isPrivate = false
        card.order = this.public.notWellCards.length + 1;
        console.log("Add well card " + card.order)
        this.public.notWellCards.push(card)
      },
      addPublicSuggestionCard() {
        let card = new CardEntity();
        card.type = Constant.CARD_TYPE.SUGGESTION
        card.isPrivate = false
        card.order = this.public.suggestionCards.length + 1;
        console.log("Add well card " + card.order)
        this.public.suggestionCards.push(card)
      },

      addPrivateWellCard() {
        let card = new CardEntity();
        debugger
        card.type = Constant.CARD_TYPE.WELL
        card.isPrivate = false
        card.order = this.private.wellCards.length + 1;
        console.log("Add well card " + card.order)
        this.private.wellCards.push(card)
        debugger
      },
      addPrivateNotWellCard() {
        let card = new CardEntity();
        debugger
        card.type = Constant.CARD_TYPE.NOT_WELL
        card.isPrivate = false
        card.order = this.private.notWellCards.length + 1;
        console.log("Add well card " + card.order)
        this.private.notWellCards.push(card)
      },
      addPrivateSuggestionCard() {
        let card = new CardEntity();
        card.type = Constant.CARD_TYPE.SUGGESTION
        card.isPrivate = false
        card.order = this.private.suggestionCards.length + 1;
        console.log("Add well card " + card.order)
        this.private.suggestionCards.push(card)
      }
    },

    computed: {

    /*
    * group option: https://github.com/RubaXa/Sortable#group-option
    *
    * */

      dragOptions() {
        return {
          animation: 150,//// ms, animation speed moving items when sorting, `0` — without animation
          group: 'retroCards',
          sort: true, // sorting inside list
          ghostClass: 'ghost',
          forceFallback: false,
          scroll: true,   //If set to true, the page (or sortable-area) scrolls when coming to an edge.
          /*定义哪一部分可以被拖动*/
          handle: '.my-handle',
        };
      }
    },

    mounted() {
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

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 280px;
  }

  /*Drag handle selector within list items*/
  /* selector 格式为简单css选择器的字符串，使列表单元中符合选择器的元素成为拖动的手柄，只有按住拖动手柄才能使列表单元进行拖动*/
  .my-handle {
    cursor: move;
    cursor: -webkit-grabbing;
  }

  /*Class name for the drop placeholder (default sortable-ghost).*/
  /*这些地方我们有很多的样式用不了，但是后面可以在事件之中添加它们*/
  .ghost {
    /*opacity: 0.4;*/
    background: chartreuse;
  }
</style>
