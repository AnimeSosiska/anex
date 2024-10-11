<script setup lang="ts">
    import logo from "./icons/bwlogo.vue"
</script>
<template>
    <footer class="footer__container">
        <div class="footer__content">
            <div class="footer__upper">
                <logo/>
            </div>
            <div class="footer__middle">
                <ul class="footer__links">
                    <li><RouterLink to="/tours" class="footer__link">Подбор тура
                        <span></span></RouterLink></li>
                    <li><RouterLink to="/hot-tours" class="footer__link">Горящие туры
                        <span></span>
                    </RouterLink></li>
                    <li><RouterLink to="/countries" class="footer__link">Страны
                        <span></span>
                    </RouterLink></li>
                    <li><RouterLink to="/priority" class="footer__link">Priority
                        <span></span>
                    </RouterLink></li>
                    <li><RouterLink to="/reviews" class="footer__link">Отзывы
                        <span></span>
                    </RouterLink></li>
                    <li><RouterLink to="/about" class="footer__link">О нас
                        <span></span>
                    </RouterLink></li>
                    <li><RouterLink to="/contacts" class="footer__link">Контакты
                        <span></span>
                    </RouterLink></li>
                </ul>
            </div>
            <div class="footer__bottom">
                <span>2024 © Anex Tour - Туристическая компания</span>
            </div>
        </div>
    </footer>
</template>
<style scoped>
    .footer__container {
        z-index: 100;
        width: 100%;
        /* height: 400px; */
        border-radius: 30px 30px 0 0;
        background-color: #222222;
    }
    .footer__content {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        height: 100%;
        max-width: 1120px;
        padding: 50px;
    }
    .footer__upper {
        display: flex;
        justify-content: start;
        padding-bottom: 50px;
        border-bottom: 1px solid #494949;
    }
    .footer__links{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        margin: 50px 0;
        max-height: 120px;
    }
    .footer__links li{
        list-style-type: none;
        color: white;
        font-size: 12px;
        font-weight: 300;
        text-transform: uppercase;
    }
    .footer__link {
        display: flex;
        flex-direction: column;    
    }
    .footer__link > span{
        width: 0;
        border: 1px solid #222222;
        border-radius: 1px;
        transition: all 0.2s ease;
    }
    .footer__link:hover > span{
        width: 100%;
        border-color: white;
    }
    .footer__bottom {
        border-top: 1px solid #494949;
        color: #525252;
        text-align: center;
        padding-top: 70px;
        font-size: 12px;
        font-weight: 300;
    }
    @media (max-width: 768px){
        .footer__links {
            flex-flow: column wrap;
            gap: 10px;
            text-align: center;
        }
        .footer__upper {
            justify-content: center
        }
    }
</style>