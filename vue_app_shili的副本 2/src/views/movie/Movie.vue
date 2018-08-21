<template>
    <div>
        <ul>
            <li @click="gotoDetail(movie.id)" v-for="movie in movieList" :key="movie.id" class="movie">
                <div class="movie-img">
                    <img :src="movie.images.large" alt="">
                </div>
                <div class="movie-info">
                    <div class="moive-info-title">{{movie.title}}</div>
                    <div>观众评：<span class="movie-info-average">{{movie.rating.average}}</span></div>
                    <div class="moive-info-star">
                        主演：<span v-for="item in movie.casts" :key="item.id">{{item.name}}&nbsp;</span>
                    </div>
                </div>
            </li>
        </ul>

        <div class="loading" v-show="isLoading"><img src="@/assets/img/loading.gif" alt=""></div>
        <div class="end" v-show="isEnd">
            <h3>数据到底了</h3>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    created(){
        
        this.$emit('switchTab', 'movie');
        this.getDate();
    },methods:{
        gotoDetail(movieId){
    this.$router.push(`/moviedetail/${movieId}`);
    },
        getDate(){
        let url2 = 'https://api.myjson.com/bins/r1m98';
        this.isLoading = true;
        axios.get(url2).then(res=>{
            // console.log(res.data.subjects)
            let getList = res.data.subjects.slice(
                this.movieList.length,
                this.movieList.length + 5);
                console.log(getList.length);
            if (getList.length < 5) {this.isEnd = true;}
            this.movieList = this.movieList.concat(getList);
            this.isLoading = false;
        })
        }
    },mounted() {
    window.onscroll = () => {
      let scrollTop = document.documentElement.scrollTop;//滚动条距离HTML 的高度
      let scrollHeight = document.documentElement.scrollHeight; //总高度
      let clientHeight = document.documentElement.clientHeight; //当前页面高度
    //   console.log(scrollHeight, scrollTop, clientHeight);
      if (scrollHeight == scrollTop + clientHeight && !this.isEnd) {
        // 请求数据
        this.getDate();
      }
    };
  },data () {
        return {
            movieList:[],
            isLoading:true,
            isEnd:false
        }
    }
}
</script>


<style lang="scss" scoped>
    .movie{
        display: flex;
        padding: 0.1rem;
        border: 0.001rem solid #ccc;
        &-img {
            flex-grow: 1;
            width: 0;
            img{
                width: 100%;
            }
        }
   &-info {
    flex-grow: 3;
    width: 0;
    margin-left: 0.2rem;
    &-title {
      color: #333;
      font-weight: 700;
      font-size: 0.34rem;
    }
    &-average {
      font-weight: 700;
      color: #faaf00;
    }

    &-star {
      color: #666;
      font-size: 0.26rem;
    }
  }
.loading {
  text-align: center;
  position: fixed;
  bottom: 1rem;
  width: 100%;
  img {
    width: 3rem;
  }
}
}
</style>
