<script setup lang="ts">
    import { ref, onErrorCaptured } from "vue"
    import headerComponent from "../components/header.vue"
    import hotelsDataService from "../services/hotelsDataService.js"
    import footerComponent from "../components/footer.vue"
    function arrayBufferToBase64(buffer){
        let binary = ''
        let bytes = new Uint8Array(buffer.data)
        let len = bytes.byteLength
        for(let i = 0; i < len; i++){
            binary += String.fromCharCode(bytes[i])
        }
        return window.btoa(binary)
    }
    let countriesList = ref()

    hotelsDataService.getAllLocations().then(response => {
        countriesList.value = response.data
        for(let i = 0; i < countriesList.value.length; i++){
            countriesList.value[i].imgData = (arrayBufferToBase64(countriesList.value[i].image))
        }
    })
    onErrorCaptured((err) => {
        console.log(err.message)
    })
</script>

<template>
    <headerComponent/>
    <main class="main__container">
        <div class="countries__background">
            <div class="countries-background__darken">
                <h1 class="countries__title">Страны</h1>
                <span class="countries__subtitle">Исследуйте мир: наши лучшие направления и страны для путешествий</span>
            </div>
        </div>
        <section class="countries__content content">
            <h2 class="content__title">Туры по странам</h2>
            <div class="content__countries-list">
                <RouterLink :to="{name: 'tours', query: {location: country.location}}" class="content__country-block block" v-for="country in countriesList">
                    <div class="block__image"><img :src="'data:image/png;base64,' + country.imgData" alt=""></div>
                    <div class="block__right">
                        <div class="block__title">{{ country.location }}</div>
                        <div class="block__visa" v-if="country.visa">Виза</div>
                        <div class="block__visa" v-if="!country.visa">Без визы</div>
                    </div>
                </RouterLink>
            </div>
        </section>
    </main>
    <footerComponent/>
</template>

<style scoped>
    .block__visa {
        color: var(--color-graytext2);
    }
    .block__right {
        display: flex;
        flex-direction: column;
        /* gap: 2px; */
        line-height: 20px;;
    }
    .block__image {
        border-radius: 50%;
        width: 42px;
        height: 42px;
        /* background-color: black; */
    }
    .content__country-block {
        padding: 10px;
        background-color: var(--color-graybg);
        border-radius: 30px;
        width: 256px;
        height: 60px;
        display: flex;
        gap: 13px;
    }
    .content__countries-list{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 30px;
        /* width: fit-content; */
        height: 100%;
    }
    .countries__content {
        max-width: 1120px;
        height: 1130px;
        display: flex;
        /* justify-content: center; */
        flex-direction: column;
        margin: 50px auto 140px auto;
        gap: 50px;
        padding: 0 50px;
    }
    .content__title {
        text-transform: uppercase;
        font-size: 44px;
        font-weight: 500;
        text-align: left;
    }
    .countries__background {
        height: 567px;
        background: url(countriesbg.png);
        background-position: center;
        background-size: cover;
    }
    .countries-background__darken {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.22);
        color: white;
    }
    .countries__title {
        font-size: 100px;
        font-weight: 800;
        line-height: 135px;
        text-transform: uppercase;
        margin-top: 80px;
        text-align: center;
    }
    .countries__subtitle {
        font-size: 28px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 80px;
        text-align: center;
        max-width: 695px;
    }

    @media (max-width: 1024px){
        .countries__background {
            height: 430px;
        }
        .countries__content {
            height: 1460px;
        }
    }
    @media (max-width: 768px){
        .countries__content {
            height: auto;
            /* align-items: center; */
            padding: 0 25px;
        }
        .content__countries-list {
            margin: 0 auto;
        }
        .content__title {
            font-size: 28px;

        }
        .countries__background {
            height: 327px;
        }
        .countries__title {
            font-size: 54px;
            line-height: 60px;
        }
        .countries__subtitle{
            margin-bottom: 15px;
            font-size: 24px;
        }
    }
</style>
../services/DataService.js