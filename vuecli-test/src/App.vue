<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to='/mine'>mine</router-link> |
      <router-link to='/her'> her</router-link>  | 
      <router-link to='/movie'> movie</router-link>
    </div>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fade-enter{
  opacity: 0;
}
.fade-enter-active{
  transition: opacity 1s ease;
}
.fade-enter-to{
  opacity: 1;
}

.fade-leave{
  transform: translateX(0);
}
.fade-leave-active{
  transition: transform 0.5s ease;
}
.fade-leave-to{
  transform: translateX(100%);
}

</style>
