<template>
    <div>{{dataList.title}} {{dataList.summary}}</div>
    
</template>


<script>
import axios from 'axios'

export default {
    created(){
        let url = `https://bird.ioliu.cn/v2?url=https://api.douban.com/v2/movie/subject/${this.$route.params.movieId}`
        axios.get(url).then(res=>{
            // console.log(res.data);
            this.dataList = res.data;
            // console.log(this.dataList)
        })
    },
    data () {
        return {
            dataList:[]
        }
    }
}
</script>


<style lang="scss" scoped>



</style>
