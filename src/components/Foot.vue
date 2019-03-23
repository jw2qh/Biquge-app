<template>
    <div class="footer">
        <router-link class="footer-option" tag="span" to="/">首页</router-link>
        <router-link class="footer-option" tag="span" to="/">电脑版</router-link>
        <router-link class="footer-option" tag="span" to="/login">书架</router-link>
    </div>
</template>

<script>
    export default {
        name: "Foot"
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .footer{
        width: 99%;
        height: 30px;
        margin: 0 auto;
        padding: 20px 0 120px;
        background: #ECF0F0;
        font-size: 0;

        .footer-option{
            display: inline-block;
            width: 33%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 16px;
            color: #000;
        }
    }
</style>