<template>
    <div class="app_container h-full max-h-full overflow-hidden">
        <div class="side_bar relative z-40">
            <div class="h-full max-h-full side-bar" :class="{hidden: sideBarState}">
                <sideBar/>
            </div>
            <div class="menu-drawer max-h-full h-full" :class="{hidden: !sideBarState}">
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

    import { computed, onMounted, ref } from 'vue'
    import { useAccountStore } from '@/stores/account';

    let accountStore = useAccountStore()
    let sideBarState = computed(() => accountStore.sideBarState)

    let drawerManager = () => {
        const drawer_trigger = document.getElementById('trigger');
        const drawer = document.getElementById('drawer')
        const drawer_off = document.getElementById('drawer_off')

        // Add an event listener
        drawer_trigger?.addEventListener('click', ()=> {
            drawer?.classList.remove('-translate-x-full');
            accountStore.changeSideBarState(true)
        });

        drawer_off?.addEventListener('click', ()=> {
            drawer?.classList.add('-translate-x-full');
            accountStore.changeSideBarState(false)
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
        width: min-content;
        max-height: 100%;
    }

    .main{
        grid-area: main;
        height: 100%;
        max-height: 100%;
    }
</style>