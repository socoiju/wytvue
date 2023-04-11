<template>
  <h3>0410的学习</h3>
  <p>点击计数：{{dj}}</p>
  <input v-model="n">
  <el-button class="button1" @click="zj">增加{{n}}</el-button>
  <el-button class="button1" @click="js">减少{{n}}</el-button>
  <el-button class="button1" @click="axiosxx">axios请求</el-button><!-- 写了-stop，还是会触发按钮的click-->
  <p>获得第{{dj}}个数据(0-100)</p><h4>{{ti}}{{id}}</h4><p>{{dd}}</p>
  <el-button @click="kx">——</el-button>
  <p>获得第{{dj}}个defaultData数据(0-10)</p><h4>{{counter.moneyData[counter.count]}}</h4>
  <el-button  class="button1" round="8px" color="#626aef" :dark="isDark" type="primary">Primary</el-button>
  <el-button  class="button1"  type="success">Success</el-button>
  <el-button  type="success"> Success</el-button>
</template>

<script setup>

import {onBeforeMount,  ref} from "vue"
import axios from "axios"
import { useCounterStore } from '@/store/counter'
//import buttoncountC from './xiaozujian/buttoncountC.vue';
const counter = useCounterStore();
let dj=ref(counter.count);
let [id,ti,dd,n]= [ref(null),ref(''),ref(''),ref(1)];
//let data=[...counter.moneyData];

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
        //data=[...counter.moneyData];
        console.log(`处理完毕${counter.moneyData[counter.count]}`);
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
input:focus{
    border-radius:0px!important;
    border-width:1px!important;
}
input{
    background: white;
    color:black;
    border-color:black;
    border-radius:0px;
    border-width:1px;
    width:60px;height:28px;
    margin-left: 10px;
    /*border:none;background-color: #d2d2d2;*/
    /*font-size:25px;*/
}
.button1:hover{
    background: #ffffff !important;
    color: #4d4d4d !important;
    border-color:black!important;
    border-radius:0px!important;
    border-width:1px!important;
}
.button1:active{
    background: #e7e7e7 !important;
    color:black!important;
    border-color:black!important;
    border-radius:0px!important;
    border-width:1px!important;
}
.button1{
    background: white!important;
    color:black!important;
    border-color:black!important;
    border-radius:0px!important;
    border-width:1px!important;
    width-min:60px;height:28px;
    margin-left: 10px;
}


</style>