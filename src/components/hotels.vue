<script setup lang="ts">
    import starIcon from "./icons/star.vue"
    import { ref } from 'vue'
    import 'vue3-carousel/dist/carousel.css'
    import {Carousel, Slide} from 'vue3-carousel'
    const settings = {
        itemsToShow: 1,
        // itemsToScroll: 2,
        snapAlign: 'center',
        // currentSlide: 3   
    }
    const breakpoints = {
        1024: {
            itemsToShow: 3,
            // snapAlign: 'end',
        },
        1920: {
            itemsToShow: 4,
            // snapAlign: 'end'
        }
    }
    const hotels = ref([
        {
            name: 'villa flori como',
            rating: 5,
            bgImage: 'url(villafloricomo.png)'
        },
        {
            name: 'ritz-carlton',
            rating: 4.9,
            bgImage: 'url(ritzcarlton.png)'
        },
        {
            name: 'ikos dassia',
            rating: 4.8,
            bgImage: 'url(ikosdassia.png)'
        },
        {
            name: 'JW Marriott Marquis',
            rating: 4.9,
            bgImage: 'url(jwmarriottmarquis.png)'
        }
        ])
</script>
<template>
    <div class="hotels__container">
        <span class="hotels__name">Hotels</span>
        <h2 class="hotels__title">Популярные отели</h2>
        <h3 class="hotels__desc">Уют и роскошь в лучших отелях мира</h3>
        <Carousel v-bind="settings" :wrapAround="true" :breakpoints="breakpoints" :autoplay="5000">
            <Slide v-for="slide in hotels" :key="slide">
                <div class="carousel__item carousel-item__container" :style="{ 'background-image': slide.bgImage}">
                    <div class="carousel-item__darker">
                        <div class="carousel-item__content">
                            <div class="carousel-item__upper">
                                <span>{{slide.rating}}</span>
                                <span><starIcon/></span>
                            </div>
                            <div class="carousel-item__bottom">
                                <span class="carousel-item__bottom-name">{{slide.name}}</span>
                                <span>узнать подробнее</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Slide>
        </Carousel>
    </div>
</template>
<style scoped>
    .carousel-item__upper {
        display: flex;
        /* align-items: end; */
        justify-content: end;
    }
    .carousel-item__upper span:first-of-type{
        font-family: 'Chandra';
        font-size: 65px;
    }
    .carousel-item__container {
        color: white;
        height: 390px;
        width: 544px;
        /* background-color: aquamarine; */
        border-radius: 30px;
        background-size:cover;
        background-position: center;
    }
    .carousel-item__darker {
        height: 100%;
        background-color: rgba(0,0,0,0.2);
        border-radius: 30px;
    }
    .carousel-item__content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        padding: 30px;
    }
    .carousel-item__bottom {
        display: flex;
        flex-direction:column;
        text-align: start;
    }
    .carousel-item__bottom-name {
        font-size: 28px;
        font-weight: 500;
        text-transform: uppercase;
    }
    .carousel-item__bottom span:last-of-type{
        font-size: 14px;
        font-weight: 300;
    }
    .hotels__container {
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        background-color: #f8f8f8;
        height: 900px;
        position: relative;
    }
    .hotels__title {
        text-transform: uppercase;
        font-size: 44px;
        font-weight: 500;
        color: var(--color-black);
        padding-top: 170px;
    }
    .hotels__desc {
        text-transform: uppercase;
        font-size: 24px;
        font-weight: 300;
        color: var(--color-black );
        margin-bottom: 50px;
    }
    .hotels__name {
        font-family: 'Millanova';
        font-size: 42px;
        font-weight: 400;
        color: var(--color-line);
        position: absolute;
        top: 138px;
        left: 50%;
        transform:translatex(-50%)
    }

    .carousel__viewport {
        perspective: 2000px;
    }

    .carousel__track {
        transform-style: preserve-3d;
    }

    .carousel__slide--sliding {
        transition: 0.5s;
    }

    .carousel__slide {
        justify-content: center;
        opacity: 0.9;
        transform: rotateY(-20deg) scale(0.9);
    }

    .carousel__slide--active ~ .carousel__slide {
        transform: rotateY(20deg) scale(0.9);
    }

    .carousel__slide--prev {
        opacity: 1;
        transform: rotateY(-10deg) scale(0.95);
    }

    .carousel__slide--next {
        opacity: 1;
        transform: rotateY(10deg) scale(0.95);
    }

    .carousel__slide--active {
        opacity: 1;
        transform: rotateY(0) scale(1);
    }
    @media (max-width: 1024px){
        .hotels__name {
            font-size: 30px;
            top: 68px;
        }
        .hotels__title {
            font-size: 28px;
            padding-top: 100px;
        }
        .hotels__desc {
            font-size: 16px;
        }
        .carousel-item__container{
            width: 300px;
            height: 220px;
        }
        .carousel-item__upper span:first-of-type{
            font-size: 48px;
        }
        .carousel-item__bottom-name {
            font-size: 20px;
        }
    }
</style>