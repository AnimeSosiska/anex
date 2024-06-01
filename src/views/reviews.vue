<script setup lang="ts">
    import { ref } from 'vue'
    import headerComponent from "../components/header.vue"
    import star from "../components/icons/ratingStar.vue"
    import hotelsDataService from "../services/hotelsDataService.js"
    import reviewsModal from '../components/reviewsModal.vue'
    import submitModal from '../components/submitModal.vue'
    import reviewIcon from '../components/icons/reviewIcon.vue'
    import footerComponent from "../components/footer.vue"

    let open = ref(false)
    let success = ref(false)
    let reviews = ref()

    hotelsDataService.getAllReviews().then(response =>{
        reviews.value = response.data
    })
    const dataFunc = function(data){
        open.value = data.open
        hotelsDataService.createReview(data.name, data.review)
        success.value = true
    }
    const openFunc = function(){
        open.value = true
        document.documentElement.style.overflow = 'hidden'
    }
    const closeFunc = function(data){
        open.value = data.open
        document.documentElement.style.overflow = 'auto'
    }
    const closeSuccess = function(){
        success.value = false
        document.documentElement.style.overflow = 'auto'
    }
</script>

<template>
    <headerComponent/>
    <main class="main__container">
        <section class="reviews__background">
            <div class="reviews-background__darken">
                <h1 class="reviews__title">Отзывы</h1>
                <span class="reviews__subtitle">Истории наших путешественников:<br/>Вдохновение для вашего следующего приключения</span>
            </div>
        </section>
        <section class="reviews__content">
            <div class="content__top">
                <h2 class="content__title">Отзывы</h2>
                <span class="content__button" @click="openFunc"><reviewIcon class="review-icon"/>Оставить отзыв</span>
                <reviewsModal
                @submitFunc="dataFunc($event)"
                @closeFunc="closeFunc($event)"
                v-if="open"
                />
                <submitModal
                @closeFunc="closeSuccess()"
                v-if="success"
                />
            </div>
            <div class="content__bottom reviews__list">
                <div class="review__block" v-for="review in reviews">
                    <div class="review-block__stars">
                        <star v-for="stars in 5"/>
                    </div>
                    <span class="review-block__name">
                        {{ review.name }}
                    </span>
                    <div class="review-block__text">
                        {{ review.text }}    
                    </div>
                </div>
            </div>
        </section>
    </main>
    <footerComponent/>
</template>

<style scoped>
    .review-icon {
        display: none;
    }
    .review-block__text {
        font-size: 16px;
        font-weight: 300;
        color: var(--color-black);
        white-space: pre-line;
    }
    .review-block__name {
        font-size: 12px;
        font-weight: 300;
        color: #6b6b6b;
        text-transform: uppercase;
    }
    .review-block__image {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background-color: black;
    }
    .review-block__stars{
        display: flex;
        gap: 6px;

    }
    .review__block {
        width: 352px;
        height: 100%;
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 13px;
        background-color: var(--color-graybg);
        padding: 27px 24px;
    }
    .reviews__list {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        width: 100%;
        /* justify-content: center; */
        /* flex-direction: row; */
    }
    .content__button {
        padding: 10px 28px;
        height: 100%;
        background: none;
        border: 1px solid #6a6a6a;
        border-radius: 30px;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.1s ease-out;
        cursor: pointer;
    }
    .content__button:hover {
        background-color: #f8f8f8;
    }
    .content__top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 50px 0;
    }
    .content__title {
        text-transform: uppercase;
        font-size: 44px;
        font-weight: 500;

    }
    .reviews__content {
        max-width: 1220px;
        width: 100%;
        margin: 0 auto 170px auto;
        padding: 0 50px;
    }
    .reviews-background__title {
        text-transform: uppercase;
        font-size: 44px;
        font-weight: 500;
        text-align: left;
    }
    .reviews__background {
        height: 567px;
        background: url(reviewsbg.png);
        background-position: center;
        background-size: cover;
    }
    .reviews-background__darken {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.22);
        color: white;
    }
    .reviews__title {
        font-size: 100px;
        font-weight: 800;
        line-height: 135px;
        text-transform: uppercase;
        margin-top: 80px;
        text-align: center;
    }
    .reviews__subtitle {
        font-size: 28px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 80px;
        text-align: center;
        max-width: 810px;
    }

    @media (max-width: 1024px){
        .reviews__background {
            height: 430px;
        }
        .reviews__list {
            justify-content: center;
        }
    }
    @media (max-width: 768px){
        .review-icon {
            display: block;
        }
        .content__title {
            font-size: 28px;

        }
        .content__button {
            border: none;
            padding: 0;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .content__top {
            flex-direction: column;
            align-items: start;
            gap: 20px;
        }

        .reviews__content {
            height: auto;
            /* align-items: center; */
            padding: 0 25px;
        }

        .reviews__background {
            height: 327px;
        }
        .reviews__title {
            font-size: 54px;
            line-height: 60px;
        }
        .reviews__subtitle{
            margin-bottom: 15px;
            font-size: 24px;
        }
    }
</style>../services/DataService.js