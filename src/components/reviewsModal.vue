<script lang="ts">
    let name = ref()
    let review = ref()
    let error = ref({
        name: false,
        review: false
    })
    let formData = ref({
        name: "",
        review: "",
        open: false
    })
    export default {
        emits: [
            "submitFunc",
            "closeFunc"
        ],
        methods: {
            submitFunc() {
                if (error.value.name || error.value.review || name.value == undefined || review.value == undefined){
                    return
                } else {
                    formData.value.name = name.value
                    formData.value.review = review.value
                    formData.value.open = false
                    this.$emit('submitFunc', formData.value)
                    name.value = ""
                    review.value = ""
                }
                
            },
            closeFunc() {
                formData.value.open = false
                this.$emit('closeFunc', formData.value)
            },
            reviewChange() {
                if (review.value == undefined || review.value == "") {
                    error.value.review = true
                } else {
                    error.value.review = false
                }
            },
            nameChange() {
                if (name.value == undefined || name.value == "") {
                    error.value.name = true
                } else {
                    error.value.name = false
                }
            }
        }
    }
</script>
<script setup lang="ts">
    import { ref } from "vue"
    import submit from './icons/submit.vue'
    const Form = ref()

    // const emit = defineEmits<{
    //     (e: 'submit', formData: FormData): void
    // }>()

</script>

<template>
    <div class="modal__background" @click="closeFunc"></div>
    <div class="modal__container">
        <div class="modal__content">
            <h1>Будем рады <i>вашему</i> отзыву</h1>
            <form class="form" ref="Form" @submit.prevent="submitFunc">
                <div class="content" >
                    <div class="content__name">
                        <span>Имя и Фамилия</span>
                        <input
                        type="text"
                        class="name"
                        placeholder="Александра Иванова"
                        v-model="name"
                        @focusout="nameChange"
                        :class="{'error': error.name}">
                    </div>
                    <div class="content__review">
                        <span>Напишите отзыв</span>
                        <textarea
                        class="review"
                        placeholder="Текст"
                        v-model="review"
                        @focusout="reviewChange"
                        :class="{'error': error.review}"></textarea>
                    </div>
                </div>
                <button type="submit">
                    Отправить<submit/>
                </button>
            </form>
        </div>
    </div>
</template>

<style>
    .review {
        width: 100%;
        height: 220px;
    }
    .error {
        border: 1px solid var(--color-red) !important;
    }
    .modal__container {
        position: fixed;
        z-index: 999;
        top: 50%;
        left: 50%;
        width: 544px;
        transform: translate(-50%, -50%);
        transition: 1s linear;
    }
    .modal__background {

        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #00000030;
        z-index: 998;
    }
    .active {
        display: block;
        opacity: 1;
    }
    .modal__content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 50px 40px;
        background: #fff;
        border-radius: 30px;
        gap: 24px;
    }
    .modal__content h1 {
        font-size: 23px;
        font-weight: 400;
        text-transform: uppercase;
        max-width: 244px;
        text-align: center;
        line-height: 2rem;
    }
    .form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 26px;
        align-items: center;
    }
    .content__name, .content__review {
        display: flex;
        flex-direction: column;
    }
    .content__name span {
        margin-left: 26px;
        font-size: 14px;
        font-weight: 400;
        color: var(--color-graytext2);
    }
    .content__name input {
        border-radius: 30px;
        padding: 10px 26px;
        font-family: Roboto;
        font-size: 16px;
        font-weight: 300;
        border: 1px solid var(--color-line);
        transition: all 0.1s ease-in-out;
    }
    .content__review span {
        margin-left: 26px;
        font-size: 14px;
        font-weight: 400;
        color: var(--color-graytext2);
    }
    .content__review textarea {
        border-radius: 30px;
        padding: 20px 26px;
        font-size: 16px;
        font-weight: 300;
        font-family: Roboto;
        border: 1px solid var(--color-line);
        transition: all 0.1s ease-in-out;
    }
    .content {
        display: flex;
        flex-direction: column;
        gap: 26px;
        width: 100%;
    }
    .form button  {
        display: flex;
        align-items: center;
        margin: 0;
        border: none;
        border-radius: 30px;
        background-color: var(--color-red);
        padding: 10px 54px;
        color: white;
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 500;
        gap: 8px;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
    }
    .form button:hover{
        background-color: #dd1A21;
        cursor: pointer;
    }
    @media (max-width: 768px){
        .modal__container {
            width: 300px;
        }
    }
</style>