<template>
    <div>
        <Head :title="titleData" :showSelf="true"></Head>
        <Bar></Bar>
        <Search></Search>
        <div class="self-box">
            <h2 class="title-box"><span class="title-font">我的书架 - 会员中心</span></h2>
            <div class="none-book" v-if="true">还木有任何书籍( ˙﹏˙ )</div>
            <div class="" v-else>
                <div class="has-book">
                    <div class="pic-box"><img class="pic" src="/" alt=""></div>
                    <div class="book-text">
                        <h2 class="text-title">超级狂少</h2>
                        <p><span>作者：</span><span>陨落星辰</span></p>
                        <p><span>更新到：</span><span class="text-intro">第1章</span></p>
                        <p><span>已读到：</span><span>第1章</span></p>
                        <button class="delete-btn">删除</button>
                    </div>
                </div>

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
        name: "Bookshelf",
        components:{
            Head,
            Bar,
            Search,
            Foot,
        },
        data(){
            return{
                titleData:'我的书架',
            };
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .self-box{
        width: 100%;
        font-size: 0;

        .title-box{
            margin-top: 10px;
            border: 1px solid #dfdfdf;
            background: #f2f2f2;

            .title-font{
                display: block;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 16px;
                color: #000;
                border-bottom: 3px solid #3ba8de;
                overflow: hidden;
            }
        }

        .none-book{
            height: 100px;
            line-height: 100px;
            text-align: center;
            font-size: 16px;
        }

        .has-book{
            overflow: auto;
            padding: 14px 8px;
            border-bottom: 1px solid #dfdfdf;

            .pic-box{
                display: inline-block;
                width: 24%;
                height: 100px;
                text-align: center;
                vertical-align: top;
                border: 1px solid #DEDEDE;
                box-sizing: border-box;
            }

            .pic{
                display: inline-block;
                width: 78px;
                height: 98px;
            }

            .book-text{
                position: relative;
                display: inline-block;
                width: 72%;
                padding-left: 8px;
                vertical-align: top;
            }

            .text-title{
                height: 22px;
                line-height: 22px;
                font-size: 16px;
                font-weight: bold;
                color: #000;
            }

            .book-text p{
                display: inline-block;
                width: 100%;
                height: 27px;
                line-height: 27px;
                font-size: 13px;
                color: #a8a8a8;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .text-intro{
                color: red;
            }

            .delete-btn{
                position: absolute;
                top: 0;
                right: 0;
                display: inline-block;
                width: 55px;
                height: 30px;
                font-size: 13px;
                line-height: 30px;
                border-radius: 4px;
                text-align: center;
                border: 1px solid #ff4643;
                color: #ff4643;
                background: none;
                outline: none;
                box-sizing: border-box;
            }
        }
    }
</style>