<template>
    <div>
        <h1>Categories</h1>
        <div v-for=" category in categories" v-bind:key="category.id">
            <h2>{{ category.categoryname }}</h2>
    </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            categories:[]
        }
    },
    methods:{
        async  getData(){
           let response =  fetch("http://127.0.0.1:8000/api/Categories/")
           this.categories = (await response).json();
        }
    },
    mounted(){
        this.getData();
        console.log(this.categories);
    }
}
</script>

<style>

</style>