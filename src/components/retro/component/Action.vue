<template>
    <div id="wrapper" v-bind:class="{toggled: isActive}">
        <div id="sidebar-wrapper" class="sidebar-fixed-top">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item class="action-el">
                    <span slot="label" class="action-label">Action</span>
                </el-form-item>
                <el-input @input="saveAction" name="actionContent" id="action-textarea" class="action-textarea" placeholder="Pls input actions here..."
                          type="textarea" :rows="24"
                          v-model="form.actionContent"></el-input>
                <el-form-item size="large">
                    <el-button class="createBtn" type="primary" @click="onSubmit">Create
                    </el-button>
                    <el-button @click="reset">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div id="page-content-wrapper">
            <button type="button" @click="hamburgerCross" class="hamburger is-closed animated fadeInLeft">
                <span class="hamb-top"></span>
                <span class="hamb-middle"></span>
                <span class="hamb-bottom"></span>
            </button>
            <!--<div class="container">-->
            <!--<h1 class="page-header">retro</h1>-->
            <!--</div>-->
        </div>
    </div>

</template>

<script>
    import retroService from '../service/retroService'

    export default {
        name: 'Action',
        data: function () {
            return {
                isActive: false,
                isClosed: false,
                form: {
                    retroKey: "I14",
                    actionContent: ''
                }
            }
        },
        mounted: async function () {
            await this.loadActionContent();
        },
        methods: {
            hamburgerCross: function () {
                let trigger = document.getElementsByClassName('hamburger')[0];
                if (this.isClosed == true) {
                    trigger.classList.remove('is-open');
                    trigger.classList.add('is-closed');
                    this.isClosed = false;
                } else {
                    trigger.classList.remove('is-closed');
                    trigger.classList.add('is-open');
                    this.isClosed = true;
                }
                this.isActive = !this.isActive;
            },

            loadActionContent: async function () {
                let result = await retroService.loadActionContent({retroKey: 'I14'});
                this.form.retroKey = result.retroKey;
                this.form.actionContent = result.actionContent
            },

            onSubmit: function () {
                this.saveAction();
                this.hamburgerCross();
            },
            saveAction: function(){
                console.log('save action!');
                let action = {
                    retroKey: 'I14',
                    actionContent: this.form.actionContent
                }
                retroService.createAction(action);
            },
            reset: function () {
                this.form.actionContent = '';
            }
        }
    }

</script>

<style>

    .action-textarea {
        font-size: 20px;
        font-family: 'Microsoft YaHei'
    }

    .action-el {
        margin-top: 30px
    }

    .action-label {
        font-size: xx-large;
        color: #15ff06;
        margin: 30px;
        font-family: 微软雅黑;
    }

    .createBtn {
        margin-left: -130px;
        margin-top: 20px
    }

    body {
        position: relative;
        overflow-x: hidden
    }

    body, html {
        height: 100%;
        /*background-color: #397e51*/
    }

    #wrapper {
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;
        -webkit-transition: all .5s ease;
        padding-left: 0;
        transition: all .5s ease
    }

    #wrapper.toggled {
        padding-left: 420px
    }

    #wrapper.toggled #sidebar-wrapper {
        width: 34%
    }

    #wrapper.toggled #page-content-wrapper {
        margin-right: -420px;
        position: absolute
    }

    #sidebar-wrapper {
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;
        -webkit-transition: all .5s ease;
        background: rgb(0, 0, 0);
        height: 100%;
        left: 420px;
        margin-left: -420px;
        overflow-x: hidden;
        overflow-y: auto;
        transition: all .5s ease;
        width: 0;
        z-index: 1000
    }

    #sidebar-wrapper::-webkit-scrollbar {
        display: none
    }

    #page-content-wrapper {
        padding-top: 70px;
        width: 100%
    }

    .hamburger {
        border: 0;
        display: block;
        height: 32px;
        margin-left: 12%;
        position: fixed;
        top: 20px;
        width: 32px;
        z-index: 999;
        background: rgba(1, 1, 6, 0.99) 0 0;
    }

    .hamburger:hover {
        outline: 0
    }

    .hamburger:focus {
        outline: 0
    }

    .hamburger:active {
        outline: 0
    }

    .hamburger.is-closed:before {
        -webkit-transform: translate3d(0, 0, 0);
        -webkit-transition: all .35s ease-in-out;
        color: #fff;
        content: '';
        display: block;
        font-size: 14px;
        line-height: 32px;
        opacity: 0;
        text-align: center;
        width: 100px;
    }

    .hamburger.is-closed:hover before {
        -webkit-transform: translate3d(-100px, 0, 0);
        -webkit-transition: all .35s ease-in-out;
        display: block;
        opacity: 1
    }

    .hamburger.is-closed:hover .hamb-top {
        -webkit-transition: all .35s ease-in-out;
        top: 0;
    }

    .hamburger.is-closed:hover .hamb-bottom {
        -webkit-transition: all .35s ease-in-out;
        bottom: 0
    }

    .hamburger.is-closed .hamb-top {
        -webkit-transition: all .35s ease-in-out;
        background-color: rgba(255, 255, 255, .7);
        top: 5px;
    }

    .hamburger.is-closed .hamb-middle {
        background-color: rgba(255, 255, 255, .7);
        margin-top: -2px;
        top: 50%
    }

    .hamburger.is-closed .hamb-bottom {
        -webkit-transition: all .35s ease-in-out;
        background-color: rgba(255, 255, 255, .7);
        bottom: 5px
    }

    .hamburger.is-closed .hamb-top, .hamburger.is-closed .hamb-middle, .hamburger.is-closed .hamb-bottom, .hamburger.is-open .hamb-top, .hamburger.is-open .hamb-middle, .hamburger.is-open .hamb-bottom {
        height: 4px;
        left: 0;
        position: absolute;
        width: 100%
    }

    .hamburger.is-open .hamb-top {
        -webkit-transform: rotate(45deg);
        -webkit-transition: -webkit-transform .2s cubic-bezier(.73, 1, .28, .08);
        background-color: #fff;
        margin-top: -2px;
        top: 50%
    }

    .hamburger.is-open .hamb-middle {
        background-color: #fff;
        display: none
    }

    .hamburger.is-open .hamb-bottom {
        -webkit-transform: rotate(-45deg);
        -webkit-transition: -webkit-transform .2s cubic-bezier(.73, 1, .28, .08);
        background-color: #fff;
        margin-top: -2px;
        top: 50%
    }

    .hamburger.is-open:before {
        -webkit-transform: translate3d(0, 0, 0);
        -webkit-transition: all .35s ease-in-out;
        color: #fff;
        content: '';
        display: block;
        font-size: 14px;
        line-height: 32px;
        opacity: 0;
        text-align: center;
        width: 100px
    }

    .hamburger.is-open:hover before {
        -webkit-transform: translate3d(-100px, 0, 0);
        -webkit-transition: all .35s ease-in-out;
        display: block;
        opacity: 1
    }

    .sidebar-fixed-top {
        top: 0;
        border-width: 0 0 1px;
        position: fixed;
        right: 0;
    }

    button, html input[type="button"], input[type="reset"], input[type="submit"] {
        -webkit-appearance: button;
        cursor: pointer;
    }

</style>
