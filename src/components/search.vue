<script lang="ts">
    import Dropdown from 'v-dropdown'
    import { ref, nextTick } from 'vue'
    import VueDatePicker from '@vuepic/vue-datepicker'
    import '@vuepic/vue-datepicker/dist/main.css'
    import submit from "./icons/submit.vue"
    import hotelsDataService from "../services/hotelsDataService.js"
   
    let searchData = ref({
        locationId: "",
    })
    let locationsData = ref()
    let dropdownTo = ref()

    export default {
        methods: {
            submitFunc() {
                if (dropdownTo.value != undefined) {
                    for (let j = 0; j < locationsData.value.length; j++){
                        if (locationsData.value[j].location == dropdownTo.value){
                            searchData.value.locationId = locationsData.value[j].id
                        } else if(searchData.value.locationId == "") {
                            searchData.value.locationId = ""
                        }
                    }
                } else {
                    searchData.value.locationId = ""
                }
                this.$emit('submitFunc', searchData.value)
            }
        }
    }
</script>
<script setup lang="ts">

    let dropdownToButton = ref(false)
    const ddToInput = ref()
    const props = defineProps([
        "location"
    ])
    const locationQuery = props.location
    // console.log(locationQuery)
    if (locationQuery != undefined) {
        dropdownTo.value = locationQuery
        dropdownToButton.value = true
    }
    hotelsDataService.getAllLocations().then(response => {
        // console.log(response.data)
        locationsData.value = response.data
        // console.log(locationsData)
        for (var i=0; i<response.data.length; i++){
            if(response.data[i].hot){
                // @ts-expect-error
                countriesPopular.value.push(response.data[i].location)
            }else{
                // @ts-expect-error
                countriesAll.value.push(response.data[i].location)
            }
        }
    })

    const date = ref()

    let dropdownFrom = ref('Москва')
    let dropdownAmountButton = ref(false)
    let dropdownFromButton = ref(true)
    let dropdownDateButton = ref(false)
    const ddFromInput = ref()
    const ddAmountInput = ref()
    const ddDateInput = ref()
    const ddFrom = ref()
    const ddTo = ref()
    const ddAmount = ref()

    const childs = ref(0)
    const adults = ref(2)
    
    const countriesPopular = ref([
        // 'Турция',
        // 'Египет',
        // 'Мальдивы',
        // 'ОАЭ',
        // 'Куба',
        // 'Шри-Ланка'
        ]
    )
    const countriesAll = ref([
        // 'Абхазия',
        // 'Азербайджан',
        // 'Армения',
        // 'Беларусь',
        // 'Венесуэла',
        // 'Вьетнам',
        // 'Греция',
        // 'Грузия',
        // 'Доминикана',
        // 'Израиль',
        // 'Индия',
        // 'Индонезия',
        // 'Италия',
        // 'Китай',
        // 'Перу',
        // 'Португалия',
        // 'Чили',
        // 'Япония'
    ]
    )
    const citiesPopular = ref([
        'Екатеринбург',
        'Казань',
        'Москва',
        'Н.Новгород',
        'Самара',
        'С.Петербург'
    ])
    const citiesAll = ref([
        'Абакан',
        'Анапа',
        'Архангельск',
        'Астрахань',
        'Барнаул',
        'Белгород',
        'Благовещенск',
        'Братск',
        'Брянск',
        'Владивосток',
        'Владикавказ',
        'Волгоград',
        'Воронеж',
        'Грозный',
        'Иваново',
        'Ижевск',
        'Иркутск',
        'Калининград',
        'Калуга',
        'Кемерово',
        'Киров',
        'Краснодар',
        'Красноярск'
    ])
    function emptyFrom(){
        // @ts-expect-error
        dropdownFrom = ref()
        ddFrom.value.close()
    }
    function emptyTo(){
        dropdownTo = ref()
        ddTo.value.close()
    }
    function fromChange(){
        // console.log(dropdownFromButton.value)
        if(dropdownFromButton.value && !dropdownFrom.value){
            dropdownFromButton.value = false
            ddFromInput.value.style.height = ""
        }else {
            dropdownFromButton.value = true
            ddFromInput.value.style.height = "24px"
        }
    }
    function toChange(){
        // console.log(ddFrom.toggle)
        if(dropdownToButton.value && !dropdownTo.value){
            dropdownToButton.value = false
            ddToInput.value.style.height = ""
        }else {
            dropdownToButton.value = true
            ddToInput.value.style.height = "24px"
        }
    }
    function AmountChange(){
        if(dropdownAmountButton.value){
            dropdownAmountButton.value = false
            ddAmountInput.value.style.height = ""
        }else {
            dropdownAmountButton.value = true
            ddAmountInput.value.style.height = "24px"
        }
        window.sessionStorage.setItem("people", JSON.stringify({adults: adults.value, childs: childs.value}))
    }
    function dateOpen(){
        dropdownDateButton.value = true
        ddDateInput.value.style.height = "24px"
    }
    async function dateClosed(){
        await nextTick()
        if(!ddDateInput.value.value){
            dropdownDateButton.value = false
            ddDateInput.value.style.height = ""
        }
    }
    function dateOnInput(date:String){
        if(!date){
            dropdownDateButton.value = false
            ddDateInput.value.style.height = ""
        }
        // @ts-expect-error
        window.sessionStorage.setItem("date", date)
    }
    function counter(who:number, func:string, adults:boolean){
        if (func == "subtract"){
            if ((who == 1 && adults) || (who == 0 && !adults)) return who
            else {
                who--
            }
        } else{
            if (who == 10) return who
            who++
        }
        return who
    }
    function submitFrom(){
        ddFrom.value.close()
    }
    function submitTo(){
        ddTo.value.close()
    }
    function submitAmount(){
        ddAmount.value.close()
    }

</script>

<template>
    <div class="search__container">
        <form class="search__form" @submit.prevent>
            <Dropdown customContainerClass="dropdown-from__container" class="dropdown-from" ref="ddFrom" @visible-change="fromChange()">
                <template #trigger>
                    <button class="dropdown-from__button" :class="{empty: !dropdownFromButton}">Откуда</button>
                    <span class="dropdown-from__input" ref="ddFromInput">{{ dropdownFrom }}</span>
                </template>
                <div class="dropdown-from__content dropdown">
                    <div class="dropdown__countries">
                        <div class="dropdown__countries-popular">
                            <span>Популярные</span>
                            <ul>
                                <li v-for="item in citiesPopular">
                                    <input type="radio" name="city" :value="item" v-model="dropdownFrom">{{ item }}
                                </li>
                            </ul>
                        </div>
                        <div class="dropdown__countries-all">
                            <span>Все города</span>
                            <ul>
                                <li v-for="item in citiesAll">
                                    <input type="radio" name="city2" :value="item" v-model="dropdownFrom">{{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <span></span>
                    <div class="dropdown__buttons">
                        <button @click="emptyFrom()">Очистить</button>
                        <button @click="submitFrom()">Выбрать<submit/></button>
                    </div>
                </div>
            </Dropdown>
            <span class="line"></span>
            <Dropdown customContainerClass="dropdown-from__container" class="dropdown-from" ref="ddTo" @visible-change="toChange()"> 
                <template #trigger>
                    <button class="dropdown-from__button" :class="{empty: !dropdownToButton}">Куда</button>
                    <span class="dropdown-from__input" ref="ddToInput">{{ dropdownTo }}</span>
                </template>
                <div class="dropdown-from__content dropdown">
                    <div class="dropdown__countries">
                        <div class="dropdown__countries-popular">
                            <span>Популярные</span>
                            <ul>
                                <li v-for="item in countriesPopular">
                                    <input type="radio" name="country" :value="item" v-model="dropdownTo">{{ item }}
                                </li>
                            </ul>
                        </div>
                        <div class="dropdown__countries-all">
                            <span>Все страны</span>
                            <ul>
                                <li v-for="item in countriesAll">
                                    <input type="radio" name="country2" :value="item" v-model="dropdownTo">{{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <span></span>
                    <div class="dropdown__buttons">
                        <button @click="emptyTo()">Очистить</button>
                        <button @click="submitTo()">Выбрать<submit/></button>
                    </div>
                </div>
            </Dropdown>
            <span class="line"></span>
            <VueDatePicker 
                @open="dateOpen"
                @update:model-value="dateOnInput"
                @closed="dateClosed"
                v-model="date"
                :enable-time-picker="false" 
                position="left" 
                :offset="22" 
                :min-date="new Date()" 
                hide-input-icon 
                auto-apply
                :clearable="false"
                
            >
                <template #dp-input="{ value }">
                    <div class="input_wrap">
                        <p :class="{empty: !dropdownDateButton}" class="dateButton">Вылет</p>
                        <input type="text" ref="ddDateInput" class="dateInput dropdown-from__input" :value="value">
                    </div>
                </template>
            </VueDatePicker>
            <span class="line"></span>
            <Dropdown customContainerClass="dropdown-amount__container" class="dropdown-from" ref="ddAmount" @visible-change="AmountChange()"> 
                <template #trigger >
                    <button class="dropdown-from__button">Туристы</button>
                    <span class="dropdown-from__input" ref="ddAmountInput">{{adults}} + {{childs}}</span>
                </template>
                <div class="dropdown-from__content dropdown">
                    <div class="dropdown__counter">
                        <div class="adults counter-inner">
                            <span>Взрослые</span>
                            <div class="counter__nums">
                                <button @click="adults = counter(adults, 'subtract', true)" class="counter__button">-</button>
                                <span>{{ adults }}</span>
                                <button @click="adults = counter(adults, 'add', true)" class="counter__button">+</button>
                            </div>
                        </div>
                        <div class="kids counter-inner">
                            <span>Дети (0-17 лет)</span>
                            <div class="counter__nums">
                                <button @click="childs = counter(childs, 'subtract', false)" class="counter__button">-</button>
                                <span>{{ childs }}</span>
                                <button @click="childs = counter(childs, 'add', false)" class="counter__button">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown__counter-bottom">
                        <span></span>
                        <div class="dropdown__buttons dropdown__counter-button">
                            <button @click="submitAmount()">Выбрать<submit/></button>
                        </div>
                    </div>
                </div>
            </Dropdown>
            <div class="search-button__container" >
                <button type="submit" class="search-button__submit" @click="submitFunc">
                    <span>Подобрать</span>
                    <submit/>
                </button>
            </div>
        </form>
    </div>
</template>
<style>
    :root {
        --dp-border-radius: 30px;
        --dp-menu-padding: 20px;
        
    }
    .dropdown-from__container {
        border-radius: 30px !important;
        box-shadow: 0px 4px 20px 0px rgba(43, 43, 51, 0.20) !important;
        width: 384px !important;
        height: 470px;
    }
    .dropdown-amount__container{
        border-radius: 30px !important;
        box-shadow: 0px 4px 20px 0px rgba(43, 43, 51, 0.20) !important;
        width: 352px !important;
        height: 224px;
    }

    .dp__main {
        width: fit-content;
        
    }
    .dp__main:hover{
        cursor: pointer;
    }
    .dp__arrow_bottom, .dp__arrow_top {
        display: none;
    }
    @media(max-width:1024px){
        .dropdown-from__container, .dropdown-amount__container {
            width: 100% !important;
            left: 0 !important;
            top: 130px !important;
            /* bottom: 0 !important; */
            height: calc(100% - 130px) !important;
            position: fixed !important;
        }
        .dropdown-from__content {
            height: calc(100% - 70px) !important;
        }
        .dp__main {
            width: 100%;
        }
        .dropdown-from{
            height: 60px !important;
        }
    }
</style>
<style scoped>
    .dropdown__counter-bottom {
        display: flex;
        flex-direction: column;
    }
    .dropdown__counter-bottom > span{
        width: 100%;
        border: 1px solid var(--color-line);
        margin: 20px 0;
    }
    .search-button__submit{
        background-color: var(--color-red);
        border: 0;
        border-radius: 30px;
        width: 168px;
        height: 40px;
        text-transform: uppercase;
        color: var(--color-white);
        font-weight: 500;
        font-size: 16px;
        transition: all 0.1s ease-in-out;
    }
    .search-button__submit:hover{
        background-color: #dd1A21;
        cursor: pointer;
    }
    .search-button__submit span{
        margin-right: 8px;
    }
    .search-button__container {
        margin-left: auto;
        margin-right: 12px;
    }
    .counter__button {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid var(--color-line);
        background-color: white;
        text-align: center;
        font-size: 20px;
        transition: all 0.1s ease-in-out;
    }
    .counter__button:hover {
        background-color: var(--color-graybg);
    }
    .counter__button:active {
        background-color: white !important;
    }
    .counter__nums{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 103px;
    }
    .counter-inner{
        display: flex;
        justify-content: space-between;
    }
    .dropdown__counter{
        font-weight: 400;
        color: var(--color-graytext2);
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .dateButton {
        /* width: 100%; */
        /* height: 100%; */
        border: 0;
        padding: 0;
        /* margin-bottom: 6px; */
        height: 14px;
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 1.5;
        font-weight: 400; 
        color: var(--color-graytext);
        font-family: "Roboto", "Chandra", "Millanova", "Rasfire";
    }
    .input_wrap{
        width: 100px;
        display: flex;
        flex-direction: column;
        /* gap: 5px; */
        margin-left: 28px;
        text-align: left;
    }
    .dateInput {
        font-family: inherit;
        border: none;
        width: 100%;
        height: 0;
        /* margin-bottom: 10px; */
    }
    .dateInput:focus{
        outline: none;
        caret-color: white;
    }
    .dateInput:hover{
        cursor: pointer;
    }
    .empty {
        text-transform: uppercase;
        font-size: 16px !important;
        height: 18px;
    }
    .line {
        height: 38px;
        border: 1px solid var(--color-line);
        margin-left: 40px;
    }
    .search__container{
        max-width: 860px;
        width: 100%;
        height: 64px;
        background-color: var(--color-white);
        border-radius: 30px;
    }
    .search__form{
        display: flex;
        height: 100%;
        align-items: center;
    }
    .dropdown-from{
        margin-left: 28px;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        text-align: left;
    }
    .dropdown-from:hover{
        cursor: pointer;
    }
    .dropdown-from__content{
        width: 100%;
        height: 100%;
        display: flex;
        /* justify-content: end; */
        flex-direction: column;
        margin: 40px 40px 30px 40px;
    }
    .dropdown > span{
        width: 100%;
        border: 1px solid var(--color-line);
        margin: 20px 0;
    }
    .dropdown__buttons {
        display: flex;
        justify-content: space-between;
    }
    .dropdown__buttons > button{
        font-weight: 500;
        font-size: 16px;
        color: var(--color-graytext);
        background: none;
        border: none;
        padding: 10px 0;
        width: 72px;
        transition: all 0.1s ease-out;
    }
    .dropdown__buttons > button:hover{
        cursor: pointer;
        opacity: 0.8;
    }
    .dropdown__buttons > button:last-of-type {
        background-color: var(--color-black);
        padding: 10px 26px;
        width: 144px;
        border-radius: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: var(--color-white);
        text-transform: uppercase;
    }
    .dropdown__counter-button {
        justify-content: center;
    }
    .dropdown-from__button{
        text-align: inherit;
        /* height: 100%; */
        background: none;
        border: none;
        font-weight: 400;
        font-size: 12px;
        color: var(--color-graytext);
        pointer-events: none;
    }
    .dropdown-from__input{
        text-align: inherit;
        text-transform: uppercase;
        color: var(--color-black);
        font-size: 16px;
        font-weight: 500;
        /* width: 100%; */
    }
    .dropdown__countries{
        display: flex;
        max-height: 340px;
        /* margin-bottom: auto; */
    }
    .dropdown__countries-popular ul, .dropdown__countries-all ul{
        display: flex;
        height: 300px;
        flex-direction: column;
        gap: 13px;
    }
    .dropdown__countries-popular, .dropdown__countries-all{
        display: flex;
        flex-direction: column;
        flex: 50% 0 0;
    }
    .dropdown__countries-all{
        overflow: auto;
    }
    .dropdown__countries-all ul{
        overflow-y: scroll;
    }
    .dropdown__countries-popular li, .dropdown__countries-all li{
        list-style-type: none;
        color: var(--color-black);
        font-size: 14px;
        font-weight: 300;
        /* line-height: 39px; */
        display: flex;
        align-items: center;
    }
    .dropdown__countries-popular input, .dropdown__countries-all input {
        margin-right: 10px;
        width: 26px;
        height: 26px;
        appearance: none;
        border: 2px solid var(--color-line);
        background-image: url(/checkedBox.svg);
        background-position: center center;
        /* background-size: 0.7; */
        background-repeat: no-repeat;
        /* opacity: 0; */
        border-radius: 50%;
        transition: all 0.1s ease-in-out;
    }
    .dropdown__countries-popular input:hover, .dropdown__countries-all input:hover {
        cursor: pointer;
    }
    .dropdown__countries-popular input:checked, .dropdown__countries-all input:checked{
        background-color: #463998;
        border-color: #463998;
    }
    .dropdown__countries-popular > span, .dropdown__countries-all > span{
        color: var(--color-black);
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 7px;
    }
    ::-webkit-scrollbar{
        width: 4px;
    }
    ::-webkit-scrollbar-track{
        background: none;
    }
    ::-webkit-scrollbar-thumb{
        background-color: var(--color-graytext);
        border-radius: 4px;
    }
    @media (max-width: 1024px){
        .search__form {
            display: flex;
            flex-direction: column;
            align-items: start;
        }
        .dropdown-from {
            width: calc(100% - 28px);
        }
        .search__container{
            height: 320px;
            max-width: 90%;
            margin: 0 30px;
        }
        .search-button__container{
            margin-top: auto;
            width: 100%;
        }
        .search-button__submit{
            width: calc(100% - 56px);
            margin: auto 28px 16px 28px;
            height: 40px;
            /* width: 100%; */
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .line {
            height: 1px;
            width: 93%;
            margin: 0 28px 0 auto;
        }
        .dropdown__counter-bottom{
            margin-top: auto;
        }
        .input_wrap {
            height: 60px;
            justify-content: center;
            width: calc(100% - 28px);
        }
    }
</style>