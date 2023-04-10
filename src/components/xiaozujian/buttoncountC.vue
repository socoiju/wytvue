<template>
    <div>
        <button @click="nt"><slot name="bt"></slot></button>
    </div>
    <input v-model="zhii">
</template>
<script setup>

import { useCounterStore } from '@/store/counter';
import {ref} from "vue";
const counter=useCounterStore;
let zhii=ref('');
function nt(){
    counter.zhi=Number(zhii.value);
    console.log(`我是按钮C，我被点击啦，此外，store里的zhi值是${counter.count}`);
}
</script>

<style scoped>
button{
    color:black;border:none;background-color: #d2d2d2;font-size:25px;min-width:80px;height:40px;margin-left: 10px;
}
</style>