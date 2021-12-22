<template>
    <div>
        <nav-bar></nav-bar>
        <side-bar></side-bar>
        <div class="content-wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import NavBar from "./../components/Partials/Navbar.vue";
    import SideBar from "./../components/Partials/SideBar.vue";
    export default {
        components: {
            NavBar,
            SideBar
        }
    }

</script>

<style>

</style>
