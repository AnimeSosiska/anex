<script setup lang="ts">
    import hotelsDataService from "../services/hotelsDataService.js"
    import headerComponent from "../components/header.vue"
    import footerComponent from "../components/footer.vue"
    import phone from "../components/icons/phone.vue"
    import submit from "../components/icons/submit.vue"
    import Dropdown from 'v-dropdown'
    import VueDatePicker from '@vuepic/vue-datepicker'
    import '@vuepic/vue-datepicker/dist/main.css'
    import { useRoute } from "vue-router"
    import { ref, nextTick, onMounted, onBeforeMount } from 'vue'

    function arrayBufferToBase64(buffer){
        let binary = ''
        let bytes = new Uint8Array(buffer.data)
        let len = bytes.byteLength
        for(let i = 0; i < len; i++){
            binary += String.fromCharCode(bytes[i])
        }
        return window.btoa(binary)
    }

    const router = useRoute()

    const date = ref()

    const ddAmount = ref()
    const ddAmountInput = ref()
    const ddRoom = ref()
    const ddRoomInput = ref()
    const ddDateInput = ref()
    const people = ref({
        adults: 2,
        childs: 0
    })
    const ddroom = ref()
    const ddroomPrice = ref(0)
    const dropdownRoom = ref("Комфортный номер")
    const dropdownroomAll = ref([
        {
            name: "Комфортный номер",
            price: "в цене",
            num: 0
        },
        {
            name: "Премиум номер",
            price: "+ 22000 ₽",
            num: 22000
        },
        {
            name: "Королевский номер",
            price: "+ 40000 ₽",
            num: 44000
        }
    ])

    let dropdownAmountButton = ref(false)
    let dropdownRoomButton = ref(false)
    let dropdownDateButton = ref(false)
    let adv = ref()
    let hotelData = ref({
        id: '',
        hotelName: '',
        hot: '',
        image: '',
        location: '',
        price: 0,
        rating: ''
    })
    let img = ref()
    
    hotelsDataService.getHotelById(router.query.id).then(response => {
        hotelData.value = response.data
        sessionStorage.setItem("hotelName", hotelData.value.hotelName)
        sessionStorage.setItem("id", hotelData.value.id)
        sessionStorage.setItem("rating", hotelData.value.rating)
        sessionStorage.setItem('location', hotelData.value.location)

        img.value = arrayBufferToBase64(hotelData.value.image)
        sessionStorage.setItem("image", img.value)
    })
    hotelsDataService.getAdv(router.query.id).then(response => {
        adv.value = response.data
    })

    function AmountChange(){
        if(dropdownAmountButton.value){
            dropdownAmountButton.value = false
        }else {
            dropdownAmountButton.value = true
        }
        window.sessionStorage.setItem("people", JSON.stringify({adults: people.value.adults, childs: people.value.childs}))
    }
    function RoomChange(){
        if(dropdownRoomButton.value){
            dropdownRoomButton.value = false
        }else {
            dropdownRoomButton.value = true
        }
        for (let i = 0; i < ddroom.value.length; i++) {
            if (ddroom.value[i].value == dropdownRoom.value) {
                ddroomPrice.value = dropdownroomAll.value[i].num
                sessionStorage.setItem("room", dropdownroomAll.value[i].name)
            }
        }
    }
    function dateOpen(){
        dropdownDateButton.value = true
    }
    async function dateClosed(){
        await nextTick()
        if(!ddDateInput.value.value){
            dropdownDateButton.value = false
            ddDateInput.value.style.height = ""
        } else {
            sessionStorage.setItem('date', ddDateInput.value.value)
        }
    }
    function dateOnInput(date:String){
        if(!date){
            dropdownDateButton.value = false
            ddDateInput.value.style.height = ""
        }
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
    function submitAmount(){
        ddAmount.value.close()
    }
    function submitRoom(){
        ddRoom.value.close()
        
    }
    function priceSet(){
        let price = hotelData.value.price*people.value.adults+hotelData.value.price*people.value.childs/2+ddroomPrice.value
        sessionStorage.setItem('price', price.toString())
    }
    onMounted(() => {
        if (sessionStorage.date != null){
            date.value = sessionStorage.date
        } else {
            date.value = new Date
        }
        // @ts-expect-error
        sessionStorage.setItem('date', new Date())
        sessionStorage.setItem('room', dropdownroomAll.value[0].name)
    })
    onBeforeMount(() => {
        if (sessionStorage.people != undefined){
            let session = JSON.parse(sessionStorage.people)
            people.value.adults = session.adults
            people.value.childs = session.childs
        } else {
            people.value.adults = 2
            people.value.childs = 0
            sessionStorage.setItem('people', JSON.stringify({adults: people.value.adults, childs: people.value.childs}))
        }
    })
</script>
<template>
    <headerComponent/>
    <main class="main__container">
        <div class="main__content">
            <section class="main__info">
                <div class="main__info-image" :style="{ backgroundImage: `url('data:image/png;base64,` + img + `')`}"></div>
                <div class="main__info-form">
                    <h3 class="main__info-title">{{hotelData.hotelName}}</h3>
                    <div class="main__info-price">
                        <b>{{hotelData.price}} ₽</b><span> / за 1 человека</span>
                    </div>
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
                            <div class="input__wrap">
                                <p :class="{empty: !dropdownDateButton}" class="dateButton">Вылет: </p>
                                <input type="text" ref="ddDateInput" class="dateInput dropdown-from__input" :value="value">
                            </div>
                        </template>
                    </VueDatePicker>
                    <Dropdown customContainerClass="dropdown-amount__container" class="dropdown-from" ref="ddAmount" @visible-change="AmountChange()"> 
                        <template #trigger>
                            <span class="dropdown-from__button">Туристы: </span>
                            <span class="dropdown-from__input" ref="ddAmountInput">{{people.adults}} + {{people.childs}}</span>
                        </template>
                        <div class="dropdown-from__content dropdown">
                            <div class="dropdown__counter">
                                <div class="adults counter-inner">
                                    <span>Взрослые</span>
                                    <div class="counter__nums">
                                        <button @click="people.adults = counter(people.adults, 'subtract', true)" class="counter__button">-</button>
                                        <span>{{ people.adults }}</span>
                                        <button @click="people.adults = counter(people.adults, 'add', true)" class="counter__button">+</button>
                                    </div>
                                </div>
                                <div class="kids counter-inner">
                                    <span>Дети (0-17 лет)</span>
                                    <div class="counter__nums">
                                        <button @click="people.childs = counter(people.childs, 'subtract', false)" class="counter__button">-</button>
                                        <span>{{ people.childs }}</span>
                                        <button @click="people.childs = counter(people.childs, 'add', false)" class="counter__button">+</button>
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
                    <Dropdown customContainerClass="dropdown-room__container" class="dropdown-from" ref="ddRoom" @visible-change="RoomChange()">
                        <template #trigger>
                            <span class="dropdown-from__button">Номер: </span>
                            <span class="dropdown-from__input" ref="ddRoomInput">{{dropdownRoom}}</span>
                        </template>
                        <div class="dropdown-from__content dropdown">
                            <div class="dropdown__room">
                                <li v-for="item in dropdownroomAll">
                                    <div class="room__container">
                                        <div class="room-name">
                                            <input type="radio" name="room" :value="item.name" v-model="dropdownRoom" ref="ddroom">{{ item.name }}
                                        </div>
                                        <span class="room-price">
                                            {{ item.price }}
                                        </span>
                                    </div>
                                    
                                </li>
                            </div>
                            <div class="dropdown__counter-bottom">
                                <span></span>
                                <div class="dropdown__buttons dropdown__counter-button">
                                    <button @click="submitRoom()">Выбрать<submit/></button>
                                </div>
                            </div>
                        </div>
                    </Dropdown>
                    <div class="main__info-submit">
                        <span class="price">Итог: {{ hotelData.price*people.adults+hotelData.price*people.childs/2+ddroomPrice }} ₽</span>
                        <RouterLink to="/booking/data" class="submitButton" @click="priceSet">Оставить заявку<submit/></RouterLink>
                    </div>
                </div>
            </section>
            <section class="main__about">
                <h2 class="about-title">Почему стоит выбрать этот отель</h2>
                <li class="advantages__list" v-for="item in adv">
                        {{item.text}}
                </li>
            </section>
            <section class="questions__container">
                <div class="questions__content">
                    <span class="questions-title">У вас есть вопросы по поводу предложения? Проконсультируйтесь с нашим консультантом</span>
                    <button class="questions-button">
                        <phone/>
                        <span>Заказать звонок</span>
                    </button>
                </div>
            </section>
        </div>
    </main>
    <footerComponent/>
</template>
<style>
    :root {
        --dp-border-radius: 30px;
        --dp-menu-padding: 20px;
        
    }
    .dropdown-amount__container{
        border-radius: 30px !important;
        box-shadow: 0px 4px 20px 0px rgba(43, 43, 51, 0.20) !important;
        width: 352px !important;
        height: 224px;
        border: none !important;
    }
    .dropdown-room__container {
        border-radius: 30px !important;
        box-shadow: 0px 4px 20px 0px rgba(43, 43, 51, 0.20) !important;
        width: 448px !important;
        height: 263px;
        border: none !important;
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
        .dp__input_wrap {
            height: 60px;
            justify-content: center;
            width: calc(100% - 28px);
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
    .main__container {
        padding: 140px 48px 0 48px;
    }
    .main__content {
        margin: 0 auto;
        max-width: 1120px;
        height: 100%;
    }
    .main__info {
        display: flex;
        flex-direction: row;
        gap: 32px;
        margin-bottom: 30px;
    }
    .main__info-image {
        width: 100%;
        max-width: 736px;
        height: 480px;
        background-position: center;
        background-size: cover;
        border-radius: 30px;
    }
    .main__info-form {
        width: 100%;
        max-width: 352px;
        height: 100%;
        padding: 30px;
        border-radius: 30px;
        box-shadow: 0px 4px 20px 0px rgba(43, 43, 51, 0.2);
        color: var(--color-black);
    }
    .main__info-title {
        font-size: 20px;
        font-weight: 800;
        margin-bottom: 10px;
        color: #2b2b33;
    }
    .main__info-price {
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 30px;
    }
    .main__info-price b {
        font-size: 18px;
        font-weight: 600;
    }
    .dropdown-from {
        display: flex;
        width: 100%;
        gap: 10px;
        padding: 16px 0;
        border-top: 1px solid var(--color-line);
    }
    .dropdown-from:hover{
        cursor: pointer;
    }
    .dropdown-from__input{
        text-align: inherit;
        /* text-transform: uppercase; */
        color: var(--color-black);
        font-size: 16px;
        font-weight: 500;
        /* width: 100%; */
    }
    .dropdown-from__content {
        padding: 30px 40px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
    }
    .dropdown-from__button {
        font-size: 16px;
        font-weight: 400;
        color: var(--color-black);
    }
    .dateButton {
        /* width: 100%; */
        /* height: 100%; */
        border: 0;
        padding: 0;
        /* margin-bottom: 6px; */
        /* height: 14px; */
        /* margin-bottom: 10px; */
        font-size: 16px;
        font-weight: 400; 
        color: var(--color-black);
        font-family: "Roboto", "Chandra", "Millanova", "Rasfire";
    }
    .input__wrap{
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 10px;
        margin-left: 0;
        padding: 16px 0;
        text-align: left;
    }
    .dateInput {
        font-family: inherit;
        border: none;
        width: 100%;
        /* margin-bottom: 10px; */
    }
    .dateInput:focus{
        outline: none;
        caret-color: white;
    }
    .dateInput:hover{
        cursor: pointer;
    }
    .dropdown__counter {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .counter-inner {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 400;
        color: var(--color-graytext2);
    }
    .counter__nums {
        font-size: 18px;
        font-weight: 500;
        color: var(--color-black);
        display: flex;
        flex-direction: row;
        gap: 15px;
    }
    .counter__button {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid var(--color-line);
        background-color: white;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
    }
    .counter__button:hover {
        background-color: var(--color-graybg);
    }
    .counter__button:active {
        background-color: white !important;
    }
    .dropdown__buttons {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid var(--color-line);
        padding-top: 20px;
    }
    .dropdown__buttons > button:hover{
        cursor: pointer;
        opacity: 0.8;
    }
    .dropdown__buttons > button {
        background-color: var(--color-black);
        border: none;
        font-size: 16px;
        font-weight: 500;
        padding: 10px 26px;
        width: 144px;
        margin: 0 auto;
        border-radius: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: var(--color-white);
        text-transform: uppercase;
        transition: all 0.1s ease-out;
    }
    .dropdown__room {
        display: flex;
        flex-direction: column;
        gap: 13px;
    }
    .dropdown__room li {
        list-style: none;
    }
    .room__container{
        display: flex;
        justify-content: space-between;
        color: var(--color-black);
        font-size: 14px;
        font-weight: 400;
    }
    .room-name{
        display: flex;
        flex-direction: row;
        gap: 10px;
        font-size: 16px;
        font-weight: 600;
    }
    .dropdown__room input {
        width: 26px;
        height: 26px;
        accent-color: var(--color-purple);
    }
    .main__info-submit {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-top: 30px;
        align-items: center;
    }
    .price {
        text-transform: uppercase;
        font-size: 22px;
        font-weight: 600;
        color: var(--color-black);
    }
    .submitButton {
        display: flex;
        gap: 7px;
        align-items: center;
        background-color: var(--color-red);
        color: white;
        border-radius: 30px;
        font-size: 16px;
        font-weight: 500;
        padding: 10px 30px;
        border: none;
        text-transform: uppercase;
        transition: all 0.1s ease-in-out;
    }
    .submitButton:hover {
        background-color: #dd1A21;
        cursor: pointer;
    }
    .main__about {
        display: flex;
        flex-direction: column;
    }
    .about-title {
        text-transform: uppercase;
        font-size: 28px;
        font-weight: 500;
        color: var(--color-black);
        margin-bottom: 20px;
    }
    .advantages__list {
        list-style-image: url(advantagecheck.svg);
        font-size: 14px;
        font-weight: 300;
        
    }
    .questions__container {
        max-width: 544px;
        border-radius: 30px;
        background-color: var(--color-graybg);
        margin: 65px auto 100px auto;
    }
    .questions__content {
        padding: 40px 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }
    .questions-title {
        width: 100%;
        text-align: center;
        color: var(--color-black);
        font-size: 20px;
        font-weight: 600;
    }
    .questions-button {
        border: 1px solid #6a6a6a;
        border-radius: 30px;
        display: flex;
        gap: 6px;
        align-items: center;
        padding: 10px 26px;
        background: none;
        color: var(--color-black);
        font-size: 16px;
        font-weight: 600;
        transition: all 0.15s ease-in;
    }
    .questions-button:hover {
        filter: brightness(0) saturate(100%) invert(36%) sepia(0%) saturate(0%) hue-rotate(42deg) brightness(93%) contrast(93%);
        cursor: pointer;
    }
    @media (max-width: 1024px) {
        .main__container {
            padding: 140px 30px 0 30px;
        }
        .main__info {
            flex-direction: column;
            align-items: center;
        }
        .main__info-image {
            height: 300px;
        }
        .main__info-form {
            box-shadow: none;
            max-width: 736px;
            width: 100%;
            padding: 30px 0;
        }
        .questions__content {
            padding: 35px 20px;
        }
    }
</style>