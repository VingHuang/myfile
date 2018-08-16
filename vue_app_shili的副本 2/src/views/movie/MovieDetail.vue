<template>
    <div>
        {{dataList.title}}
        <p>{{dataList.summary}}</p>

        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data () {
        return {
            dataList:{}
        }
    },
    created(){
        let url = `https://bird.ioliu.cn/v2?url=https://api.douban.com/v2/movie/subject/${this.$route.params.movieId}`
        axios.get(url).then(res=>{
            this.dataList = res.data;
            console.log(this.dataList);
        })
    }
}
</script>


<style lang="sass" scoped>

</style>
