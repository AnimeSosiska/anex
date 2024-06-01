<script lang="ts">
    export default {
        emits: [
            "closeFunc"
        ],
        methods: {
            closeFunc() {
                this.$emit('closeFunc')
            }
    }
}
</script>
<script setup lang="ts">
    import check from "./icons/check.vue"

</script>
<template>
    <div class="modal__background" @click="closeFunc"></div>
    <div class="modal__container">
        <div class="modal__content">
            <check/>
            <span>
                Отзыв успешно <i>отправлен</i>
            </span>
        </div>
    </div>
</template>
<style scoped>

    .modal__background {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #00000030;
        z-index: 998;
    }
    .modal__container {
        position: fixed;
        z-index: 999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: 1s linear;
        width: fit-content;
    }
    .modal__content {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 24px 45px 40px 45px;
    }
    .modal__content span {
        color: var(--color-black);
        font-size: 23px;
        font-weight: 400;
        width: 196px;
        text-align: center;
        text-transform: uppercase;
    }
</style>