<script setup lang="ts">
    import headerComponent from "../components/header.vue"
    import footerComponent from "../components/footer.vue"
</script>

<template>
    <headerComponent/>
    <main class="main__container">
        <section class="priority__background">
            <div class="priority-background__darken">
                <h1 class="priority__title">Anex Priority</h1>
                <span class="priority__subtitle">Мир привилегий Anex Priority</span>
            </div>
        </section>
        <section class="priority__container">
            <h2 class="content__title">Priority</h2>
            <div class="priority__content">
                <span class="content__text">
                    <div class="content-text__firstline">
                        <span>Мы</span>
                        <p>
                            собрали эксклюзивные услуги, опыт, перфекционизм и объединили их в одну концепцию
                            <b>Anex Priority</b>.
                        </p>
                    </div>
                    <p>
                        Мы являемся экспертами в области первоклассного туризма. Лучшими становятся среди лучших.
                    </p>
                    <p>
                        Учитываем ваши интересы и ставим их на первое место. Берем все заботы на себя. 
                    </p>
                    <p>
                        Будьте уверены, что каждая деталь, начиная от индивидуального ведения заявки до сопровождения гостей, будет учтена.
                        А еще вас ждет специально разработанная система привилегий – довольными останутся не только клиенты, но и вы сами.
                    </p>
                </span>
                <div class="priority__image">
                </div>
            </div>
        </section>
    </main>
    <footerComponent/>
</template>

<style scoped>
    .priority__image {
        width: 100%;
        max-width: 544px;
        height: 345px;
        background: url(priority.png);
        background-position: start;
        background-size: cover;
    }
    .content-text__firstline span {
        font-family: "Rasfire Regular Personal Use";
        float: left;
        font-size: 85px;
        text-transform: uppercase;
        line-height: 5.5rem;
    }
    .content__text {
        max-width: 485px;
        font-size: 16px;
        font-weight: 300;
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-left: 50px;
    }
    .content__title {
        text-transform: uppercase;
        font-size: 44px;
        font-weight: 500;
        margin: 60px 0 0 50px;
        align-self: start;
    }
    .priority__content{
        color: var(--color-black);
        display: flex;
        justify-content: space-between;
        max-width: 1120px;
        width: 100%;
    }
    .priority__container {
        display: flex;
        flex-direction: column;
        gap: 35px;
        /* margin: 60px 0 0 50px; */
        /* margin-bottom: 145px; */
        align-items: center;
        max-width: 1120px;
        margin: 0 auto 145px auto;
    }
    .priority__background {
        width: 100%;
        height: 500px;
        background: url(prioritybg.png);
        background-position: center;
        background-size: cover;
    }
    .priority-background__darken {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.22);
        color: white;
    }
    .priority__title {
        text-transform: uppercase;
        font-size: 100px;
        font-weight: 800;
        text-align: center;
    }
    .priority__subtitle {
        text-transform: uppercase;
        font-size: 28px;
        font-weight: 400;
        text-align: center;
    }
    @media (max-width: 1024px){
        .priority__content {
            flex-direction: column;
        }
        .content__text {
            max-width: 100%;
            margin: 0 30px 0 30px;
        }
        .priority__image {
            margin-left: 30px;
            background-position: center;
        }
        .content-text__firstline span {
            font-size: 52px;
            line-height: 3rem;
        }
        .content__title {
            margin: 40px 0 0 30px;
        }
        .priority__title {
            font-size: 54px;
        }
    }
    @media (max-width: 768px) {
        .priority__image {
            background-position: center;
            margin: 0;
        }
    }
</style>