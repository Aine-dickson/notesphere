<template>
    <div class="app_container h-full">
        <div class="side_bar">
            <div class="h-full side-bar" :class="{hidden: sideBarOff}">
                <sideBar/>
            </div>
            <div class="menu-drawer h-full" :class="{hidden: !sideBarOff}">
                <drawer/>
            </div>
        </div>
        <div class="main">
            <router-view/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import sideBar from '../../components/side_bar.vue';
    import drawer from '../../components/drawer.vue';

    import { onMounted, ref } from 'vue'

    let sideBarOff = ref(false)

    let drawerManager = () => {
        const drawer_trigger = document.getElementById('trigger');
        const drawer = document.getElementById('drawer')
        const drawer_off = document.getElementById('drawer_off')

        // Add an event listener
        drawer_trigger?.addEventListener('click', ()=> {
            drawer?.classList.remove('-translate-x-full');
            sideBarOff.value = true
        });

        drawer_off?.addEventListener('click', ()=> {
            drawer?.classList.add('-translate-x-full');
            sideBarOff.value = false
        })
    }
    
    onMounted(() => {
        drawerManager()
    })

</script>

<style scoped>
    .app_container {
        display: grid;
        grid-template-columns: min-content 1fr;
        grid-template-rows: 100%;
        grid-template-areas: "side_bar main";
    }

    .side_bar{
        grid-area: side_bar;
        height: 100%;
        width: auto;
    }

    .main{
        grid-area: main;
        height: 100%;
    }
</style>