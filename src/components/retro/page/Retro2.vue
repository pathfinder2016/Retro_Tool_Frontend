<template>
  <!--https://blog.csdn.net/zjiang1994/article/details/79809687-->
  <el-container direction="vertical">
    <el-main class="public-retro">public-retro
      <el-row>
        <el-col :span="8"><div class="view-content bg-purple">
          <draggable element="div" v-model="wellCards" :options="dragOptions" :move="onMove">
            <transition-group type="transition">
              <div v-for="card in wellCards" :key="card.order">
                <card></card>
              </div>
            </transition-group>
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
            <draggable element="div" v-model="wellCards" :options="dragOptions" :move="onMove">
              <transition-group type="transition">
                <div v-for="card in wellCards" :key="card.order">
                  <card></card>
                </div>
              </transition-group>
            </draggable>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="view-content bg-purple-light">
            <draggable element="div" v-model="wellCards" :options="dragOptions" :move="onMove">
              <transition-group type="transition">
                <div v-for="card in wellCards" :key="card.order">
                  <card></card>
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
        <el-col :span="8">
          <div class="view-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
          <div class="view-content bg-purple-light"></div>
        </el-col>
        <el-col :span="8">
          <div class="view-content bg-purple"></div>
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
        wellCards: [],
        notWellCards: [],
        suggestionCards: []
      }

    },

    methods: {
      async test() {
        let result = await retroService.getRetros();
        console.log(result);
      },

      onMove({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      },

      addWellCard() {
        let wellCard = new CardEntity();
        wellCard.type = Constant.CARD_TYPE.WELL
        wellCard.isPrivate = false
        wellCard.order = this.wellCards.length + 1;
        wellCard.fixed = false
        console.log("Add well card " + wellCard.order)
        this.wellCards.push(wellCard)
      }
    },

    computed: {
      dragOptions() {
        return {
          animation: 0,
          group: 'description',
          sort: true,
          disabled: !this.editable,
          ghostClass: 'ghost'
        };
      }
    },

    mounted() {
      this.addWellCard()
      this.addWellCard()
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

</style>
