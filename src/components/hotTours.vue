<script setup lang="ts">
    import { ref } from 'vue'
    import 'vue3-carousel/dist/carousel.css'
    import {Carousel, Slide, Navigation} from 'vue3-carousel'
    const settings = {
        itemsToShow: 1,
        itemsToScroll: 2,
        snapAlign: 'center',
    }
    const breakpoints = {
        768: {
            itemsToShow: 2.5,
            // snapAlign: 'end',
        },
        1120: {
            itemsToShow: 3.5,
            // snapAlign: 'end'
        }
    }
    const tours = ref([
            {
                nameFirst:'Италия',
                nameSecond:'Венеция',
                price:"25 000",
                days:"9",
                date:"12-18 октября",
                bgImage:'url(italy.png)'
            },
            {
                nameFirst:'Турция',
                nameSecond:'Каппадокия',
                price:"95 000",
                days:"14",
                date:"16-30 сентября",
                bgImage:'url(turkey.png)'
            },
            {
                nameFirst:'Италия',
                nameSecond:'Рим',
                price:"80 000",
                days:"5",
                date:"10-15 ноября",
                bgImage:'url(rome.png)'
            },
            {
                nameFirst:'Оаэ',
                nameSecond:'Дубай',
                price:"25 000",
                days:"9",
                date:"12-18 октября",
                bgImage:'url(dubai.png)'
            },
            {
                nameFirst:'Италия',
                nameSecond:'Флоренция',
                price:"25 000",
                days:"9",
                date:"12-18 октября",
                bgImage:'url(florence.png)'
            },
            {
                nameFirst:'Италия',
                nameSecond:'Париж',
                price:"25 000",
                days:"9",
                date:"12-18 октября",
                bgImage:'url(paris.png)'
            },
    ])
</script>
<template>
    <div class="tours__container">
        <h2 class="tours__title">Горящие туры</h2>
        <h3 class="tours__desc">Поймайте момент</h3>
        <span class="tours__name">tours</span>
        <Carousel v-bind="settings" :breakpoints="breakpoints">
            <Slide v-for="slide in tours" :key="slide">
                <div class="carousel__item carousel-item__container" :style="{ 'background-image': slide.bgImage}">
                    <div class="carousel-item__darker">
                        <div class="carousel-item__content">
                            <div class="carousel-item__upper">
                                <span>{{slide.days}} дней</span>
                                <span>от {{slide.price}} ₽</span>
                            </div>
                            <div class="carousel-item__bottom">
                                <span class="carousel-item__bottom-countries">{{slide.nameFirst}} • {{slide.nameSecond}}</span>
                                <span class="carousel-item__bottom-date">{{slide.date}}</span>
                                <span>узнать подробнее</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Slide>

            <template #addons>
                <Navigation/>
            </template> 
        </Carousel>
    </div>
</template>
<style>
    .carousel__viewport {
        /* overflow: visible; */
        justify-self: end;
    }
    .carousel__track {
        margin-top: 62px;
        /* gap: 32px; */
    }
    .carousel__slide {
        justify-content: start;
    }
    .carousel__next, .carousel__prev {
        border: 1px solid white;
        border-radius: 50%;
        background-color: white;
    }
    @media (max-width: 768px ){
        .carousel__slide {
            justify-content: center;
        }
    }
</style>
<style scoped>
    .carousel-item__upper span {
        padding: 0 10px;
        border: 1px solid white;
        border-radius: 30px;
        font-weight: 300;
    }
    .carousel-item__upper {
        display: flex;
        gap: 10px;
    }
    .carousel-item__bottom-countries {
        text-transform: uppercase;
    }
    .carousel-item__bottom span:last-of-type{
        font-weight: 300;
    }
    .carousel-item__bottom {
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .carousel-item__darker{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.1);
        border-radius: 30px;
    }
    .carousel-item__content {
        font-size: 14px;
        font-weight: 500;
        color: white;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px;
    }
    .carousel-item__container {
        background-color: var(--color-line);
        flex-basis: 296px;
        height: 340px;
        background-size:cover;
        background-position: center;
        /* background-image:url(italy.png); */
        border-radius: 30px;
    }
    .tours__container {
        position: relative;
        padding-top: 134px;
        width: 1120px;
        margin: 0 auto;
        /* display: flex;
        flex-direction: column;
        justify-content: center; */
    }
    .tours__title{
        text-transform: uppercase;
        font-size: 44px;
        font-weight: 500;
        color: var(--color-black);
    }
    .tours__desc{
        text-transform: uppercase;
        font-weight: 300;
        font-size: 24px;
        color: var(--color-black);
        line-height: 1;
    }
    .tours__name {
        z-index: 10;
        font-family: 'Millanova';
        font-size: 52px;
        font-weight: 400;
        position: absolute;
        padding-top: 35px;
        left: -140px;
        color: var(--color-line)
    }
    @media (max-width: 1440px){
        .tours__name {
            left: 380px;
            padding-top: 0;
        }
    }
    @media (max-width: 1120px){
        .tours__container {
            width: calc(100% - 48px);
            margin-left: 48px;
        }
    }
    @media (max-width: 768px) {
        .tours__container {
            width: 100%;
            text-align: center;
            margin-left: 0;
        }
        .tours__name {
            left: 50%;
            top: 20%;
            transform: translate(-50%, -20%);
        }
        .tours__title{
            font-size: 28px;
        }
        .tours__description{
            font-size: 16px;
        }
        .tours__name {
            font-size: 36px;
        }
    }
</style>