<template>
  <div>
    <h3>0410的学习</h3>
    <p>点击计数：{{k}}</p>
    <buttoncountC @click="zj">
        <template #bt>增加1</template>
    </buttoncountC>
    <buttoncountC  @click="js">
        <template #bt>减少1</template>
    </buttoncountC>
    <buttoncountC  @click.stop="axiosxx"><!-- 为什么写了-stop，还是会触发按钮的click-->
        <template #bt>axios请求</template>
    </buttoncountC><!-- 为什么，用解构来赋值的话，debug那里有数据了，这里却不出现，再点一下增减按钮才出现-->
    <p>获得第{{k}}个数据：</p><h4>{{ti}}{{id}}</h4><p>{{dd}}</p>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import { useCounterStore } from '@/store/counter';
import buttoncountC from './xiaozujian/buttoncountC.vue';

const counter = useCounterStore();
let k=ref(counter.count);
//let{tt,ss}=['12','23'];
let id=ref('');
let ti=ref('');
let dd=ref('');

function axiosxx(){
    console.log('触发了父组件的函数！');
    k.value=counter.count;
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            id.value=`(${response.data[k.value].id})`;
            ti.value=response.data[k.value].title;
            dd.value=response.data[k.value].body;
            //({title:tt,body:ss}=response.data[k.value]);//用这个之后总是点另外俩按钮才触发页面显示不知道为什么
            console.log(dd);
        })
        .catch((error) => {
            console.error(error);
        });
}


function zj(){
    console.log('增加增加！');
    counter.increment();
    k.value=counter.count;

}
function js(){
    console.log('减去！');
    counter.decrement();
    k.value=counter.count;

}
</script>

<style >
h4{  font-size:25px;}
p{
    font-size:25px;
}
</style>