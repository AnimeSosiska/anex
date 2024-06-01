<script setup lang="ts">
    import { ref, onBeforeMount, onErrorCaptured } from 'vue'
    import hotelsDataService from "../services/hotelsDataService.js"
    import star from "./icons/ratingStar.vue"
    import feedIcon from "./icons/feed.vue"
    import submit from "./icons/submit.vue"
    import fireIcon from "./icons/fire.vue"

    function arrayBufferToBase64(buffer){
        let binary = ''
        let bytes = new Uint8Array(buffer.data)
        let len = bytes.byteLength
        for(let i = 0; i < len; i++){
            binary += String.fromCharCode(bytes[i])
        }
        return window.btoa(binary)
    }

    const props = defineProps([
        "stars",
        "index",
        "value",
        "hot"
    ])
    let adv = ref()
    let loc = ref()
    let img = ref()
    img.value = arrayBufferToBase64(props.value.image)
    hotelsDataService.getAdv(props.value.id).then(response => {
        adv.value = response.data
        // console.log(data.value)
        // console.log(hotels.value[0].rating)
    })
    // console.log(props.value.location)
    hotelsDataService.getLocation(props.value.location).then(response => {
        // console.log(response.data)
        loc.value = response.data.location
        // console.log(loc.value[props.index])
    })
    onErrorCaptured((err) => {
        console.log("CHILD: " + err.message)
    })
</script>
<template>
    <div class="resultBlock__container">
        <div class="resultBlock__image" :style="{ backgroundImage: `url('data:image/png;base64,` + img + `')`}">
            <fireIcon class="resultBlock__fire" v-if="props.hot[index]"/>
        </div>
        <div class="resultBlock__content content">
            <div class="content__info">
                <div class="content__info-top info">
                    <span class="info__location">
                        {{loc}}
                    </span>
                    <h3 class="info__name">
                        {{value.hotelName}}
                    </h3>
                    <div class="info__rating">
                        <!-- {{ props.stars }} -->
                        <star v-for="rate in props.stars[index]"/>
                    </div>
                </div>
                <div class="content__info-bottom info">
                    <div class="info__feed">
                        <feedIcon/>
                        <span>All inclusive ultra</span>
                    </div>
                    <div class="advantages">
                        <ul class="advantages__list">
                            <li class="advantages__item" v-for="advantages in adv">{{ advantages.text }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <span class="line"></span>
            <div class="content__general general">
                <div class="general__price">
                    <span>{{ value.price }} ₽</span>
                    / за 1
                </div>
                <RouterLink :to="{name: 'booking', query: {id: props.value.id} }" class="general__button">
                    Подробнее <submit/>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .general__price {
        font-size: 14px;
        font-weight: 300;
    }
    .general__price span {
        font-size: 24px;
        font-weight: 600;
    }
    .general__button {
        display: flex;
        gap: 7px;
        padding: 10px 25px;
        background-color: var(--color-red);
        color: white;
        border: none;
        border-radius: 30px;
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 500;
    }
    .content__general {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: auto;
        text-align: end;
    }
    .line {
        width: 1px;
        height: 100%;
        background-color: var(--color-line);
        margin: 0 28px;
    }
    .advantages__item {
        list-style-image: url(advantagecheck.svg);
        font-size: 14px;
        font-weight: 300;
        margin-left: 26px;
    }
    .resultBlock__container{
        width: 100%;
        height: 280px;
        border: 1px solid var(--color-line);
        border-radius: 30px;
        display: flex;
    }
    .resultBlock__image{
        max-width: 384px;
        flex-basis: 384px;
        /* background-image: url(casacook.png); */
        background-position: center;
        background-size: cover;
        border-radius: 30px 0 0 30px;
        position: relative;
    }
    .resultBlock__fire {
        position: absolute;
        top: 20px;
        left: 20px;
    }
    .resultBlock__content {
        display: flex;
        flex-direction: row;
        padding: 25px 30px 20px 30px;
        flex-grow: 1;
    }
    .content__info {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .content__info-top{
        display: flex;
        flex-direction: column;
    }
    .info__rating{
        display: flex;
        gap: 5px;
    }
    .info__name {
        font-size: 20px;
        font-weight: 600;
    }
    .info__location {
        font-size: 16px;
        font-weight: 300;
    }
    .info__feed {
        font-size: 14px;
        font-weight: 300;
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: auto;
    }
    .content__info-bottom {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 10px;
    }
    @media (max-width: 1024px){
        .resultBlock__image{
            max-width: 288px;
            flex-basis: 288px;
        }
        .line {
            margin: 0 24px;
        }
    }
    @media (max-width: 768px){
        .resultBlock__container{
            flex-direction: column;
            height: auto;
        }
        .resultBlock__image{
            max-width: 100%;
            flex-basis: 200px;
            height: 200px;
            border-radius: 30px 30px 0 0;
        }
        .resultBlock__content{
            flex-direction: column;
        }
        .content__general{
            text-align: center;
        }
        .general__button{
            justify-content: center;
        }
        .line {
            height: 1px;
            width: 100%;
            margin: 20px 0;
        }
        .content__info-bottom{
            gap: 5px;
        }
        .content__info{
            gap: 10px;
        }
    }
</style>../services/DataService.js