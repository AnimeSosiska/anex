<script setup lang="ts">
    import headerComponent from "../components/header.vue"
    import footerComponent from "../components/footer.vue"
</script>
<template>
    <headerComponent/>
    <main class="main__container">
        <section class="about__background">
            <div class="about-background__darken">
                <h1 class="about__title">О нас</h1>
                <span class="about__subtitle">Наши история и ценности: <br/> Ваш надежный проводник в мире путешествий</span>
            </div>
        </section>
        <section class="about__container">
            <div class="about__content-top">
                <span class="content__text-top">
                    <div class="content-text__firstline">
                        <span>Мы</span>
                        <p>
                            — команда профессионалов, влюбленных в искусство путешествий. Наша история началась с мечты о том, чтобы сделать каждое путешествие незабываемым, каждое приключение уникальным.
                        </p>
                    </div>
                    <p>
                        Наша миссия — сделать путешествия доступными и незабываемыми. Мы предлагаем вам не просто туры, а волшебные истории, которые будут жить в вашем сердце навсегда. Независимо от того, ищете ли вы релакс на пляже, культурные изыски или экстремальные приключения, мы создадим для вас оптимальное путешествие, подстроенное под ваши уникальные желания.
                    </p>
                </span>
                <div class="about__image-top">
                </div>
            </div>
            <div class="about__content-bottom">
                <div class="about__image-bottom">
                </div>
                <span class="content__text-bottom">
                    <p>
                        Мы гордимся нашей командой опытных специалистов, каждый из которых разделяет страсть к туризму и стремление сделать ваше путешествие незабываемым. Мы внимательно следим за последними тенденциями в индустрии, чтобы предложить вам только лучшие и самые актуальные варианты.
                    </p>
                    <p>
                        Присоединяйтесь к нам в этом захватывающем путешествии! Мы готовы подарить вам моменты радости, вдохновения и удивления в каждом уголке нашего удивительного мира.
                    </p>
                </span>
            </div>
        </section>
    </main>
    <footerComponent/>
</template>
<style scoped>
    .about__content-top{
        color: var(--color-black);
        display: flex;
        gap: 50px;
        /* justify-content: space-between; */
        max-width: 1120px;
        width: 100%;
    }
    .about__content-bottom{
        color: var(--color-black);
        display: flex;
        gap: 50px;
        /* justify-content: space-between; */
        max-width: 1120px;
        width: 100%;
    }
    .about__container {
        display: flex;
        flex-direction: column;
        gap: 35px;
        /* margin: 60px 0 0 50px; */
        margin: 80px 0 145px 0;
        align-items: center;
    }
    .about__image-top {
        width: 100%;
        max-width: 544px;
        height: 345px;
        background: url(about1.png);
        background-position: right;
        background-size: cover;
        border-radius: 30px;
        margin-right: 50px;
    }
    .about__image-bottom {
        width: 100%;
        max-width: 352px;
        height: 256px;
        background: url(about2.png);
        background-position: center;
        background-size: cover;
        border-radius: 30px;
        margin-left: 50px;
    }
    .content-text__firstline span {
        font-family: "Rasfire Regular Personal Use";
        float: left;
        font-size: 85px;
        text-transform: uppercase;
        line-height: 5.5rem;
    }
    .content__text-top {
        max-width: 485px;
        font-size: 16px;
        font-weight: 300;
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-left: 50px;
    }
    .content__text-bottom {
        max-width: 485px;
        font-size: 16px;
        font-weight: 300;
        display: flex;
        gap: 20px;
        margin-right: 50px;
    }
    .content__text-bottom p {
        height: 156px;
        width: 256px;
    }
    .content__text-bottom > p{
        height: 256px;
    }
    .content__title {
        text-transform: uppercase;
        font-size: 44px;
        font-weight: 500;
        margin: 60px 0 0 50px;
    }
    .about__background {
        background: url(paymentbg.png);
        background-position: center;
        background-size: cover;
        height: 500px;
    }
    .about-background__darken {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.22);
        color: white;
    }
    .about__title {
        font-size: 100px;
        font-weight: 800;
        line-height: 135px;
        text-transform: uppercase;
        margin-top: 80px;
        text-align: center;
    }
    .about__subtitle {
        font-size: 28px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 80px;
        text-align: center;
        max-width: 740px;
    }
    @media (max-width: 1023px){
        .about__container {
            margin: 60px 30px 80px 30px;
        }
        .content__text {
            /* max-width: 100%; */
            margin: 0 30px 0 30px;
        }
        .content-text__firstline span {
            font-size: 52px;
            line-height: 3rem;
        }
        .content__title {
            margin: 40px 0 0 30px;
        }
        .about__title {
            font-size: 54px;
        }
        .about__subtitle {
            font-size: 24px;
        }
        .content__text-top {
            max-width: 544px;
        }
        .content__text-bottom {
            flex-direction: column;
            max-width: 544px;
        }
        .content__text-bottom p {
            width: 100%;
            height: 100%;
        }
        .content__text-top, .about__image-top, .content__text-bottom, .about__image-bottom {
            margin: 0;
        }
        .about__image-top {
            max-width: 544px;
            height: 220px;
        }
        .about__content-top {
            align-items: center;
            flex-direction: column;
        }
        .about__content-bottom {
            align-items: center;
            flex-direction: column-reverse;
        }
        .about__image-bottom {
            max-width: 544px;
            height: 220px;
        }
    }
    @media (max-width: 768px) {
        .about__image {
            background-position: center;
            margin: 0;
        }
    }
</style>