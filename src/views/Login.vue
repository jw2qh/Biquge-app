<template>
    <div class="login-box">
        <Head :title="titleData" :show="false"></Head>
        <form action="" class="form-box">
            <label class="font-box">账号：<input type="text" class="input-box" size="20" maxlength="30"></label>
            <label class="font-box">密码：<input type="password" class="input-box" size="20" maxlength="30"></label>
            <button class="form-btn">登录</button>
        </form>
        <button class="register" @click="goRegistered">没有账号？点击注册</button>
    </div>
</template>

<script>
    import Head from '../components/Head.vue'

    export default {
        name: "Login",
        components:{
            Head,
        },
        data(){
            return{
                titleData:'用户登录',
            };
        },
        methods:{
            goRegistered(){
                this.$router.push('/registered');
            },
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .login-box{
        width: 100%;
        font-size: 0;

        .form-box{
            .font-box{
                display: inline-block;
                width: 100%;
                height: 30px;
                line-height: 30px;
                margin: 0 7px;
                padding: 20px 0;
                font-size: 16px;
            }

            .input-box{
                width: 75%;
                height: 100%;
                margin: 0 15px 0 5px;
                padding: 0 5px;
                border: 1px solid #B7F3F9;
                box-sizing: border-box;
                border-radius: 3px;
                font-size: 12px;
            }

            .form-btn{
                width: 94%;
                height: 40px;
                line-height: 40px;
                margin: 20px 10px;
                border-style: none;
                background-color: #0080C0;
                color: white;
                font-weight: bold;
                font-size: 18px;
            }
        }

        .register{
            width: 94%;
            height: 40px;
            line-height: 40px;
            margin: 0 10px;
            border-style: none;
            background-color: #0080C0;
            color: white;
            font-weight: bold;
            font-size: 18px;
        }
    }
</style>