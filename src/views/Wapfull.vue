<template>
    <div>
        <Head :title="titleData" :show="false"></Head>
        <Bar></Bar>
        <Search></Search>
        <div>This is wapfull</div>
        <Foot></Foot>
    </div>
</template>

<script>
    import Head from '../components/Head.vue'
    import Bar from '../components/Bar.vue'
    import Search from '../components/Search.vue'
    import Foot from '../components/Foot.vue'

    export default {
        name: "Wapfull",
        components:{
            Head,
            Bar,
            Search,
            Foot,
        },
        data(){
            return{
                titleData:'完本小说',
            };
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>