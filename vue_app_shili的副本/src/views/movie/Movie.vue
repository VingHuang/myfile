<template>
    <div>
        <ul>
            <li v-for='movie in movieList' :key='movie.id' class="movie" @click='gotoDetail(movie.id)'>
                <div class="movie-img">
                    <img :src="movie.images.large" alt="">
                </div>
                <div class="movie-info">
                    <div class="movie-info-title">{{movie.title}}</div>
                    <div class="movie-info-average">观众评：<span>{{movie.rating.average}}</span></div>
                    <div class="movie-info-star">主演
                        <span v-for="star in movie.casts" :key="star.id">{{star.name}}&nbsp;</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="loading" v-show="isloading"><img src="@/assets/img/loading.gif" alt=""></div>
        <div v-show="isEnd"><h3>数据到底了</h3></div>
    </div>
</template>


<script>
import axios from "axios";

export default {
    created(){
        this.$emit('switchTab','movie');
        this.getData();
    },data () {
        return {
            movieList:[],
            isloading:true,
            isEnd:false
        }
    },methods:{
        getData(){
        this.isloading = true;
        let url2 = 'https://api.myjson.com/bins/114p8s';
        axios.get(url2).then(res => {
        // this.movieList = res.data.subjects;
        // console.log(this.movieList)
        console.log(res.data.subjects.slice(this.movieList.length,this.movieList.length+5));
        let getList = res.data.subjects.slice(this.movieList.length,this.movieList.length+5);
        console.log(getList);
        if(getList<=5){
            this.isEnd = true;
        }
        this.movieList = this.movieList.concat(getList);
        this.isloading = false;
    })
    },gotoDetail(movieId){
        this.$router.push(`/moviedetail/${movieId}`);
    }
    },mounted(){
        window.onscroll = () =>{
            let scrollTop =  document.documentElement.scrollTop; //滚动条距离html的高度
            let scrollHeight = document.documentElement.scrollHeight; //总的高度
            let clientHeight = document.documentElement.clientHeight; //当前页面的高度
            console.log(scrollTop,scrollHeight,clientHeight);
            if(scrollTop + clientHeight == scrollHeight && !this.isEnd){
                this.getData();
            }
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
}
.loading {
  text-align: center;
  position: fixed;
  bottom: 1rem;
  width: 100%;
  img {
    width: 2rem;
  }
}

</style>
