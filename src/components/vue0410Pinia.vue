<template>
  <h3>0410的学习</h3>
  <p>点击计数：{{dj}}</p>
  <input v-model="n">
  <el-button class="button1" @click="zj">增加{{n}}</el-button>
  <el-button class="button1" @click="js">减少{{n}}</el-button>
  <el-button class="button1" @click="axiosxx">axios请求</el-button><!-- 写了-stop，还是会触发按钮的click-->
  <div style="display:flex;justify-content: space-between;margin-top:10px;margin-bottom:10px;height:200px">
      <el-card class="box-card" >
          <el-scrollbar height="400px">
            <div class="card-header"><span>axios 获得第{{dj}}个数据(0-100)</span></div>
            <div  class="text item">{{ti}}{{id}}<br>{{dd}}</div>
          </el-scrollbar>
    </el-card>
    <el-card class="box-card" style="margin-left:10px">
        <div class="card-header">
            <span>pinia 获得第{{dj}}个defaultData数据(0-10)</span>
        </div>
        <div  class="text item">{{counter.moneyData[counter.count]}}</div>
    </el-card>
  </div>
  <el-button  class="button1" round="8px" color="#626aef">qwer</el-button>
  <el-button  class="button1"  type="success">Success</el-button>
  <el-button  type="success"> Success</el-button>

  <el-table border   :data="tableData" style="margin-top:10px;" height="250" :tree-props="{children: 'children'}">
      <el-table-column contenteditable="true" class="dataCell" prop="dt" label="日付" width="180"/>
      <el-table-column class="nameCell" prop="nm" label="相手勘定" width="180"/>
      <el-table-column prop="zy" label="摘要"/>
      <el-table-column class="redMoneyCell" prop="hq" label="出金"/>
      <el-table-column class="moneyCell" prop="dq" label="入金"/>
      <el-table-column label="残高">
        <template v-slot="scope">
          {{ counter.cangaoData[scope.$index] }}
        </template>
      </el-table-column>
      <el-table-column class="moneyCell" prop="children" label="调试用"/>
  </el-table>
<!--      <el-table border :data="counter.cangaoData" style="width: 100%" height="250">-->
<!--          <el-table-column contenteditable="true" class="dataCell" prop="dt" label="日付" width="180"/>-->
<!--      </el-table>-->
<!--  </div>-->

  <el-button  class="button1" @click="addrow()">追加</el-button>
  <br><br>
  <br><br>

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
let tableData=[...counter.moneyData];
//let balanceData=[...counter.cangaoData];
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

function addrow(){
  counter.addrow()
  counter.cangaoInpu()
  tableData=[...counter.moneyData];
  console.log(`处理完毕${counter.moneyData[counter.count]}`);
}
onBeforeMount(() => {
    counter.tableData()
    axiosxx()
    counter.cangaoInpu()
    tableData=[...counter.moneyData];
    console.log("初始化所有数据啦")

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
h4,p{font-size:14px;}
input:focus{
    outline: none;
}
input{
    background: white;
    color:black;
    border-color:black;
    border-radius:0;
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
    border-radius:0 !important;
    border-width:1px!important;
}
.button1:active{
    background: #e7e7e7 !important;
    color:black!important;
    border-color:black!important;
    border-radius:0!important;
    border-width:1px!important;
}
.button1{
    background: white!important;
    color:black!important;
    border-color:black!important;
    border-radius:0!important;
    border-width:1px!important;
    min-wight:60px;height:28px;
    margin-left: 10px;
}
>>>.moneyTable{

    color: #c52fef !important;
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
    justify-content: left;
    text-align:left;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    background: white!important;
    border-color:black!important;
    border-radius:0px!important;
    border-width:1px!important;
    max-wight: 300px!important;
    box-shadow:none!important;

}

.el-table thead,th{
    color:black!important;
    font-weight:normal!important;
    font-size: 16px;
}
.el-table td{
    color:black!important;
    font-weight:normal!important;
    font-size: 15px;
}

.redMoneyCell{/*出金红色还没有成功*/
    color:red!important;
    font-weight: normal!important;
}
</style>