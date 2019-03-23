<template>
  <div>
    <Head :show="true"></Head>
    <Bar></Bar>
    <Search></Search>
    <div class="recommend-box">
      <h2 class="sort-title"><span class="title-font">封面推荐</span></h2>
      <div class="first-books" @click="readingComm" :id="bookNumber[randomNum]" ref="commbook">
        <a href="javascript:;" class="first-pic-box"><img :src="picUrl[randomNum]" class="first-pic"></a>
        <div class="first-text">
          <h2 class="first-text-title">{{bookTitle[randomNum]}}</h2>
          <span class="first-text-author">作者：{{bookAuthor[randomNum]}}</span>
          <p class="first-text-intro">{{bookShortIntro[randomNum]}}</p>
        </div>
      </div>
    </div>
    <div v-for="(list,index) in sortNames" :key="index" class="recommend-box">
      <h2 class="sort-title"><span class="title-font">{{list}}小说</span><a href="javascript:;" class="more">更多...</a></h2>
      <div class="first-books" :id="bookNumber[num[index]]" @click="readingFirst(index)" ref="firstbook">
        <a href="javascript:;" class="first-pic-box"><img :src="picUrl[num[index]]" class="first-pic"></a>
        <div class="first-text">
          <h2 class="first-text-title">{{bookTitle[num[index]]}}</h2>
          <span class="first-text-author">作者：{{bookAuthor[num[index]]}}</span>
          <p class="first-text-intro">{{bookShortIntro[num[index]]}}</p>
        </div>
      </div>
      <div v-for="(ficname,ind) in books[num[index]]" :key="ind" class="other-books" v-show="ind===0||ind>=commNum? false:true">
        <span class="other-books-title" :id="ficname._id" @click="readingOther(ind)" ref="otherbook">{{ficname.title}}</span>
        <span class="other-books-author">/{{ficname.author}}</span>
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

    const recomStart = 0
    const recomCount = 10

    const sortApiUrl = '/api/sub-categories'

    export default {
        name: 'Home',
        components:{
            Head,
            Bar,
            Search,
            Foot,
        },
        data(){
            return{
                titleData:'',
                sortNames:[],
                sortName:'',
                // bookers:[],
                books:[],
                bookNumber:[],         //推荐第一本小说编号
                bookTitle:[],          //推荐第一本小说标题
                bookAuthor:[],         //推荐第一本小说作者
                bookShortIntro:[],     //推荐第一本小说介绍
                picUrl:[],             //推荐第一本小说图片
                commNum: 6,            //推荐数目
                majorCate:[],
                num: [],
                whetherIf: false,
                // urls:[],
            };
        },
        computed:{
            randomNum(){
                return Math.floor(Math.random() * 14);
            },
        },
        methods:{
            readingComm(){                   //获取推荐书籍信息
                let id = this.$refs.commbook.id;
                this.$router.push({path: `/details/${id}`,query: { bookId: id }});
            },
            readingFirst(n){                 //获取各类型的第一本推荐书籍信息
                let id = this.$refs.firstbook[n].id;
                this.$router.push({path: `/details/${id}`,query: { bookId: id }});
            },
            readingOther(n){                  //获取其他书籍信息
                let id = this.$refs.otherbook[n].id;
                this.$router.push({path: `/details/${id}`,query: { bookId: id }});
            },
            // 通过元素查找数组下标
            getSubscript(arrays,obj){
                for (let i = 0; i < arrays.length; i++){
                    if (arrays[i] === obj) {
                        return i;
                    }
                }
                return false;
            },
            // 数组去重
            uniq(array){
                let temp = [];
                for(var i = 0; i < array.length; i++){
                    if(temp.indexOf(array[i]) == -1){
                        temp.push(array[i]);
                    }
                }
                return temp;
            },
            //异步
            //async logInOrder(urls,that) {
            //    const textPromises = urls.map(async urls => {
            //        const response = await fetch(urls);
            //        return response.text();
            //    });
            //    for (const textPromise of textPromises) {
            //        that.bookers.push(await textPromise);
            //        console.log('a');
            //    }
            //}
        },
        created(){
            this.axios.get(sortApiUrl).then(response => {
                // let that = this;
                for(var i in response.data.male){
                    this.sortNames.push(response.data.male[i].major);
                    // this.urls.push('/api/category-info?gender=male&type=hot&major='+ response.data.male[i].major +
                    //     '&minor=&start=' + recomStart + '&limit=' + recomCount);
                    // return new Promise(function (resolve) {
                    this.axios.get('/api/category-info?gender=male&type=hot&major='+ response.data.male[i].major +
                        '&minor=&start=' + recomStart + '&limit=' + recomCount).then(res => {
                        // this.books.push(res.data.books);
                        i = Number(i);
                        this.books.push(res.data.books);
                        this.bookNumber.push(res.data.books['0']._id);
                        this.bookTitle.push(res.data.books['0'].title);
                        this.bookAuthor.push(res.data.books['0'].author);
                        this.bookShortIntro.push(res.data.books['0'].shortIntro);
                        let str = res.data.books['0'].cover;
                        str = unescape(str);
                        str = str.replace("/agent/","");
                        this.picUrl.push(str);
                        for (var j = 0; j < (i+1); j++) {
                            this.majorCate.push((this.books[j])['0'].majorCate);
                            this.majorCate = this.uniq(this.majorCate);
                            let p = this.getSubscript(this.majorCate, this.sortNames[j]);
                            if(this.majorCate.length >= i){
                                if(this.whetherIf){
                                    if(p === false) p = i;
                                    this.num.push(p);
                                }else {
                                    this.num.splice(0,1);
                                    this.whetherIf = true;
                                }
                            }
                            this.num = this.uniq(this.num);
                        }
                        // resolve();
                    },err =>{
                        alert(err);
                    });
                }
                // this.logInOrder(this.urls,that);
            },err => {
                alert(err);
            });
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .recommend-box{
    display: inline-block;
    width: 100%;
    margin: 10px 0;
    font-size: 0;

    .sort-title{
      display: flex;
      height: 36px;
      line-height: 36px;
      padding: 0 10px;
      background: #ECF0F0;
      border-bottom: 1px solid #007BB1;
      box-sizing: border-box;

      .title-font{
        flex: 1;
        color: #000;
        font-size: 16px;
        font-weight: 700;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .more{
        flex: 0 0 40px;
        width: 40px;
        color: #000;
        text-decoration: none;
        font-size: 14px;
        font-weight: 400;
      }
    }

    .first-books{
      display: flex;
      height: 100px;
      padding-bottom: 10px;
      margin: 20px 10px 10px;
      cursor: pointer;

      .first-pic-box{
        flex: 0 0 80px;
        width: 80px;
        height: 100%;
      }

      .first-pic{
        width: 100%;
        height: 100%;
      }

      .first-text{
        flex: 1;
        height: 100%;
        line-height: 20px;
        margin-left: 10px;
      }

      .first-text-title{
        font-size: 16px;
        font-weight: bold;
        color: #000;
      }

      .first-text-author{
        font-size: 14px;
      }

      .first-text-intro{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        font-size: 14px;
        color: #000;
      }
    }

    .other-books{
      height: 36px;
      line-height: 36px;
      margin: 0 10px;
      border-bottom: 1px solid #ECECEC;
      box-sizing: border-box;

      .other-books-title{
        font-size: 18px;
        color: #007BB1;
      }

      .other-books-author{
        font-size: 16px;
      }
    }
  }
</style>