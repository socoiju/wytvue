<template>
    <button @click="sendS($props)">喵喵B</button>
</template>
<script setup>
import {defineProps, ref} from "vue";

let a=ref(0);
let b=ref(0);
defineProps( ['getS',"k"]);

const sendS = (props) => {
    //console.log("我是组合式按钮B。从父组件来的k为" + props.k);
    a=props.k+1;
    b.value++;
    console.log(`B收到了新的点击，这是第${b.value}次`);
    props.getS(a);
}
</script>