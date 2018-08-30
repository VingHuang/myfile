<template>
  <div id="app">
    <commonheader :selectMenu='selectMenu'></commonheader>
    <router-view class="content"  @switchTab='switchTab' />
    <commonfooter :MenuList='MenuList' :footerBg='selectMenu.bgColor'></commonfooter>
  </div>
</template>


<script>
import commonheader from '@/views/CommonHeader.vue'
import commonfooter from '@/views/CommonFooter.vue'
export default {
  components:{
    commonheader,
    commonfooter,
  },
    methods: {
    switchTab(menuName){
      this.MenuList.forEach(menu => {
        if(menu.name === menuName){
          this.selectMenu = menu;
        }
      });
    }
  },
  data () {
    return {
      MenuList:[{
          name:'movie',
          title:'电影',
          bgColor:'#e54847',
          path: '/movie'
        },{
          name:'music',
          title:'音乐',
          bgColor:'#000',
          path: '/music'
        },{
          name:'book',
          title:'书籍',
          bgColor:'#795548',
          path: '/book'
        },{
          name:'photo',
          title:'照片',
          bgColor:'#009688',
          path: '/photo'
        },
        ], 
        selectMenu: {}
    
    }
  }
}
</script>

<style lang="scss">
.content{
  margin: 1rem 0;
}

</style>
