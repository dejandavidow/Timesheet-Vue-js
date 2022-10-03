<template>
    <h1 class="display-6">Categories</h1>
    <CategoryHeader :isCreated="isCreated" :setCreated="setCreated" :setTerm="setTerm" :searchTerm="searchTerm" />
    <CategoryList :isCreated="isCreated" :setCreated="setCreated" :searchTerm="searchTerm" />
</template>

<script>
import CategoryList from "../components/Categories/CategoryList.vue";
import CategoryHeader from "../components/Categories/CategoryHeader.vue";
export default {
    components: { CategoryList, CategoryHeader },
    data() {
        return {
            isCreated: false,
            searchTerm: ''
        }
    },
    methods: {
        setCreated(c) {
            this.isCreated = c;
        },
        setTerm(c) {
            this.searchTerm = c;
        }
    },
}
</script>

<style>

</style>