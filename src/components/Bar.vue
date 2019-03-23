<template>
    <div class="bar">
        <router-link class="option" tag="span" to="/sort">分类</router-link>
        <router-link class="option" tag="span" to="/top">排行</router-link>
        <router-link class="option" tag="span" to="/wapfull/1.html">全本</router-link>
        <router-link class="option" tag="span" to="/top/postdate_1">新书</router-link>
        <router-link class="option" tag="span" to="/login">书架</router-link>
    </div>
</template>

<script>
    export default {
        name: "Bar"
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .bar {
        width: 100%;
        height: 35px;
        line-height: 35px;
        margin-bottom: 10px;
        background: #ECF0F0;
        text-align: center;

        .option {
            display: inline-block;
            width: 20%;
            height: 100%;
            color: #000;
            font: 16px/1.5 'microsoft yahei';
        }
    }
</style>