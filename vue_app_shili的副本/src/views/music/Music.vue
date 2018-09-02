<template>
        <Player :MusicList='MusicList'></Player>
</template>


<script>
import Player from '@/components/Player.vue';
import axios from  'axios';
export default {
    created(){
        this.$emit('switchTab','music');
        axios.get('/data/musicdata.json').then(res=>{
            this.MusicList = res.data.musicData;
            // console.log(this.MusicList)
        })
    },data () {
        return {
            MusicList :[]   
        }
    },
    components:{
        Player
    }
}
</script>



<style lang="scss" scoped>

</style>
