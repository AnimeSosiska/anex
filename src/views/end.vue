<script lang="ts" setup>
    import headerComponent from "../components/header.vue"
    import footerComponent from "../components/footer.vue"
</script>
<template>
    <headerComponent/>
    <main class="main__container">
        <div class="main__content">
            <div class="text">
                <span class="success">Форма отправлена</span>
                <span class="small">Наш менеджер свяжется с вами в течении суток</span>
            </div>
        </div>
    </main>
    <footerComponent/>
</template>
<style scoped>
    .main__container {
        padding-top: 85px;
        width: 100%;
        height: 100vh;
    }
    .main__content {
        max-width: 1120px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        transform: translateY(-50%)

    }
    .success {
        font-size: 50px;
        font-weight: 500;
        color: var(--color-black);
        text-transform: uppercase;
    }
    .small {
        font-size: 29px;
        font-weight: 400;
        color: var(--color-black);
        text-transform: uppercase;
    }
</style>