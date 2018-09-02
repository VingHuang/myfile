<template>
    <div>
        <div @click="toggle = !toggle">歌单</div>
        <div></div>
        <transition name="slide" >
            <ul v-show="toggle" class="slide-c">
                <li v-for="(item,index) in MusicList" :key="index" @click="isTitle(index)" :class="NowIndex==index?'selected':'' ">
                    {{item.title}}
                </li>
            </ul>
        </transition>
        <div class="audio">
            <audio ref="musicAudio" controls></audio>
        </div>
    </div>
</template>



<script>
import axios from 'axios'
export default {
    props:['MusicList'],
    data () {
        return {
            toggle:true,
            NowIndex:-1,
            MusicLrc:'',
            lrcList:[]
        }
    },methods:{
        isTitle(index){
            this.NowIndex = index;
        },
        parseLrc(data){
           let line = data.split('\n');
            // console.log(line);
            line.forEach(elem => {
                let time = elem.match(/\[\d{2}:\d{2}.\d{2}\]/);
                // console.log(time)
                if(time!=null){
                    let lrc = elem.split(time)[1];
                    // console.log(lrc)
                    let zTime = time[0].match(/(\d{2}):(\d{2}).(\d{2})/);
                    // console.log(zTime)
                    let time2Second = parseInt(zTime[1]) * 60 +parseInt(zTime[2]) +parseInt(zTime[3]) /1000;
                        this.lrcList.push({
                            lrc:lrc,
                            time:time2Second
                        })
                    }
            });
            
        }  
},watch:{
    NowIndex(){
        let onMusic = this.MusicList[this.NowIndex];
        axios.get('/' + onMusic.lrc).then(res=>{
            // console.log(this.data);
            let data = res.data
            this.parseLrc(data)
            
        })       
    }   
},mounted(){

}
}
</script>



<style lang="scss" scoped>
.slide-c{
    background: #ff0036;
    color: #fff;
    .selected{
        color:#2929
    }
}
.slide{
&-enter {
    opacity: 0;
    &-to {
      opacity: 1;
    }
    &-active {
      transition: all 1s ease;
    }
  }
  &-leave {
    opacity: 1;
    &-to {
      opacity: 0;
    }
    &-active {
      transition: all 1s ease;
    }
  }  
}
.audio {
  background: #ccc;
  height: 1rem;
  position: fixed;
  bottom: 1rem;
  width: 100%;
}

</style>
