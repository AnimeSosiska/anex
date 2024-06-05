<script setup lang="ts">
    import headerComponent from "../components/header.vue"
    import vk from "../components/icons/vk.vue"
    import tg from "../components/icons/tg.vue"
    import marker from "../components/icons/marker.vue"
    import { shallowRef } from 'vue'
    // @ts-expect-error
    import type { YMap } from '@yandex/ymaps3-types'
    import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapMarker, YandexMapDefaultFeaturesLayer } from 'vue-yandex-maps'
    import { YMapMarkerProps } from '@yandex/ymaps3-types/imperative/YMapMarker';
    import footerComponent from "../components/footer.vue"
    // @ts-expect-error
    const map = shallowRef<null | Ymap>(null)
    const markers: YMapMarkerProps[] = [
        {
            coordinates: [39.747397, 54.618061],
            // @ts-expect-error
            position: 'top left-center'
        }
    ] 
</script>
<template>
    <headerComponent/>
    <main class="main__container">
        <section class="contacts__background">
            <div class="contacts-background__darken">
                <h1 class="contacts__title">Контакты</h1>
                <span class="contacts__subtitle">Свяжитесь с нами и создайте свое незабываемое путешествие</span>
            </div>
        </section>
        <section class="contacts__container">
            <div class="contacts__content">
                <h2 class="content__title">Свяжитесь с нами</h2>
                <div class="contacts__links">
                    <div class="first-column">
                        <span class="first-column__title">Мы в соц сетях</span>
                        <div class="links-list">
                            <a href="https://vk.com/animesosiska" target="_blank"><vk/></a>
                            <a href="http://telegram.me/animeasss" target="_blank"><tg/></a>
                        </div>
                    </div>
                    <span class="line"></span>
                    <div class="second-column">
                        <span class="second-column__title">Контакты</span>
                        <span><a href="tel:+79106370224">+ 7 (910) 637-02-24</a></span>
                        <span><a href="tel:+79966166701">+ 7 (996) 616-67-01</a></span>
                        <span><u><a href="mailto:mikegolikov3838@gmail.com">mikegolikov3838@gmail.com</a></u></span>
                    </div>
                    <span class="line"></span>
                    <div class="third-column">
                        <span class="third-column__title">Адрес</span>
                        <span>Рязань, Улица Есенина, дом 110, (3 этаж)</span>
                    </div>
                </div>
                <yandex-map
                class="map"
                v-model="map"
                :settings="{
                    location: {
                        center: [39.747397, 54.618061],
                        zoom: 17,
                    },
                }"
                width="100%"
                height="378px"

                >
                    <yandex-map-marker
                        v-for="(marker, index) in markers"
                        :key="index"
                        :settings="marker"
                    >
                        <marker class="marker"/>
                    </yandex-map-marker>
                    <yandex-map-default-features-layer/>
                    <yandex-map-default-scheme-layer/>
                </yandex-map>
            </div>
        </section>
    </main>
    <footerComponent/>
</template>
<style scoped>
    .map {
        margin-top: 40px;
    }
    .marker {
        position: relative;
        display: flex;
        transform: translate(-50%,-100%);
        width: 23px;
        height: 28px;
        background-image: url('data:image/svg+xml,<svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.5875 27.0402C11.1407 27.0402 21.0265 16.4778 21.0265 10.7125C21.0265 4.94714 16.3527 0.273438 10.5875 0.273438C4.82214 0.273438 0.148438 4.94714 0.148438 10.7125C0.148438 16.4778 10.0342 27.0402 10.5875 27.0402ZM10.5875 15.9337C13.5105 15.9337 15.8801 13.5641 15.8801 10.6411C15.8801 7.71805 13.5105 5.34848 10.5875 5.34848C7.66446 5.34848 5.29489 7.71805 5.29489 10.6411C5.29489 13.5641 7.66446 15.9337 10.5875 15.9337Z" fill="%23463998"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0.148438 10.7125C0.148438 16.4778 10.0342 27.0402 10.5875 27.0402V15.9337C7.66445 15.9336 5.29489 13.5641 5.29489 10.6411C5.29489 7.71806 7.66445 5.34849 10.5875 5.34848V0.273438C4.82214 0.273438 0.148438 4.94714 0.148438 10.7125Z" fill="%236B5CC8"/></svg>');
    }
    .links-list {
        display: flex;
        gap: 15px;
    }
    .second-column__title {
        margin-bottom: 10px;
    }
    .third-column__title, .second-column__title, .first-column__title {
        font-size: 24px !important;
        font-weight: 500 !important;
    }
    .third-column span, .second-column span, .first-column span {
        font-size: 16px;
        font-weight: 300;
        max-width: 274px;
        text-align: center;
    }
    .third-column {
        text-transform: uppercase;
        display: flex;
        flex-direction: column;
        gap: 27px;
        align-items: center;
    }
    .second-column {
        text-transform: uppercase;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }
    .first-column {
        text-transform: uppercase;
        display: flex;
        flex-direction: column;
        gap: 27px;
        align-items: center;
    }
    .contacts__links {
        display: flex;
        padding: 40px 0;
        align-items: center;
        border-top: 1px solid var(--color-line);
        border-bottom: 1px solid var(--color-line);
    }
    .content__title {
        text-transform: uppercase;
        font-size: 44px;
        font-weight: 500;
        text-align: center;
        margin-bottom: 40px;
    }
    .contacts__content {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        max-width: 1120px;
        width: 100%;
    }
    .contacts__container {
        color: var(--color-black);
        width: 100%;
        padding: 60px 0 140px 0;
    }
    .line {
        width: 1px;
        height: 70px;
        margin: 0 60px;
        /* margin: 40px 0; */
        background-color: var(--color-line);
    }
    .contacts__background {     
        background: url(contactsbg.png);
        background-position: center;
        background-size: cover;
        height: 500px;
    }
    .contacts-background__darken {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.3);
        color: white;
    }
    .contacts__title {
        font-size: 100px;
        font-weight: 800;
        line-height: 135px;
        text-transform: uppercase;
        margin-top: 80px;
        text-align: center;
    }
    .contacts__subtitle {
        font-size: 28px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 80px;
        text-align: center;
        max-width: 740px;
    }
</style>