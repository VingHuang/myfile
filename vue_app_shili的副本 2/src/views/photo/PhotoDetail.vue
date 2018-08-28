<template>
    <router-link to='/photo'>
        <v-touch  class="img" @swipeleft='swipeleft' @swiperight='swiperight' :style="{background: 'url('+imgSrc+') no-repeat center/contain #000'}"></v-touch>
    </router-link>
</template>



<script>
export default {
    data () {
        return {
            nowIndex:-1,
            imgSrc:''      
        }
    },methods:{
        swipeleft(){
            this.nowIndex++;
            if(this.nowIndex == this.$store.state.photoList.length - 1){
                this.nowIndex = 0;
            }
        },
        swiperight(){
            this.nowIndex--;
            if(this.nowIndex == -1){
                this.nowIndex = this.$store.state.photoList.length -1;

            }
        }
    },
    created(){
        this.nowIndex = this.$route.params.iii;
        console.log(this.nowIndex)
    },watch:{
        nowIndex(){
            let nowImg = this.$store.state.photoList[this.nowIndex];
            if(nowImg){
                this.imgSrc = nowImg.src;
            }
        }
    },
}
</script>



<style lang="scss" scoped>
.img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1
}
</style>
