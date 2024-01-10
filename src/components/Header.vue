<script setup lang="ts">
    import logo from "./icons/logo.vue"
    import location from "./icons/location.vue"
    import phone from "./icons/phone.vue"
</script>

<template>
    <header class="header__container">
        <div class="header__content">
            <div class="content-left">
                <RouterLink to="/" class="logo"><logo/></RouterLink>
                <div class="menu">
                    <RouterLink to="/tours" class="menu__link">ПОДБОР ТУРА
                        <span></span>
                    </RouterLink>
                    <RouterLink to="/hot-tours" class="menu__link">ГОРЯЩИЕ ТУРЫ
                        <span></span>
                    </RouterLink>
                    <RouterLink to="/countries" class="menu__link">СТРАНЫ
                        <span></span>
                    </RouterLink>
                    <RouterLink to="/hotels" class="menu__link">ОТЕЛИ
                        <span></span>
                    </RouterLink>
                </div>
            </div>
            <div class="content-right">
                <div class="links">
                    <phone/>
                    <location/>
                </div>
                <span class="line"></span>
                <div class="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
    .header__container {
        display: flex;
        height: 85px;
        background-color: var(--color-white);
        color: white;
        width: 1120px;
        margin: 0 auto;
    }
    .header__content {
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: space-between;
    }
    .logo{
        margin-right: 86px;
    }
    .menu {
        font-size: 14px;
        display: flex;
        gap: 42px;
    }
    .menu__link{
        display: flex;
        flex-direction: column;
    }
    .menu__link > span{
        width: 0;
        border: 1px solid white;
        border-radius: 1px;
        transition: all 0.2s ease;
    }
    .menu__link:hover > span{
        width: 100%;
        border-color: black;
    }
    .menu__link.router-link-active{
        color: var(--color-red);
    }
    .burger {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
    .burger:hover{
        cursor: pointer;
    }
    .burger span {
        display: inline-block;
        width: 41px;
        /* height: 1px; */
        border: 1px solid var(--color-black);
        border-radius: 1px;
    }
    .line {
        height:38px;
        margin: 0 25px;
        border: 1px solid var(--color-line);
    }
    .content-left{
        display: inherit;
        align-items: center;
    }
    .content-right{
        display: inherit;
        align-items: center;
    }
    .links{
        display: flex;
        gap: 11px;
    }
    .links >:hover{
        transition: all 0.15s ease-in;
        filter: brightness(0) saturate(100%) invert(36%) sepia(0%) saturate(0%) hue-rotate(42deg) brightness(93%) contrast(93%);
        cursor: pointer;
    }
</style>
