<script setup lang="ts">
    import Dropdown from 'v-dropdown'
    import { ref} from 'vue'
    let dropdownTo = ref()
    let dropdownFrom = ref()
    const ddFrom = ref()
    const ddTo = ref()
    const countriesPopular = ref([
        'Турция',
        'Египет',
        'Мальдивы',
        'ОАЭ',
        'Куба',
        'Шри-Ланка'
        ]
    )
    const countriesAll = ref([
        'Абхазия',
        'Азербайджан',
        'Армения',
        'Беларусь',
        'Венесуэла',
        'Вьетнам',
        'Греция',
        'Грузия',
        'Доминикана',
        'Израиль',
        'Индия',
        'Индонезия',
        'Италия',
        'Китай',
        'Перу',
        'Португалия',
        'Чили',
        'Япония'
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
        dropdownFrom = ref('')
        ddFrom.value.close()
    }
    function emptyTo(){
        dropdownTo = ref('')
        ddTo.value.close()
    }

</script>

<template>
    <div class="search__container">
        <form class="search__form" @submit.prevent>
            <Dropdown customContainerClass="dropdown-from__container" class="dropdown-from" ref="ddFrom">
                <template #trigger>
                    <button class="dropdown-from__button" :class="[dropdownFrom ? '' : 'empty']">Откуда</button>
                    <span class="dropdown-from__input">{{ dropdownFrom }}</span>
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
                    <button @click="emptyFrom()">Очистить</button>
                </div>
            </Dropdown>
            <span class="line"></span>
            <Dropdown customContainerClass="dropdown-from__container" class="dropdown-from" ref="ddTo">
                <template #trigger>
                    <button class="dropdown-from__button" :class="[dropdownTo ? '' : 'empty']">Куда</button>
                    <span class="dropdown-from__input">{{ dropdownTo }}</span>
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
                    <button @click="emptyTo()">Очистить</button>
                </div>
            </Dropdown>
        </form>
    </div>
</template>
<style>
    .dropdown-from__container {
        border-radius: 30px !important;
        box-shadow: 0px 4px 20px 0px rgba(43, 43, 51, 0.20) !important;
        width: 384px !important;
        height: 470px;
    }
</style>
<style scoped>
    .empty {
        text-transform: uppercase;
        font-size: 16px !important;
    }
    .line {
        height: 38px;
        border: 1px solid var(--color-line);
        margin-left: 60px;
    }
    .search__container{
        max-width: 928px;
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
        width: 100px;
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
    .dropdown > button{
        font-weight: 500;
        font-size: 16px;
        color: var(--color-graytext);
        background: none;
        border: none;
        padding: 10px 0;
        width: 72px;
        transition: all 0.1s ease-out;
    }
    .dropdown > button:hover{
        cursor: pointer;
        opacity: 0.8;
    }
    .dropdown-from__button{
        text-align: inherit;
        /* height: 100%; */
        background: none;
        border: none;
        font-weight: 400;
        font-size: 12px;
        color: var(--color-graytext);
    }
    .dropdown-from__input{
        text-align: inherit;
        text-transform: uppercase;
        color: var(--color-black);
        font-size: 16px;
        font-weight: 500;
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
</style>
