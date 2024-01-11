<script setup lang="ts">
    import logo from "./icons/logo.vue"
    import location from "./icons/location.vue"
    import phone from "./icons/phone.vue"
    import {ref} from 'vue'
    const menuShow = ref(false)
</script>

<template>
    <header>
        <div class="header__container" :class="{burgerActive: menuShow}">
            <div class="header__content">
                <div class="content-left">
                    <RouterLink to="/" class="logo"><logo/></RouterLink>
                    <div class="menu">
                        <RouterLink to="/tours" class="menu__link menu__link-hideAll">ПОДБОР ТУРА
                            <span></span>
                        </RouterLink>
                        <RouterLink to="/hot-tours" class="menu__link menu__link-hideAll">ГОРЯЩИЕ ТУРЫ
                            <span></span>
                        </RouterLink>
                        <RouterLink to="/countries" class="menu__link menu__link-hide">СТРАНЫ
                            <span></span>
                        </RouterLink>
                        <RouterLink to="/hotels" class="menu__link menu__link-hide">ОТЕЛИ
                            <span></span>
                        </RouterLink>
                    </div>
                </div>
                <div class="content-right">
                    <div class="links links-hide">
                        <phone/>
                        <location/>
                    </div>
                    <span class="line line-hide"></span>
                    <div class="burger" @click="menuShow = !menuShow" :class="{burgerActive: menuShow}">
                        <span class="burger-line burger-line-upper"></span>
                        <span class="burger-line burger-line-middle"></span>
                        <span class="burger-line burger-line-bottom"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="burger__container" :class="{burgerActive: menuShow}">
            <div class="burger__content">
                <ul class="left-column burger__column">
                    <li>Популярные страны</li>
                    <li>Турция</li>
                    <li>Египет</li>
                    <li>Мальдивы</li>
                    <li>ОАЭ</li>
                    <li>Куба</li>
                    <li>Шри-Ланка</li>
                </ul>
                <ul class="middle-column burger__column">
                    <li>Туристам</li>
                    <li>Страны</li>
                    <li>Отели</li>
                    <li>Подбор тура</li>
                    <li>Горящие туры</li>
                    <li>Как купить и оплатить тур</li>
                </ul>
                <ul class="right-column burger__column">
                    <li>Компания</li>
                    <li>О нас</li>
                    <li>Отзывы</li>
                    <li>Контакты</li>
                    <li>Новости</li>
                    <li>Priority</li>
                    <li>Агентам</li>
                </ul>
            </div>
        </div>
    </header>
</template>

<style scoped>
    .header__container {
        position: relative;
        display: flex;
        justify-content: center;
        background-color: var(--color-white);
        width: 100%;
        z-index: 100;
        box-shadow: 0px 0px 0px 0px rgba(43, 43, 51, 0.20);
        transition: box-shadow 0.3s ease-in-out;
    }
    .header__content {
        display: flex;
        height: 85px;
        width: 1120px;
        justify-content: space-between;
        padding: 0 7px;
    }
    .header__container.burgerActive{
        box-shadow: 0px 4px 20px 0px rgba(43, 43, 51, 0.20);
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
    .burger-line {
        display: inline-block;
        width: 41px;
        border: 1px solid var(--color-black);
        border-radius: 1px;
        transition: all 0.1s ease;
    }
    .burgerActive .burger-line-upper{
        transform: translateY(10px) rotate(45deg);
    }
    .burgerActive .burger-line-middle{
        opacity: 0;
    }
    .burgerActive .burger-line-bottom{
        transform: translateY(-10px) rotate(-45deg);
    }
    .burger__container {
        width: 100%;
        display: flex;
        justify-content: center;
        transform: translateY(-100%);
        transition: transform 0.2s ease-in-out;
    }
    .burger__container.burgerActive {
        transform: translateY(0);
    }
    .burger__content{
        padding: 52px 198px 0 244px;
        height:305px;
        width:1120px;
        background-color: var(--color-white);
        display: flex;
        justify-content: space-between;
    }
    .burger__column li:first-of-type{
        text-transform: uppercase;
        margin-bottom: 20px;
        font-weight: 500;
        line-height: normal;
        font-size: 16px;
    }
    .burger__column li{
        color: var(--color-black);
        list-style-type: none;
        font-size: 14px;
        font-weight: 300;
        line-height: 27px;
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
    @media (max-width: 1024px){
        .header__content {
            width: 928px;
        }
        .menu__link-hide {
            display: none;
        }
        .burger__content{
            padding-left: 144px;
        }
    }
    @media (max-width: 800px){
        .burger__content {
            flex-direction: column;
            height: 100%;
        }
        /* .burger__container {
            transform: translateY(-100%);
        } */
    }
    @media (max-width: 700px){
        .links-hide {
            display: none;
        }
        .line-hide{
            display: none;
        }
        .logo {
            margin-right: 5vw;
        }
    }
    @media (max-width: 500px){
        .menu__link-hideAll{
            display: none;
        }
        .header__content{
            padding: 0 30px;
        }
        .burger__content{
            padding-left: 30px;
            padding-right: 0;
        }
    }
</style>
