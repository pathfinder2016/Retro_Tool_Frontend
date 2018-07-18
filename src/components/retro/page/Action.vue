<template>
    <div>
        <div class='sidebar'>
            sidebar test
        </div>
        <div class="controller">
            <div>
                <button v-on:click="fadeIn">fadeIn</button>
                <button v-on:click="fadeOut">fadeOut</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Action',
        methods: {
            fadeIn: function () {
                var sidebarEl = document.querySelector(".sidebar");
                sidebarEl.className = 'sidebar';
                sidebarEl.style.top = '0px';
                sidebarEl.style.left = '0px';
                sidebarEl.classList.add('move_left');
            },
            fadeOut: function () {
                var sidebarEl = document.querySelector(".sidebar");
                sidebarEl.className = 'sidebar';
                sidebarEl.style.left = '120px';
                sidebarEl.classList.add('move_right');
            }
        }
    }

</script>

<style>
    .sidebar {
        margin-right: -310px;
        border: 1px solid red;
        height: 500px;
        width: 300px;
        float: right
    }

    @-webkit-keyframes move_left {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
            -webkit-transform: translateX(-302px);
            transform: translateX(-302px);
        }
    }

    @keyframes move_left {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
            -webkit-transform: translateX(-302px);
            transform: translateX(-302px);
        }
    }

    @-webkit-keyframes move_right {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
            -webkit-transform: translateX(302px);
            transform: translateX(302px);
        }
    }

    @keyframes move_right {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
            -webkit-transform: translateX(302px);
            transform: translateX(302px);
        }
    }

    .move_right {
        -webkit-animation-name: move_right;
        animation-name: move_right;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-iteration-count: 1;
        animation-iteration-count: 1;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
    }

    .move_left {
        -webkit-animation-name: move_left;
        animation-name: move_left;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-iteration-count: 1;
        animation-iteration-count: 1;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
    }

</style>
