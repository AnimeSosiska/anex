<script setup lang="ts">
    import headerComponent from "../components/header.vue"
    import startLine from "../components/icons/line.vue"
    import searchBlock from "../components/search.vue"
    import hotToursBlock from "../components/hotTours.vue"
    import hotelsBlock from "../components/hotels.vue"
    import footerComponent from "../components/footer.vue"
    import { useRouter } from 'vue-router'
    const router = useRouter()

    function redirect() {
        router.push({name: 'tours'})
    }
</script>

<template>
    <headerComponent/>
    <main class="main__container">
        <section class="start__content">
            <h1 class="start__title">Путешествия<br/>мечты</h1>
            <span class="start__subtitle">выбери свою</span>
            <startLine class="start__line"/>
            <searchBlock @submitFunc="redirect()"/>
        </section>
        <section class="hot-tours__content">
            <hotToursBlock/>
        </section>
        <section class="hotels__content">
            <hotelsBlock/>
        </section>
    </main>
    <footerComponent/>
</template>

<style scoped>
    .hot-tours__content{
        width: 100%;
        height: 813px;
        /* display: flex;
        justify-content: center; */
    }
    .start__content{
        width: 100%;
        height: 100vh;
        background-image: url(/wallpapers.png);
        background-size: cover;
        background-position: center center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .start__title{
        text-transform: uppercase;
        color: var(--color-white);
        font-size: 128px;
        font-weight: 800;
        line-height: 135px;
        /* max-width: 930px; */
        margin-bottom: 30px;
    }
    .start__subtitle{
        text-transform: uppercase;
        color: var(--color-white);
        line-height: normal;
        font-weight: 400;
        font-size: 28px;
        margin-bottom: 60px;
    }
    .start__line{
        margin-bottom: 60px;
    }
    @media (max-width: 1920px){
        .start__title{
            font-size: max(6.66vw, 92px);
            line-height: max(7.03vw, 100px);
        }
    }
    @media (max-width: 1024px){
        .start__title{
            /* max-width: 700px; */
            font-size: max(6.66vw, 40px);
            line-height: max(7.03vw, 47px);
            margin-bottom: 20px;
        }
        .start__subtitle{
            font-size: max(2.73vw, 16px);
            margin-bottom: 10px;
        }
    }
    @media (max-width: 360px){
        .start__title{
            /* max-width: 300px; */
            margin-bottom: 14px;
        }
    }
</style>
