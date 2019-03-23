<template>
    <div class="search-box">
        <div class="input-box">
            <input type="text" class="search-input" v-model="text" @keyup.enter="findBook"
                   @focus="beforeInput" @blur="afterInput">
        </div>
        <i class="fa fa-search search-icon" @click="findBook"></i>
    </div>
</template>

<script>
    export default {
        name: "Search",
        props: ['show'],
        data(){
            return{
                text:'输入书名后搜索，宁可少字不要错字',
            };
        },
        methods:{
            findBook(){
                this.$router.push({path: `/find`,query: { bookName: this.text }});
            },
            beforeInput(){
                if(this.text === '输入书名后搜索，宁可少字不要错字'){
                    this.text = '';
                }
            },
            afterInput(){
                if(this.text === ''){
                    this.text = '输入书名后搜索，宁可少字不要错字';
                }
            },
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .search-box{
        display: flex;
        height: 36px;
        margin: 0 5px;
        border: 1px solid #ccc;
        box-sizing: border-box;

        .input-box{
            display: inline-block;
            flex: 1;

            .search-input{
                width: 90%;
                height: 25px;
                line-height: 25px;
                margin: 3px 0 0 5px;
                border: 0;
                /*outline: none;*/
                font-size: 16px;
                color: #999;
            }
        }

        .search-icon{
            flex: 0 0 36px;
            width: 36px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            font-size: 26px;
            color: #fff;
            background: #0080c0;
        }
    }
</style>