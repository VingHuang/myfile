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
            // console.log(res.data.musicData)
            this.MusicList = res.data.musicData;
            // console.log(this.MusicList)
        });
        
    },
 components: {
        Player
    },data () {
        return {
            MusicList:[],
            song:[]
        }
    }
}
</script>



<style lang="scss" scoped>

</style>
