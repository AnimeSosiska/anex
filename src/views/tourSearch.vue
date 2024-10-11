<script setup lang="ts">
    import headerComponent from "../components/header.vue"
    import footerComponent from "../components/footer.vue"
    import searchBlock from "../components/search.vue"
    import searchResults from "../components/searchResults.vue"
    import { ref } from "vue"
    import { useRoute } from "vue-router"
    let searchData = ref()
    const route = useRoute()
    const location = route.query.location
    const searchResultsData = ref(null)
    function searchBlockRes(data) {
        searchData.value = data
        // @ts-expect-error
        searchResultsData.value.showResults(searchData)
    }
</script>
<template>
    <headerComponent/>
    <main class="main__container">
        <section class="search__content">
            <div class="search-content__darken">
                <h1 class="search__title">Подбор тура</h1>
                <span class="search__subtitle">Идеальное путешествие начинается здесь</span>
                <searchBlock @submitFunc="searchBlockRes($event)" :location="location"/>
            </div>
        </section>
        <section class="search__results">
            <searchResults ref="searchResultsData" :location="location"/>
        </section>
    </main>
    <footerComponent/>
</template>
<style scoped>
    .search__content {
        height: 567px;
        background: url(searchbg.png);
        background-position: center;
        background-size: cover;
    }
    .search-content__darken {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.22);
        color: white;
    }
    .search__title {
        font-size: 100px;
        font-weight: 800;
        line-height: 135px;
        text-transform: uppercase;
        margin-top: 80px;
        text-align: center;
    }
    .search__subtitle {
        font-size: 28px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 80px;
        text-align: center;
    }
    @media (max-width: 1024px){
        .search__content {
            height: 710px;
        }
    }
    @media (max-width: 768px){
        .search__title {
            font-size: 54px;
            line-height: 60px;
        }
        .search__subtitle{
            margin-bottom: 15px;
            font-size: 24px;
        }
    }
</style>