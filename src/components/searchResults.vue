<script setup lang="ts">
    import { ref, onBeforeMount, onErrorCaptured } from 'vue'
    import type { Ref } from 'vue'
    import searchResultBlock from "./searchResultBlock.vue"
    import hotelsDataService from "../services/hotelsDataService.js"
    
    const props = defineProps([
        "isHot",
        "location"
    ])
    let isHot = props.isHot
    let locationQuery = props.location
    let card = ref()
    // @ts-expect-error
    let hotelId: Ref<array> = ref([])
    // @ts-expect-error
    let stars: Ref<array> = ref([])
    // @ts-expect-error
    let hot: Ref<array> = ref([])
    let cardLength = ref()
    function showResults(data){
        if(data == null) {
            cardLength.value = 0
        } else if(isHot) {
            hotelsDataService.findByLocation(data.value.locationId).then(response => {
                card.value = response.data
                cardLength.value = card.value.length
                for (var i = 0; i < card.value.length; i++){
                    if(card.value[i].hot){
                        stars.value[i] = card.value[i].rating
                        hotelId.value[i] = card.value[i].id
                        hot.value[i] = card.value[i].hot
                    } else {
                        card.value = null
                        cardLength.value = 0
                    }
                }
            })
        } else {
            hotelsDataService.findByLocation(data.value.locationId).then(response => {
                card.value = response.data
                for (var i = 0; i < card.value.length; i++){
                    stars.value[i] = card.value[i].rating
                    hotelId.value[i] = card.value[i].id
                    hot.value[i] = card.value[i].hot
                }
                // console.log(hot.value)
                cardLength.value = card.value.length
                // console.log(cardLength.value)
            })
        }
    }
    onBeforeMount(() => {
        if(locationQuery != undefined){
            console.log(locationQuery)
            hotelsDataService.getAllLocationsByName(locationQuery).then(response => {
                console.log(response.data)
                hotelsDataService.findByLocation(response.data[0].id).then(response => {
                    card.value = response.data
                    for (var i = 0; i < card.value.length; i++){
                        stars.value[i] = card.value[i].rating
                        hotelId.value[i] = card.value[i].id
                        hot.value[i] = card.value[i].hot
                    }
                    // console.log(hot.value)
                    cardLength.value = card.value.length
                    // console.log(cardLength.value)
                })
            })
        } else {
            if(isHot){
                hotelsDataService.findByHot().then(response => {
                    card.value = response.data
                    for (var i = 0; i < card.value.length; i++){
                        stars.value[i] = card.value[i].rating
                        hotelId.value[i] = card.value[i].id
                        hot.value[i] = card.value[i].hot
                    }
                    cardLength.value = card.value.length
                })
            }else {
                hotelsDataService.getAllHotels().then(response => {
                    card.value = response.data
                    for (var i = 0; i < card.value.length; i++){
                        stars.value[i] = card.value[i].rating
                        hotelId.value[i] = card.value[i].id
                        hot.value[i] = card.value[i].hot
                    }
                    cardLength.value = card.value.length
                })
            }
        }
    })
    onErrorCaptured((err) => {
        console.log("PARENT: " + err.message)
    })
    defineExpose({
        showResults
    })
</script>
<template>
    <div class="search__container">
        <div class="search__content">
            <h2 class="search__title-block">
                <span class="search-title">
                    Найденные варианты
                </span>
                <span class="search-amount">
                    ({{cardLength}}<span> предложения</span>)
                </span>
            </h2>
            <div class="search__results">
                <searchResultBlock 
                v-for="(value, index) in card"
                :value="value"
                :key="value.id"
                :index="index"
                :stars="stars"
                :hot="hot"
                />
            </div>
        </div>
    </div>
</template>
<style scoped>
    .search__results {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    .search__container{
        max-width: 1120px;
        margin: 0 auto;
        padding: 100px 48px;
    }
    .search__content {
        display: flex;
        min-height: 150px;
        flex-direction: column;
    }
    .search-title {
        text-transform: uppercase;
        font-size: 44px;
        font-weight: 500;
    }
    .search__title-block {
        margin-bottom: 30px;
    }
    .search-amount {
        font-size: 16px;
        font-weight: 300;
    }
    @media (max-width: 768px){
        .search-title{
            font-size: 28px;
        }
        .search-amount span {
            display: none;
        }
        .search__container{
            padding: 100px 30px;
        }
    }
</style>../services/DataService.js