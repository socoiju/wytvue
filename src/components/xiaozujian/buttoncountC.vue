<template>
    <div><button @click="nt"><slot name="bt"></slot></button></div>
</template>
<script setup>
function nt(){
    console.log('我是按钮C，我被点击啦 by buttoncountC');
}
</script>

<style scoped>
button{
    color:black;border:none;background-color: #d2d2d2;font-size:25px;min-width:80px;height:40px;margin-left: 10px;
}
</style>