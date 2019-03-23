<template>
    <div>
        <div class="header" v-if="show">
            <div class="logo"><a href="/">新笔趣阁</a></div>
            <div class="login-enter">
                <a href="javascript:;" class="btns" @click="goLogin">登录</a>
                <a href="javascript:;" class="btns" @click="goRegistered">注册</a>
            </div>
        </div>
        <div class="header" v-else-if="showSelf">
            <div class="logo"><a href="/">新笔趣阁</a></div>
            <div class="login-enter">
                <a href="javascript:;" class="btns" @click="goBookSelf">会员中心</a>
                <a href="javascript:;" class="btns" @click="goLogin">退出</a>
            </div>
        </div>
        <div class="header" v-else>
            <a href="javascript:;" class="btn" @click="turnBack">返回</a>
            <span class="title">{{title}}</span>
            <a href="/" class="btn">首页</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Head",
        props:{
            title:String,
            show:Boolean,
            showSelf:Boolean,
        },
        methods:{
            turnBack(){
                this.$router.go(-1);
            },
            goLogin(){
                this.$router.push('/login');
            },
            goRegistered(){
                this.$router.push('/registered');
            },
            goBookSelf(){
                this.$router.push('/bookshelf');
            },
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .header{
        display: flex;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #007BB1;
        font-size: 0;
        user-select:none;

        .logo{
            display: inline-block;
            flex: 1;
            text-align: left;
            margin-left: 10px;
            a{
                font-size: 20px;
                color: #fff;
            }
        }

        .title{
            flex: 1;
            height: 100%;
            text-align: center;
            font-size: 16px;
            font-weight: 400;
            color: #fff;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .btn{
            flex: 0 0 30px;
            margin: 10px;
            padding: 0 10px;
            width: 30px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            border-radius: 3px;
            font-size: 14px;
            color: #fff;
            background-color: #65bbec;
        }

        .login-enter{
            display: inline-block;
            flex: 0 0 132px;
            width: 132px;
            margin-right: 10px;
            text-align: right;

            .btns{
                margin-left: 10px;
                padding: 5px;
                font-size: 16px;
                color: #fff;
                background: #65BBEC;
                border-radius: 3px;
            }
        }

        a{
            text-decoration:none;
            color:#333;
        }
    }
</style>