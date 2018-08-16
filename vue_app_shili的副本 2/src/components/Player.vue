<template>
    <div>

            <div class="album">
                <div class="album-marsk" :style="{background:'url('+ albumImg + ') no-repeat center/cover'}"></div>
                <div class="album-img">
                    <img :src="albumImg" alt="">
                </div>
                <div class="album-info">
                    <p class="album-info-title">{{albumTitle}}</p>
                    <p class="album-info-author">{{albumAuthor}}</p>
                    <div class="album-info-player" >
                        <i class="icon iconfont icon-shangyishou" @click="prev"></i>
                        <i class="icon iconfont icon-bofang"  @click="play" v-show="!isPlay"></i>
                        <i class="icon iconfont icon-zanting" @click="pause" v-show="isPlay"></i>
                        <i class="icon iconfont icon-xiayishou" @click="next"></i>
                        <span class='album-info-menu' @click="isMenu=!isMenu">歌单</span>
                    </div>
                </div> 
            </div>
        <!-- 歌词 -->
            <div >
                <ul class="geci" ref="geciList">
                    <li :class=" [lrcIndex==index?'selected': '' ]" v-for="(lrc,index) in lrcList" :key="lrc.time">
                        {{lrc.lrc}}
                    </li>
                </ul>
            </div>
        <!-- 歌单 -->
        <transition name="slide">
            <ul class="music-menu" v-show="isMenu">
                <li v-for='(music,index) in MusicList' :key="index" @click="selectedItem(index)" :class="['music-menu-item', nowIndex==index?'selected':'']">
                    <span>{{music.title}}&nbsp;-&nbsp;</span> <span>{{music.author}} </span>
                </li>
            </ul>
        </transition>
        <div class="audio">
            <audio ref="musicAudio" @play="isPlay=true" @pause="isPlay=false" class="audio-ctrl" :src="musicSrc" autoplay controls></audio>
        </div>
    </div>

</template>

<script>
import "@/assets/font/iconfont.css";
import axios from 'axios'
export default {
    props:['MusicList'],
    methods:{
        selectedItem(index){
            this.nowIndex = index;      
        },
        play(){
            this.$refs.musicAudio.play();
        },
        pause(){
            this.$refs.musicAudio.pause();
        },
        prev(){
            this.nowIndex--
            if(this.nowIndex==-1){
                this.nowIndex = this.MusicList.length -1;
            }
        },
        next(){
            this.nowIndex++
            if(this.nowIndex==this.MusicList.length){
                this.nowIndex = 0
            }
        },
            //将歌词 分割成 时间跟歌词 放到 lrcList 数组中
        parseLrc(text){
            let line = text.split('\n');
            // console.log(line)
            line.forEach(elem => {
                let time = elem.match(/\[\d{2}:\d{2}.\d{2}\]/);
                if(time != null){
                    let lrc = elem.split(time)[1];
                    let timeReg = time[0].match(/(\d{2}):(\d{2}).(\d{2})/);
                    // console.log(timeReg);
                     let time2Seconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000;
                    this.lrcList.push({
                        time:time2Seconds,
                        lrc: lrc
                    });
                }
                // console.log(this.lrcList)
            });
            
        }
    },
    watch:{
        nowIndex(){
            let nowMusic = this.MusicList[this.nowIndex]
            this.albumAuthor = nowMusic.author;
            this.albumImg = nowMusic.musicImgSrc;
            this.albumTitle = nowMusic.title;
            this.musicSrc = nowMusic.src;
            this.lrcList = [];
            this.lrcIndex = -1;
            axios.get('/' + nowMusic.lrc).then(res=>{
                this.parseLrc(res.data);
            // console.log(res.data)

            })
           
        }
    },mounted(){
        let musicAudio = this.$refs.musicAudio;
        this.$refs.musicAudio.addEventListener('timeupdate',()=>{
            let currentTime = musicAudio.currentTime;
            this.lrcList.forEach((elem,index)=>{
                if(Math.ceil(elem.time) >= currentTime &&  Math.floor(elem.time) < currentTime){
                    this.lrcIndex = index;
                    this.$refs.geciList.scrollTop = this.lrcIndex * 25;

                }   
            })
            // console.log(currentTime);

        })
    },
    data () {
        return {
            nowIndex:-1,
            albumImg:'http://img3.imgtn.bdimg.com/it/u=1039246244,1205520727&fm=27&gp=0.jpg',
            albumTitle:'',
            albumAuthor:'',
            musicSrc:'',
            isMenu:true,
            isPlay: false,
            lrcList:[],
            lrcIndex:-1

        }
    }
}
</script>


<style lang="scss" scoped>
.music-menu{
    position: fixed;
    bottom: 1rem;
    background: #2a2929;
    color: #dcdbdb;
    width: 100%;
    text-align: center;
    height: 4rem;
    overflow-x: scroll;
    &-item{
        padding: 0.2rem;
    }
    .selected{
        color: #299557;
    }
   
}

.album{
    display: flex;
    width: 100%;
    height: 2.1rem;
    &-marsk{
        position: absolute;
        height: 20%;
        width: 100%;
        filter: blur(20px);
        z-index: -1;
    }
    &-img{
        flex-grow: 1;
        width: 0;
        img{
            width: 100%;
        }  
    }
    &-info{
        flex-grow: 3;
        width: 0;
        &-title {font-size: 0.5rem;}
        &-player{
            position: absolute;
            top: 23%;
            left: 45%
        }
        &-menu{
            margin-left: 1.3rem
        }
    }
}
.slide{
&-enter {
    transform: translateY(100%);
    &-to {
      transform: translateY(0);
    }
    &-active {
      transition: transform 1s ease;
    }
  }
  &-leave {
    transform: translateY(0);
    &-to {
      transform: translateY(100%);
    }
    &-active {
      transition: transform 1s ease;
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

.geci{
    text-align: center;
    // margin-top: 4rem;
    padding-top:2rem; 
    position: fixed;
    left: 0;
    top: 3.3rem;
    right: 0;
    bottom: 2rem;
    z-index: -1;
    overflow-y: scroll;
  .selected{
    color: #299557;
    font-size: 120%;
  }
}
</style>
