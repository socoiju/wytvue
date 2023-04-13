<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">-->
  <HelloWorld msg="Vue.js"/>
<!--  <vue0403/>-->
<!--  <vue0404/>-->
<!--  <vue0405/>-->
<!--    <vue0406/>-->
<!--  <vue0407a/>-->
<!--  <vue0407b/>-->
<!--    <vue0410Pinia/>-->
<vue0412Table/>
<linShi/>


</template>

<script>
import HelloWorld from './components/HelloWorld.vue' //@代表绝对路径中的src文件夹，.代表当前文件所在目录
// import vue0403 from "@/components/vue0403.vue";
// import vue0404 from "@/components/vue0404.vue";
// import vue0405 from "@/components/vue0405.vue";
// import vue0406 from "@/components/vue0406.vue";
// import vue0407a from "@/components/vue0407a.vue";
// import vue0407b from "@/components/vue0407b.vue";
// import vue0410Pinia from "@/components/vue0410Pinia.vue";
import vue0412Table from "@/components/vue0412Table.vue";
import linShi from"@/components/linShi.vue";
export default {
  name: 'App',
  components: {
    HelloWorld,
    // vue0403,
    // vue0404,
    // vue0405,
    // vue0406,
    // vue0407a,
    //   vue0407b,
    //   vue0410Pinia
      vue0412Table,
      linShi
  }
}
</script>

<style>

#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
