<template>
    <button @click="nt"><slot name="bt"></slot></button>
    <input v-model="zhi">
</template>
<script setup>
import { useCounterStore } from '@/store/counter';
import {ref} from "vue";
const counter=useCounterStore;
let zhi=ref(0);
function nt(){
    counter.zhi=zhi.value;
    console.log('我是按钮C，我被点击啦，此外，store里的zhi值是'+counter.zhi);
}
</script>

<style scoped>
button{
    color:black;border:none;background-color: #d2d2d2;font-size:25px;min-width:80px;height:40px;margin-left: 10px;
}
</style>