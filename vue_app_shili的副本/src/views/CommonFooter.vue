<template>

        <ul class="footer" :style="{background:footBg}">
            <li  class="footer-list" v-for='(menu,index) in MenuList' :key="index" >
                <router-link :to="menu.path">{{menu.title}}</router-link>
            </li>
        </ul>

</template>


<script>
export default {
    props:['MenuList','footBg']
}
</script>



<style lang="scss" scoped>
.footer{
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    position: fixed;
    background: #ff0036;
    display: flex;
    line-height: 1rem;
    &-list{
        flex-grow: 1;
        text-align: center;
        a{
            color: #ccc;
            outline:none;
            &.router-link-active{
                color: #fff
            }
        }
    }
}

</style>
