<script lang="ts" setup>
    import logo from "../components/icons/logo.vue"
    import footerComponent from "../components/footer.vue"
    import VueDatePicker from '@vuepic/vue-datepicker'
    import '@vuepic/vue-datepicker/dist/main.css'
    import star from "../components/icons/ratingStar.vue"
    import hotelsDataService from "../services/hotelsDataService.js"
    import { ref, onBeforeMount } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    let tourists = ref([]) 
    const date = ref([])
    const issue = ref([])
    const valid = ref([])

    const form = ref()

    const data = ref({
        id: '',
        img: '',
        hotelName: '',
        rating: '',
        date: '',
        people: '',
        room: '',
        price: '',
        location: ''
    })
    data.value.id = sessionStorage.getItem('id')
    data.value.img = sessionStorage.getItem("image")
    data.value.hotelName = sessionStorage.getItem("hotelName")
    data.value.rating = Number(sessionStorage.getItem("rating"))
    data.value.date = Date.parse(sessionStorage.getItem("date"))
    data.value.date = new Date(data.value.date).toLocaleString('ru-RU', {month: 'long', year: 'numeric', day: 'numeric'})
    data.value.people = JSON.parse(sessionStorage.getItem("people"))
    data.value.room = sessionStorage.getItem("room")
    data.value.price = sessionStorage.getItem("price")
    data.value.location = sessionStorage.getItem("location")
    
    
    const tourist = {
        firstName: '',
        lastName: '',
        appeal: '0',
        gender: '0',
        country: '',
        citizenship: '',
        date: '',
        passport: 'Заграничный паспорт',
        serie: '',
        number: '',
        issue: '',
        valid: '',
        phone: '',
        email: ''
    }
    function update(index, el, event) {
        console.log(tourists.value)
        switch (el) {
            case 'firstName': 
                tourists.value[index].firstName = event.target.value
                break
            case 'lastName':
                tourists.value[index].lastName = event.target.value
                break
            case 'appeal':
                tourists.value[index].appeal = event.target.value
                break
            case 'gender':
                tourists.value[index].gender = event.target.value
                break
            case 'country':
                tourists.value[index].country = event.target.value
                break
            case 'citizenship':
                tourists.value[index].citizenship = event.target.value
                break
            case 'date':
                if (date.value[index] != undefined) {
                    tourists.value[index].date = date.value[index].toLocaleString('ru-RU', {month: 'long', year: 'numeric', day: 'numeric'})
                }
                break
            case 'passport':
                tourists.value[index].passport = event.target.value
                break
            case 'serie':
                tourists.value[index].serie = event.target.value
                break
            case 'number':
                tourists.value[index].number = event.target.value
                break
            case 'issue':
                if (issue.value[index] != undefined) {
                    tourists.value[index].issue = issue.value[index].toLocaleString('ru-RU', {month: 'long', year: 'numeric', day: 'numeric'})
                }
                break
            case 'valid':
                if (valid.value[index] != undefined) {
                    tourists.value[index].valid = valid.value[index].toLocaleString('ru-RU', {month: 'long', year: 'numeric', day: 'numeric'})
                }
                break
            case 'phone':
                tourists.value[index].phone = event.target.value
                break
            case 'email':
                tourists.value[index].email = event.target.value
                break
        }
    }
    function submitFunc() {
        let adults = data.value.people.adults
        let kids = data.value.people.childs
        let res = ref()
        hotelsDataService.sendBookingOrder(
            data.value.date,
            adults,
            kids,
            data.value.room,
            data.value.location,
            data.value.price,
            data.value.id
        )
        .then(response => {
            res.value = response.data
            for (let i = 0; i < tourists.value.length; i++) {
                hotelsDataService.sendBookingData(
                    tourists.value[i].firstName,
                    tourists.value[i].lastName,
                    tourists.value[i].appeal, 
                    tourists.value[i].gender,
                    tourists.value[i].country,
                    tourists.value[i].citizenship,
                    tourists.value[i].date,
                    tourists.value[i].passport,
                    tourists.value[i].serie,
                    tourists.value[i].number,
                    tourists.value[i].issue,
                    tourists.value[i].valid,
                    tourists.value[i].phone,
                    tourists.value[i].email,
                    res.value.id
                )
            }
        })
        router.push({name: "end"})
    }
    onBeforeMount(() => {
        for (let i = 0; i < data.value.people.adults; i++){
            tourists.value[i] = JSON.parse(JSON.stringify(tourist))
        }
    })
</script>
<template>
    <header class="header__container">
        <div class="header__content">
            <RouterLink to="/" class="logo"><logo/></RouterLink>
        </div>
    </header>
    <main class="main__container">
        <div class="hotel-info__block">
            <div class="hotel-info__image" :style="{ backgroundImage: `url('data:image/png;base64,` + data.img + `')`}"></div>
            <span class="hotel-name">{{ data.hotelName }}</span>
            <div class="hotel-rating">
                <star v-for="rate in data.rating"/>
            </div>
            <div class="hotel-data">
                <span class="data-row">
                    Вылет: {{ data.date }}
                </span>
                <span class="data-row">
                    Туристы: {{ data.people.adults }} человека
                </span>
                <span class="data-row">
                    Номер: {{ data.room }}
                </span>
            </div>
            <div class="hotel-price">
                Общая сумма:
                <span>{{ data.price }} ₽</span>
            </div>
            <input type='submit' class="submit-button" form="tourist-form" value="Продолжить">
        </div>
        <div class="main__content">
            <h1 class="content-title">
                Заполните информацию о туристах
            </h1>
            <span class="content-subtitle">* обязательные поля для заполнения</span>
        </div>
        <section class="tourists">
            <form @submit.prevent="submitFunc" class="tourist__form" ref='form' id="tourist-form"> 
                <div class="tourist__block" v-for="(item, index) in data.people.adults">
                    <h2>Турист {{ index+1 }}</h2>
                    <div class="tourist-mainData">
                        <h3>Основные данные</h3>
                        <div class="tourist-row">
                            <div class="tourist-input">
                                <span class="input-title">
                                    Имя*
                                </span>
                                <input 
                                type="text" 
                                class="input"
                                placeholder="Александр"
                                required
                                @change="(event) => update(index, 'firstName', event)"
                                >
                            </div>
                            <div class="tourist-input">
                                <span class="input-title">
                                    Фамилия*
                                </span>
                                <input 
                                type="text" 
                                class="input"
                                placeholder="Александров"
                                required
                                @change="(event) => update(index, 'lastName', event)"
                                >
                            </div>
                        </div>
                        <div class="tourist-row">
                            <div class="tourist-input">
                                <span class="input-title">
                                    Обращение*
                                </span>
                                <select
                                class="input"
                                required
                                @change="(event) => update(index, 'appeal', event)"
                                >
                                    <option disabled value="">Выберите обращение</option>
                                    <option value="0">Мистер</option>
                                    <option value="1">Мисс</option>
                                </select>
                            </div>
                            <div class="tourist-input">
                                <span class="input-title">
                                    Пол
                                </span>
                                <select
                                class="input"
                                @change="(event) => update(index, 'gender', event)"
                                >
                                    <option disabled value="">Выберите пол</option>
                                    <option value="0">Мужской</option>
                                    <option value="1">Женский</option>
                                </select>
                            </div>
                        </div>
                        <div class="tourist-row">
                            <div class="tourist-input">
                                <span class="input-title">
                                    Страна рождения*
                                </span>
                                <input 
                                type="text" 
                                class="input"
                                placeholder="Россия"
                                required
                                @change="(event) => update(index, 'country', event)"
                                >
                            </div>
                            <div class="tourist-input">
                                <span class="input-title">
                                    Гражданство*
                                </span>
                                <input 
                                type="text" 
                                class="input"
                                placeholder="Россия"
                                required
                                @change="(event) => update(index, 'citizenship', event)"
                                >
                            </div>
                        </div>
                        <div class="tourist-row">
                            <div class="tourist-input tourist-input-long">
                                <span class="input-title">
                                    Дата рождения*
                                </span>
                                <VueDatePicker 
                                    v-model="date[index]"
                                    :enable-time-picker="false" 
                                    position="left" 
                                    :offset="22" 
                                    :max-date="new Date()" 
                                    hide-input-icon 
                                    auto-apply
                                    required
                                    :clearable="false"
                                    class="input-long"
                                    @closed="(event) => update(index, 'date', event)"
                                >
                                </VueDatePicker>
                            </div>
                        </div>
                    </div>
                    <div class="tourist-passport">
                        <h3>Паспортные данные</h3>
                        <div class="tourist-row">
                            <div class="tourist-input tourist-input-long">
                                <span class="input-title">
                                    Тип документа*
                                </span>
                                <select
                                class="input input-long"
                                required
                                @change="(event) => update(index, 'passport', event)"
                                >
                                    <option value="passport">Заграничный паспорт</option>
                                </select>
                            </div>
                        </div>
                        <div class="tourist-row">
                            <div class="tourist-input">
                                <span class="input-title">
                                    Серия документа*
                                </span>
                                <input 
                                type="text" 
                                class="input"
                                placeholder="Серия"
                                required
                                @change="(event) => update(index, 'serie', event)"
                                >
                            </div>
                            <div class="tourist-input">
                                <span class="input-title">
                                    Номер паспорта*
                                </span>
                                <input 
                                type="text" 
                                class="input"
                                placeholder="Номер"
                                required
                                @change="(event) => update(index, 'number', event)"
                                >
                            </div>
                        </div>
                        <div class="tourist-row">
                            <div class="tourist-input tourist-input-long">
                                <span class="input-title">
                                    Документ выдан*
                                </span>
                                <VueDatePicker 
                                    v-model="issue[index]"
                                    :enable-time-picker="false" 
                                    position="left" 
                                    :offset="22" 
                                    :max-date="new Date()" 
                                    hide-input-icon 
                                    auto-apply
                                    required
                                    :clearable="false"
                                    class="input-long"
                                    @closed="(event) => update(index, 'issue', event)"
                                >
                                </VueDatePicker>
                            </div>
                        </div>
                        <div class="tourist-row">
                            <div class="tourist-input tourist-input-long">
                                <span class="input-title">
                                    Действителен до*
                                </span>
                                <VueDatePicker 
                                    v-model="valid[index]"
                                    :enable-time-picker="false" 
                                    position="left" 
                                    :offset="22" 
                                    :min-date="new Date()" 
                                    hide-input-icon 
                                    auto-apply
                                    required
                                    :clearable="false"
                                    class="input-long"
                                    @closed="(event) => update(index, 'valid', event)"
                                >
                                </VueDatePicker>
                            </div>
                        </div>
                    </div>
                    <div class="tourist-comms">
                        <h3>Контактные данные</h3>
                        <div class="tourist-row">
                            <div class="tourist-input">
                                <span class="input-title">
                                    Мобильный телефон*
                                </span>
                                <input 
                                type="text" 
                                class="input"
                                placeholder="+ 7 (999) 000 00 00"
                                required
                                @change="(event) => update(index, 'phone', event)"
                                >
                            </div>
                            <div class="tourist-input">
                                <span class="input-title">
                                    E-mail*
                                </span>
                                <input 
                                type="text" 
                                class="input"
                                placeholder="Aleksandrovalex@mail.ru"
                                required
                                @change="(event) => update(index, 'email', event)"
                                >
                            </div>
                        </div>
                    </div>
                    <input type='submit' class="submit-button phone-button" form="tourist-form" value="Продолжить">
                </div>
            </form>
        </section>
    </main>
    <footerComponent/>
</template>
<style scoped>
    .header__container {
        position: fixed;
        background-color: white;
        width: 100%;
        height: 85px;
        box-shadow: 0px 4px 20px 0px rgba(43, 43, 51, 0.20);
        z-index: 9999;
        padding: 0 48px;
    }
    .header__content {
        max-width: 1120px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
    .logo {
        display: flex;
        align-items: center;
        height: 100%;
    }
    .main__container {
        padding-top: 85px;
        width: 100%;
        height: 100%;
        padding: 85px 48px 0 48px;
    }
    .hotel-info__block {
        max-width: 300px;
        width: 100%;
        padding: 24px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 20px 0px #2b2b3320;
        border-radius: 30px;
        position: absolute;
        z-index: 100;
        left: 50%;
        transform: translate(75%, 20%);
    }
    .hotel-info__image {
        width: 100%;
        height: 172px;
        background-position: center;
        background-size: cover;
        border-radius: 20px;
        margin-bottom: 24px;
    }
    .hotel-name {
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: 800;
        color: var(--color-black);
    }
    .hotel-rating {
        display: flex;
        gap: 4px;
        margin-bottom: 30px;
    }
    .hotel-data {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-bottom: 1px solid var(--color-line);
        padding-bottom: 30px;
    }
    .hotel-price {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
    }
    .submit-button {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        padding: 10px 40px;
        background-color: var(--color-red);
        text-align: center;
        color: white;
        border-radius: 30px;
        text-transform: uppercase;
        margin-top: 24px;
        border: none;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.1s ease-in-out;
    }
    .submit-button:hover {
        background-color: #dd1A21;
        cursor: pointer;
    }
    .main__content {
        padding-top: 120px;
        max-width: 1120px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }
    .content-title {
        text-transform: uppercase;
        color: var(--color-black);
        font-size: 32px;
        font-weight: 500;
    }
    .content-subtitle {
        color: var(--color-graytext2);
        font-size: 14px;
        font-weight: 300;
    }
    .tourists {
        width: 100%;
    }
    .tourist__block {
        max-width: 1120px;
        width: 100%;
        margin: 60px auto 0 auto;
        
    }
    .tourist__block h2 {
        font-size: 28px;
        font-weight: 500;
        color: var(--color-purple);
        text-transform: uppercase;
    }
    .tourist-comms {
        display: flex;
        flex-direction: column;
        margin-bottom: 70px;
    }
    .tourist__comms-title {
        color: var(--color-black) !important;
        text-transform: none !important;
    }
    .line {
        display: block;
        max-width: 522px;
        width: 100%;
        height: 1px;
        background-color: var(--color-line);
        margin-top: 60px;
        /* border: 1px solid black; */
    }
    .tourist-mainData, .tourist-passport, .tourist-comms {
        display: flex;
        flex-direction: column;
        margin-top: 28px;
    }
    .tourist-mainData h3 {
        color: var(--color-black);
        font-size: 20px;
        font-weight: 500;
    }
    .tourist-row {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }
    .tourist-input {
        display: flex;
        flex-direction: column;
        max-width: 256px;
        width: 100%;
    }
    .input-title {
        padding-left: 26px;
        color: var(--color-graytext2);
        font-size: 14px;
        font-weight: 300;
    }

    .input {
        max-width: 256px;
        width: 100%;
        border: 1px solid var(--color-line);
        border-radius: 30px;
        padding: 10px 25px 10px 25px;
        color: var(--color-black);
        font-size: 16px;
        font-weight: 400;
        font-family: "Roboto", "Chandra", "Millanova", "Rasfire";

    }
    .input-list {
        display: flex;
        gap: 6px;
    }
    .tourist-input-long, .input-long  {
        max-width: 522px;
        width: 100%;
    }
    .input::placeholder {
        color: var(--color-graytext);
        font-weight: 300;
    }
    .input:focus {
        outline: none;
        border: 1px solid var(--color-black)
    }
    .phone-button {
        display: none;
        max-width: 522px;
        width: 100%;
        margin-bottom: 70px;
    }
    @media (max-width: 1024px) {
        .content-title, .content-subtitle{
            text-align: center;
        }
        .tourist__block {
            display: flex;
            flex-direction: column;
            width: fit-content;
        }
        .hotel-info__block{
            display: none;
        }
        .tourist-comms .tourist-row {
            flex-direction: column;
        }
        .tourist-comms .tourist-input, .tourist-comms .input {
            max-width: 522px;
            width: 100%;
        }
        .phone-button {
            display: block;
        }
    }
</style>