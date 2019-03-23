<template>
    <div>
        <Head :title="titleData" :show="false"></Head>
        <Search style="margin: 10px 5px;"></Search>
        <div style="margin-left: 5px;color: #000;font-weight: bold;">"{{$route.query.bookName}}"的搜索结果为：</div>
        <div v-for="(f,index) in showResult" :key="index" class="recommend-box">
            <div class="first-books" @click="readingBook(f._id)">
                <a href="javascript:;" class="first-pic-box"><img :src="takePic(f.cover)" class="first-pic"></a>
                <div class="first-text">
                    <h2 class="first-text-title">{{f.title}}</h2>
                    <span class="first-text-author">作者：{{f.author}}</span>
                    <p class="first-text-intro">{{f.shortIntro}}</p>
                </div>
            </div>
        </div>
        <div class="page-btn">
            <button class="btn" :class="text === 1? 'page-btn-color':''" @click="reducePage">上一页</button>
            <input type="text" v-model="text" class="page-input" @input="changeText(text)">
            <button class="btn" :class="text === page? 'page-btn-color':''" @click="addPage">下一页</button>
        </div>
        <Foot style="margin-top: 30px;"></Foot>
    </div>
</template>

<script>
    import Head from '../components/Head.vue'
    import Search from '../components/Search.vue'
    import Foot from '../components/Foot.vue'

    const findBookUrl = '/api/search?keyword='

    const resultCount = 20

    export default {
        name: "Find",
        components:{
            Head,
            Search,
            Foot,
        },
        data(){
            return{
                titleData: '搜索结果',
                text: 1,
                reserveText: 1,
                bookResult: [],
                page: 1,
                remainder: 0,
            };
        },
        computed:{
            showResult(){
                let num = resultCount;
                let nowPage = this.text;
                let result = [];
                if(this.text === this.page){
                    if(this.page === 1){
                        num = this.bookResult.length;
                    } else {
                        num = this.remainder;
                    }
                }
                if(this.text === ''){
                    nowPage = this.reserveText;
                } else {
                    this.reserveText = this.text;
                }
                for(var k = 0; k < num; k++){
                    result.push(this.bookResult[resultCount*(nowPage - 1) + k]);
                }
                console.log(nowPage);
                return result;
            },
        },
        methods:{
            readingBook(id){
                this.$router.push({path: `/details/${id}`,query: { bookId: id }});
            },
            takePic(pic){
                let str = pic;
                str = unescape(str);
                str = str.replace("/agent/","");
                return str;
            },
            changeText(txt){
                let re = /^[1-9]+[0-9]*]*$/;
                if(!re.test(txt)) this.text = 1;
                if(txt < 1) this.text = 1;
                if(txt > this.page) this.text = this.page;
                console.log(this.text);
            },
            reducePage(){
                if(this.text > 1){
                    this.text--;
                }
            },
            addPage(){
                if(this.text < this.page){
                    this.text++;
                }
            },
        },
        created(){
            this.axios.get(findBookUrl + this.$route.query.bookName).then(response => {
                this.bookResult = response.data.books;
                this.page = Math.ceil(this.bookResult.length / resultCount);
                this.remainder = this.bookResult.length % resultCount;
                console.log(this.page);
            },err => {
                alert(err);
            });
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .recommend-box {
        display: inline-block;
        width: 94%;
        margin: 10px;
        font-size: 0;
        border-bottom: 1px solid #333;

        .first-books {
            display: flex;
            height: 106px;
            padding-bottom: 10px;
            margin: 10px;
            cursor: pointer;

            .first-pic-box {
                flex: 0 0 86px;
                width: 86px;
                height: 100%;
            }

            .first-pic {
                width: 100%;
                height: 100%;
            }

            .first-text {
                flex: 1;
                height: 100%;
                line-height: 20px;
                margin-left: 10px;
            }

            .first-text-title {
                font-size: 16px;
                font-weight: bold;
                color: #000;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }

            .first-text-author {
                font-size: 14px;
            }

            .first-text-intro {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                font-size: 14px;
                color: #000;
            }
        }
    }
    .page-btn{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin: 5px 0;
        font-size: 0;

        .btn{
            width: 60px;
            height: 100%;
            font-size: 16px;
            color: #fff;
            background: #65bbec;
            border: 0;
            outline: none;
        }

        .page-input{
            width: 35px;
            height: 35px;
            margin: 0 10px;
            text-align: center;
            font-size: 16px;
            color: #000;
            border: 1px solid #333;
            outline:none;
            vertical-align: top;
        }

        .page-btn-color{
            background: #cecece;
        }
    }
</style>