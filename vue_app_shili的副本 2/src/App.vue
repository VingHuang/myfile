<template>
  <div id="app">
    <common-header :selectMenu='selectMenu' ></common-header>
    <router-view  class="content" @switchTab='switchTab'/>
    <common-footer :MenuList='MenuList' :footBg='selectMenu.bgColor'></common-footer>
  </div>
</template>


<script>
import CommonHeader from '@/views/CommonHeader.vue'
import CommonFooter from '@/views/CommonFooter.vue'
export default {
  components:{
    CommonHeader,
    CommonFooter
  },methods:{
    switchTab(menuName){
        this.MenuList.filter(menu=>{
          if(menu.name === menuName){
            this.selectMenu = menu
          }
        })
    }
  },
  data () {
    return {
    MenuList:[{
    name:'movie',
    title:'电影',
    path:'/movie',
    bgColor:'#e54847'
  },{
    name:'book',
    title:'书籍',
    path:'/book',
    bgColor:'#009688'
  },{
    name:'music',
    title:'音乐',
    path:'/music',
    bgColor:'#795548'
  },{
    name:'photo',
    title:'照片',
    path:'/photo',
    bgColor:'#3f51b5'
  }],
  selectMenu:[]
    }
  }
  }
    

</script>


<style lang="scss">
.content{
  margin: 1rem 0;
  // height: 1000rem;
}
</style>
