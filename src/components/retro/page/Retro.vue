<template>
  <div id="retro_card_id" class="components-container board">
    <Kanban header-text="Well" :options="drop_options" :list="public.wellCards"></Kanban>
    <Kanban header-text="Not Well" :options="drop_options" :list="public.notWellCards"></Kanban>
    <Kanban header-text="Suggestion" :options="drop_options" :list="public.suggestionCards"></Kanban>
  </div>
</template>

<script>
  import Constant from '../../../common/constant/constant'
  import Kanban from '../component/Kanban'

  export default {
    components: {
      Kanban
    },

    data() {
      return {
        drop_options:{
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
      public_well_card_full_screen_handler() {
        let element = document.getElementById('well_card_div_id')
        if (!document.webkitFullscreenElement) {  //For chrome
          element.webkitRequestFullScreen()
        } else {
          if (element.webkitExitFullscreen)
            element.webkitExitFullScreen()
        }
      },

      //https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
      dragstart_handler(ev) {
        ev.dataTransfer.setData("text/plain", ev.target.id)
        ev.dataTransfer.dropEffect = "copy"
      },

      drop_handler(ev) {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("text")
        ev.target.appendChild(document.getElementById(data));
      },

      drop_over_handler: function (ev) {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move"
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

    },
    mounted(){
      this.add_public_well_card();
      this.add_public_well_card();
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
    margin-left: 20px;
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

</style>
