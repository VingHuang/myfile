<template>
    <ul class="photo clear">
        <li @click="goDetail(index)" v-for="(photo,index) in $store.state.photoList" :key="photo.src" class="photo-list">
            <img :src="photo.src" alt="">
        </li>
    </ul>
</template>


<script>
import axios from 'axios'
export default {
 created() {
    this.$emit("switchTab", "photo");
    axios.get("/data/photodata.json").then(res => {
    //   this.photoList = res.data.photoData;
        this.$store.commit('setPhotoList', res.data.photoData);
        // console.log(this.$store.state.photoList)
    });
  },methods:{
      goDetail(index){
            this.$router.push(`/photoDetail/${index}`)
            // console.log(index)
      }
  }
}
</script>



<style lang="scss" scoped>

.photo{
    &-list{
        float: left;
        width: 50%;
    }
}
.clear::after{
    content:'';
    display: block;
    clear: both;
}
</style>
