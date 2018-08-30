<template>
    <ul class="footer" :style="{background:footerBg}">
       <li v-for="(menu,index) in MenuList" :key="index" class="footer-menu">
           <router-link :to='menu.path'>
               {{menu.title}}
           </router-link>
       </li>
    </ul>
</template>

<script>
export default {
    props: ['MenuList','footerBg']
}
</script>

<style lang="scss" scoped>
    .footer{
        position: fixed;
        display: flex;
        bottom: 0;
        left: 0;
        height: 1rem;
        width: 100%;
        line-height: 1rem;
        background: #ff0036;
        &-menu{
            text-align: center;
            flex-grow: 1;
            a{
                color: #fff;
                outline: none;
               
            }
        }
       
    }
</style>

