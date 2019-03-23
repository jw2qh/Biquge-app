<template>
    <div class="book-details">
        <Head :title="titleData" :show="false"></Head>
        <div class="book-show">
            <a href="javascript:;" class="pic-box"><img :src="picDetailsUrl" class="pic"></a>
            <div class="book-text">
                <h2 class="text-title">{{bookDetails.title}}</h2>
                <p><span>作者：</span><span>{{bookDetails.author}}</span></p>
                <p><span>分类：</span><span class="text-intro">{{bookDetails.majorCate}}小说</span></p>
                <p><span>状态：</span><span>{{bookDetails.isSerial?'连载中':'完本'}}</span></p>
                <p><span>更新：</span><span>{{bookDetails.updated}}</span></p>
                <p><span>最新：</span><span class="text-intro">{{bookDetails.lastChapter}}</span></p>
            </div>
        </div>
        <div class="book-btn">
            <a href="javascript:;" @click="beginReading(0)">开始阅读</a>
            <a href="javascript:;" @click="goLogin">加入书架</a>
        </div>
        <div class="recommend-box">
            <h2 class="sort-title"><span class="title-font">{{bookDetails.title}}小说简介</span></h2>
            <p class="intro">{{bookDetails.longIntro}}</p>
        </div>
        <div class="recommend-box">
            <h2 class="sort-title"><span class="title-font">{{bookDetails.title}}最新章节 更新时间：{{bookDetails.updated}}</span></h2>
            <p class="new-chapter" v-for="(chapter,index) in showLastChapters" :key="index"
               @click="beginReading(chaptersTitle.length-1-index)">{{chapter.title}}</p>
        </div>
        <div class="recommend-box">
            <h2 class="sort-title"><span class="title-font">正文</span></h2>
            <p class="new-chapter" v-for="(chapter,index) in showChapters" :key="index"
               @click="beginReading(maxChapt*nowPage+index)">{{chapter.title}}</p>
        </div>
        <div class="page-box">
            <span class="page-btn" :class="nowPage===0?'page-btn-color':''" @click="reducePage">上一页</span>
            <div class="page" @click="showPage">
                <span class="page-font" v-if="chapterGroups.length !== 0">
                    第{{chapterGroups[nowPage].chapterHead}} - {{chapterGroups[nowPage].chapterFoot}}章</span>
                <i class="fa fa-sort-desc page-icon"></i>
                <div class="page-list" v-show="pages">
                    <ul>
                        <li class="page-item" v-for="(n,index) in chapterGroups" :key="index"
                        @click="choosePage(index)">第{{n.chapterHead}} - {{n.chapterFoot}}章</li>
                    </ul>
                </div>
            </div>
            <span class="page-btn" :class="nowPage===page?'page-btn-color':''" @click="addPage">下一页</span>
        </div>
        <div class="ad">----------&nbsp;&nbsp;&nbsp;广告区&nbsp;&nbsp;&nbsp;----------</div>
        <Foot></Foot>
    </div>
</template>

<script>
    import Head from '../components/Head.vue'
    import Foot from '../components/Foot.vue'

    const detailsUrl = '/api/book-info/'
    const sourceUrl = '/api/book-sources?view=summary&book='
    const chaptersUrl = '/api/book-chapters/'

    const maxchapters = 20          //每页章节显示数量
    const newChaptersCount = 5     //最新章节显示数量

    export default {
        name: "Details",
        components:{
            Head,
            Foot,
        },
        data(){
            return{
                titleData:'',                 //小说名
                bookDetails:{},               //小说详情数据
                picDetailsUrl:'',             //小说封面图片链接
                bookSourceId:'',              //获取章节api所需的ID
                chaptersTitle:[],             //章节数据（章节名 + 章节链接）
                page: 1,                      //章节总页数
                remainder: 0,                 //最后一页章节数
                nowPage: 0,                   //展示的章节页数
                chapterGroups:[],             //章节页数列表
                pages:false,
                maxChapt: maxchapters,
            };
        },
        computed:{
            showChapters(){
                let chapters = 0;
                let result = [];
                if(this.chaptersTitle.length&&this.chapterGroups){
                    if(this.nowPage === this.chapterGroups.length - 1){
                        chapters = this.remainder;
                    } else {
                        chapters = maxchapters > this.chaptersTitle.length? this.chaptersTitle.length:maxchapters;
                    }
                    for(var k = 0; k < chapters; k++){
                        result.push(this.chaptersTitle[maxchapters*this.nowPage+k]);
                    }
                }
                return result;
            },
            showLastChapters(){
                let newChapters = newChaptersCount > this.chaptersTitle.length? this.chaptersTitle.length:newChaptersCount;
                let result = [];
                if(this.chaptersTitle.length){
                    for(var k = 0; k < newChapters; k++){
                        result.push(this.chaptersTitle[this.chaptersTitle.length-1-k]);
                    }
                }
                return result;
            },
        },
        methods:{
            choosePage(x){
                if(this.pages){
                    this.nowPage = x;
                }
            },
            reducePage(){
                if(this.nowPage > 0){
                    this.nowPage--;
                }
            },
            addPage(){
                if(this.nowPage < this.page){
                    this.nowPage++;
                }
            },
            grouping(){
                if(this.chaptersTitle.length){
                    if(this.chaptersTitle.length <= maxchapters){
                        this.chapterGroups.push({chapterHead:1,chapterFoot:this.chaptersTitle.length});
                    }else {
                        this.page = Math.floor(this.chaptersTitle.length / maxchapters);
                        this.remainder = this.chaptersTitle.length % maxchapters;
                        for(var k = 0; k <= this.page; k++){
                            if(k === this.page){
                                this.chapterGroups.push({chapterHead:maxchapters * k + 1,chapterFoot:maxchapters * k + this.remainder});
                            } else {
                                this.chapterGroups.push({chapterHead:maxchapters * k + 1,chapterFoot:maxchapters * (k + 1)});
                            }
                        }
                    }
                }
            },
            showPage(){
                this.pages = !this.pages;
            },
            beginReading(n){
                this.$router.push({name: `Content`, params: { number: n, books: this.chaptersTitle, id:this.$route.query.bookId}});
            },
            goLogin(){
                this.$router.push('/login');
            },
        },
        created(){
            this.axios.get(detailsUrl + this.$route.query.bookId).then(response => {
                this.bookDetails = response.data;
                this.titleData = this.bookDetails.title;
                this.picDetailsUrl = unescape(this.bookDetails.cover).replace("/agent/","");
            },err => {
                alert(err);
            });
            this.axios.get(sourceUrl + this.$route.query.bookId).then(response => {
                for(var i = 0; i < response.data.length; i++){
                    if(response.data[i].starting) this.bookSourceId = response.data[i]._id;
                }
                this.axios.get(chaptersUrl + this.bookSourceId).then(response => {
                    this.chaptersTitle = response.data.chapters;
                    this.grouping();
                    // eslint-disable-next-line
                    console.log('加载完成');
                },err => {
                    alert(err);
                });
            },err => {
                alert(err);
            });
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .book-details{
        width: 100%;
        font-size: 0;

        .book-show{
            width: 100%;
            height: 130px;
            margin: 3%;

            .pic-box{
                display: inline-block;
                width: 29%;
                height: 130px;
                text-align: center;
                vertical-align: top;
                padding: 5px;
                border: 1px solid #DEDEDE;
                box-sizing: border-box;
            }

            .pic{
                width: 92px;
                height: 116px;
            }

            .book-text{
                display: inline-block;
                width: 66%;
                padding-left: 8px;
                vertical-align: top;
            }

            .book-text p{
                display: inline-block;
                width: 100%;
                height: 21px;
                line-height: 21px;
                font-size: 14px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .text-title{
                height: 21px;
                line-height: 21px;
                font-size: 16px;
                font-weight: bold;
                color: #000;
            }

            .text-intro{
                color: #000;
            }
        }

        .book-btn{
            width: 100%;
            height: auto;
            padding: 2% 0;

            a{
                display: inline-block;
                width: 46%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                margin: 0 2%;
                background: #65bbec;
                color: #fff;
                font-size: 16px;
                cursor: pointer;
                border-radius: 6px;
                text-decoration: none;
            }
        }

        .recommend-box{
            width: 100%;
            margin: 5px 0;

            .sort-title{
                height: 36px;
                line-height: 36px;
                padding: 0 10px;
                background: #ECF0F0;
                border-bottom: 1px solid #007BB1;
                box-sizing: border-box;
            }

            .title-font{
                color: #000;
                font-size: 16px;
                font-weight: 700;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .intro{
                line-height: 21px;
                padding: 10px;
                font-size: 14px;
                white-space : normal;
            }

            .new-chapter{
                padding-left: 10px;
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                color: #000;
                border-bottom: 1px solid #efefef;
                overflow: hidden;
            }
        }

        .page-box{
            display: flex;
            margin: 10px;
            height: 36px;
            line-height: 36px;
            text-align: center;

            .page-btn{
                flex: 0 0 80px;
                width: 80px;
                font-size: 16px;
                color: #FFF;
                background: #65bbec;
            }

            .page-btn-color{
                background: #cecece;
            }

            .page{
                position: relative;
                flex: 1;
                display: flex;
                margin: 0 10px;
                padding: 0 5px;
                font-size: 14px;
                border: 1px solid #999;
                border-radius: 6px;
                box-sizing: border-box;
            }

            .page-font{
                flex: 1;
                font-size: 14px;
                text-align: left;
            }

            .page-icon{
                flex: 0 0 20px;
                width: 20px;
                margin-top: 8px;
            }

            .page-list{
                display: inline-block;
                position: absolute;
                bottom: 36px;
                left: 0;
                z-index: 10;
                width: 100%;
                max-height: 400px;
                overflow-x: hidden;
                overflow-y: scroll;
                background: #fff;
                border: 1px solid #000;
                border-radius: 3px;
            }

            .page-item{
                margin: 0 5px;
                text-align: left;
            }
        }

        .ad{
            width: 100%;
            margin: 30px 0 10px;
            text-align: center;
            font-size: 16px;
        }
    }
</style>