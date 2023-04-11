<template>
<button @click="nt"><slot name="bt"></slot></button>
<!--如果包裹div给button，父组件的点击范围会超过按钮-->
</template>

<script setup>
function nt(){
    console.log('我是按钮C，我被点击啦 by buttoncountC');
}
</script>

<style scoped>

button{
    color:black;border:none;background-color: #d2d2d2;
    font-size:25px;min-width:100px;height:40px;

}
</style>