<template>
    <div>
        <Head :title="titleData" :show="false"></Head>
        <Bar></Bar>
        <Search></Search>
        <div class="top-box">
            <div v-for="(item,index) in topNames" :key="index" class="item-box">
                <router-link to="/" tag="span">{{item}}</router-link>
            </div>
        </div>
        <Foot></Foot>
    </div>
</template>

<script>
    import Head from '../components/Head.vue'
    import Bar from '../components/Bar.vue'
    import Search from '../components/Search.vue'
    import Foot from '../components/Foot.vue'

    export default {
        name: "Top",
        components:{
            Head,
            Bar,
            Search,
            Foot,
        },
        data(){
          return{
              titleData:'排行分类',
              topNames:['日点击榜','周点击榜','月点击榜',
                        '总点击榜','总收藏榜','字数排行',
                        '日推荐榜','周推荐榜','月推荐榜',
                        '总推荐榜','最新入库','最近更新'],
          };
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .top-box{
        margin: 10px 0 0 7px;
        font-size: 0;

        .item-box{
            display: inline-block;
            width: 31%;
            height: 46px;
            line-height: 46px;
            text-align: center;
            margin: 0 7px 10px 0;
            font-size: 16px;
            color: #000;
            border: 1px solid #efefef;
            box-sizing: border-box;
        }
    }
</style>