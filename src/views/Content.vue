<template>
    <div class="content">
        <Head :title="titleData" :show="false"></Head>
        <div class="setting-box">
            <div class="set-size">
                <button class="font-size">字:</button>
                <button class="font-size" :class="fontSize === 1? 'selected-color':''" @click="changeBig">大</button>
                <button class="font-size" :class="fontSize === 0? 'selected-color':''" @click="changeMedium">中</button>
                <button class="font-size" :class="fontSize === -1? 'selected-color':''" @click="changeSmall">小</button>
            </div>
            <div class="set-color">
                <button class="font-color" :class="color === 1? 'selected-color':''" @click="protectEyeMode">护眼</button>
                <button class="font-color" :class="color === -1? 'selected-color':''" @click="switchLightMode">关灯</button>
            </div>
        </div>
        <div class="text-region" :class="color === 0? 'normal':color === 1? 'turn-green':color === -1? 'turn-black':'normal'">
            <div class="navigate">
                <span :class="color === 0? 'btn-normal':color === 1? 'btn-turn-green':color === -1? 'btn-turn-black':'btn-normal'"
                             class="item" @click="lastChapter">上一章</span>
                <span :class="color === 0? 'btn-normal':color === 1? 'btn-turn-green':color === -1? 'btn-turn-black':'btn-normal'"
                             class="item" @click="returnDirectory">回目录</span>
                <span :class="color === 0? 'btn-normal':color === 1? 'btn-turn-green':color === -1? 'btn-turn-black':'btn-normal'"
                             class="item" @click="nextChapter">下一章</span>
                <span :class="color === 0? 'btn-normal':color === 1? 'btn-turn-green':color === -1? 'btn-turn-black':'btn-normal'"
                             class="item" @click="goLogin">进书架</span>
            </div>
            <pre class="text-body" :class="fontSize === 0? 'medium':fontSize === 1? 'big':fontSize === -1? 'small':'medium'"
                    v-if="books.length!==0">{{textData}}</pre>
            <div class="ad">----------&nbsp;&nbsp;&nbsp;广告区&nbsp;&nbsp;&nbsp;----------</div>
            <div class="navigate">
                <span :class="color === 0? 'btn-normal':color === 1? 'btn-turn-green':color === -1? 'btn-turn-black':'btn-normal'"
                             class="item" @click="lastChapter">上一章</span>
                <span :class="color === 0? 'btn-normal':color === 1? 'btn-turn-green':color === -1? 'btn-turn-black':'btn-normal'"
                            class="item" @click="returnDirectory">回目录</span>
                <span :class="color === 0? 'btn-normal':color === 1? 'btn-turn-green':color === -1? 'btn-turn-black':'btn-normal'"
                             class="item" @click="nextChapter">下一章</span>
                <span :class="color === 0? 'btn-normal':color === 1? 'btn-turn-green':color === -1? 'btn-turn-black':'btn-normal'"
                             class="item" @click="goLogin">进书架</span>
            </div>
            <div class="ad">----------&nbsp;&nbsp;&nbsp;广告区&nbsp;&nbsp;&nbsp;----------</div>
        </div>
        <Foot></Foot>
    </div>
</template>

<script>
    import Head from '../components/Head.vue'
    import Foot from '../components/Foot.vue'

    const chaptersUrl = '/api/chapters/'

    export default {
        name: "Content",
        components:{
            Head,
            Foot,
        },
        data(){
            return{
                titleData: '',
                textUrl: '',
                textData: '',
                fontSize: 0,
                color: 0,
                eyeModeDetected: true,
                lightModeDetected: true,
                books: [],
                num: 0,
                id: 0,
            };
        },
        methods:{
            lastChapter(){
                if(this.num === 0){
                    this.$router.push({path: `/details/${this.id}`,query: { bookId: this.id }});
                } else {
                    this.num = this.num - 1;
                    this.$router.push({path: `/content/${this.id}_${this.num}`});
                }
            },
            nextChapter(){
                if(this.num === (this.books.length-1)){
                    this.$router.push({path: `/details/${this.id}`,query: { bookId: this.id }});
                } else {
                    this.num = this.num + 1;
                    this.$router.push({path: `/content/${this.id}_${this.num}`});
                }
            },
            returnDirectory(){
                this.$router.push({path: `/details/${this.id}`,query: { bookId: this.id }});
            },
            goLogin(){
                this.$router.push('/login');
            },
            changeBig(){
                this.fontSize = 1;
            },
            changeMedium(){
                this.fontSize = 0;
            },
            changeSmall(){
                this.fontSize = -1;
            },
            protectEyeMode(){
                if(this.eyeModeDetected) this.color = 1;
                else this.color = 0;
                this.eyeModeDetected = !this.eyeModeDetected;
                this.lightModeDetected = true;
            },
            switchLightMode(){
                if(this.lightModeDetected) this.color = -1;
                else this.color = 0;
                this.lightModeDetected = !this.lightModeDetected;
                this.eyeModeDetected = true;
            },
        },
        beforeRouteEnter(to, from, next){
            // eslint-disable-next-line
            console.log('进入');
            next(vm =>{
                vm.books = vm.$route.params.books;
                vm.num = vm.$route.params.number;
                vm.id = vm.$route.params.id;
                vm.titleData = vm.books[vm.num].title;
                vm.textUrl = escape(vm.books[vm.num].link);
                vm.textUrl = vm.textUrl.replace(/\//g,"%2F");
                vm.axios.get(chaptersUrl + vm.textUrl).then(response => {
                    vm.textData = response.data.chapter.cpContent;
                    vm.textData = vm.textData.replace(/\/n/g,"</br>");
                },err => {
                    alert(err);
                });
            });
        },
        beforeRouteUpdate(to, from, next){
            // eslint-disable-next-line
            console.log('更新');
            this.titleData = this.books[this.num].title;
            this.textUrl = escape(this.books[this.num].link);
            this.textUrl = this.textUrl.replace(/\//g,"%2F");
            this.axios.get(chaptersUrl + this.textUrl).then(response => {
                this.textData = response.data.chapter.cpContent;
            },err => {
                alert(err);
            });
            next();
        },
        beforeRouteLeave(to, from, next){
            // eslint-disable-next-line
            console.log('离开');
            next();
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .content{
        width: 100%;
        font-size: 0;

        .setting-box{
            width: 94%;
            padding: 3%;
            background: #ececec;

            .set-size{
                display: inline-block;
                width: 50%;
                text-align: left;

                .font-size{
                    margin-right: 8px;
                    padding: 2px 5px;
                    font-size: 12px;
                    color: #0065B5;
                    border: 1px solid #0065B5;
                    border-radius: 5px;
                    outline: none;
                }
            }

            .set-color{
                display: inline-block;
                width: 50%;
                text-align: right;

                .font-color{
                    margin-left: 8px;
                    padding: 2px 5px;
                    font-size: 12px;
                    color: #0065B5;
                    border: 1px solid #0065B5;
                    border-radius: 5px;
                    outline: none;
                }
            }

            .selected-color{
                background-color: rgb(167, 167, 167);
            }
        }

        .text-region{

            .navigate{
                padding: 10px 5px;
            }

            .item{
                display: inline-block;
                width: 25%;
                padding: 12px 5px;
                text-align: center;
                font-size: 16px;
                box-sizing: border-box;
            }

            .text-body{
                padding: 0 5px;
                white-space: pre-wrap;
                white-space: -moz-pre-wrap;
                word-wrap: break-word;
            }

            .medium{
                line-height: 30px;
                font-size: 20px;
            }

            .big{
                line-height: 34px;
                font-size: 24px;
            }

            .small{
                line-height: 26px;
                font-size: 16px;
            }

            .ad{
                width: 100%;
                padding: 30px 0 10px;
                text-align: center;
                font-size: 16px;
            }

        }

        .normal{
            color: rgb(0, 0, 0);
            background-color: rgb(251, 246, 236);
        }

        .btn-normal{
            color: green;
            background-color: rgb(244, 240, 233);
            border: 1px solid rgb(236, 230, 218);
        }

        .turn-green{
            color: rgb(0, 0, 0);
            background-color: rgb(220, 236, 210);
        }

        .btn-turn-green{
            color: green;
            background-color: rgb(204, 226, 191);
            border: 1px solid rgb(187, 214, 170);
        }

        .turn-black{
            color: rgb(153, 153, 153);
            background-color: rgb(50, 55, 59);
        }

        .btn-turn-black{
            color: rgb(204, 204, 204);
            background-color: rgb(62, 66, 69);
            border: 1px solid rgb(49, 53, 56);
        }
    }
</style>