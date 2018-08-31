<template>
    <div class="header" :style="{background: selectMenu.bgColor}">
        <span class="header-home">首页</span>
        <h3 class="header-title">{{ selectMenu.title?selectMenu.title:'电影'}}</h3>
    </div>
</template>


<script>
export default {
    props:['selectMenu']
}
</script>



<style lang="scss" scoped>
.header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    background: #ff0036;
    line-height: 1rem;
    &-title{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%)
    }
    &-home{
        margin-left: 0.2rem;
    }
}


</style>
