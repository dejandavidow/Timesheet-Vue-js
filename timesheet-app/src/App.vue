<template>
    <div class="container">
        <Navbar/>
        <Router-view/>
    </div>
</template>

<script lang="ts">
import Navbar from './components/Navigation/Navbar.vue';
export default {
    components:{
        Navbar
    }
}
</script>

<style scoped>
</style>
