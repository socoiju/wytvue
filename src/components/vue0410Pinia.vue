<template>
  <h3>0410的学习</h3>
  <p>点击计数：{{dj}}</p>
  <input v-model="n">
  <buttoncountC @click="zj">
    <template #bt>增加{{n}}</template>
  </buttoncountC>
  <buttoncountC  @click="js">
    <template #bt>减少{{n}}</template>
  </buttoncountC>
  <buttoncountC  @click="axiosxx"><!-- 写了-stop，还是会触发按钮的click-->
    <template #bt>axios请求</template>
  </buttoncountC>
<p>获得第{{dj}}个数据(0-100)</p><h4>{{ti}}{{id}}</h4><p>{{dd}}</p>
<button @click="kx">——</button>
<p>获得第{{dj}}个defaultData数据(0-10)</p><h4>{{data[counter.count]}}</h4>
</template>

<script setup>

import {onBeforeMount,  ref} from "vue"
import axios from "axios"
import { useCounterStore } from '@/store/counter'
import buttoncountC from './xiaozujian/buttoncountC.vue';
const counter = useCounterStore();
let dj=ref(counter.count);
let [id,ti,dd,n]= [ref(null),ref(''),ref(''),ref(1)];
let data=[...counter.moneyData];

// let id=ref('');
// let ti=ref('');
// let dd=ref('');
// let n=ref(1);
// let [dt, nm, zy, hq, dq,zd]= [ref(null),ref(null),ref(null),ref(null),ref(null),ref(null)];
// [dt, nm, zy, hq, dq,zd]=counter.moneyDataB[k];

//data=[...counter.moneyData[counter.count]];
// 这句的失败原因是右边的第0个是花括号的对象而不是数组！

function axiosxx(){//获取网上的json
    console.log('顺利运行ing');
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            ({title:ti.value,body:dd.value}=response.data[dj.value]);
            id.value=`(${response.data[dj.value].id})`;//这行不运行
        })
        .catch((error) => {
            console.error(error);
        });
}//获取网上的json

function kx(){
    if(counter.count<=counter.moneyData.length){
        data=[...counter.moneyData];
        console.log(`处理完毕${data[counter.count]}`);
    }else{
        console.log("没有这个值啦");
    }
}
onBeforeMount(() => {
    counter.tableData()
    axiosxx()
})
function zj(){
    console.log('增加增加！');
    counter.zhi=Number(n.value);
    counter.increment();
    dj.value=counter.count;
}
function js(){
    console.log('减去！');
    counter.zhi=Number(n.value);
    counter.decrement();
    dj.value=counter.count;

}
</script>

<style >
h4,p{font-size:15px;}
input{
    border:none;background-color: #d2d2d2;
    font-size:25px;width:100px;height:40px;
}
</style>