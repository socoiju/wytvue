<template>
  <h3>0410的学习</h3>
  <p>点击计数：{{k}}</p>
  <input v-model="n">
  <buttoncountC @click="zj">
    <template #bt>增加{{n}}</template>
  </buttoncountC>
  <buttoncountC  @click="js">
    <template #bt>减少{{n}}</template>
  </buttoncountC>
  <buttoncountC  @click.stop="axiosxx"><!-- 为什么写了-stop，还是会触发按钮的click-->
    <template #bt>axios请求</template>
</buttoncountC><!-- 为什么，用解构来赋值的话，debug那里有数据了，这里却不出现，再点一下增减按钮才出现-->
<p>获得第{{k}}个数据：</p><h4>{{ti}}{{id}}</h4><p>{{dd}}</p>
  <button type="danger"></button>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import { useCounterStore } from '@/store/counter';
import buttoncountC from './xiaozujian/buttoncountC.vue';
import button from './elezujian/button.vue';
const counter = useCounterStore();
let k=ref(counter.count);
let [id,ti,dd,n]= [ref(null),ref(''),ref(''),ref(1)];
// let id=ref('');
// let ti=ref('');
// let dd=ref('');
// let n=ref(1);
function axiosxx(){
    console.log('顺利运行ing');
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            ({title:ti.value,body:dd.value}=response.data[k.value]);
            id.value=`(${response.data[k.value].id})`;//这行不运行
        })
        .catch((error) => {
            console.error(error);
        });
}


function zj(){
    console.log('增加增加！');
    counter.zhi=Number(n.value);
    counter.increment();
    k.value=counter.count;

}
function js(){
    console.log('减去！');
    counter.zhi=Number(n.value);
    counter.decrement();
    k.value=counter.count;

}
</script>

<style >
h4,p{font-size:25px;}
input{
    border:none;background-color: #d2d2d2;
    font-size:25px;width:100px;height:40px;
}
</style>