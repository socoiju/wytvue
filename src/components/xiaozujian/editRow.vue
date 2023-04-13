<template>
    <p>1234567</p>
    <table>
        <tbody>
        <tr>
            <td contenteditable="true" @input="handleInput(0, 'dt') ">{{roww.dt}}</td>
            <td contenteditable="true" @input="handleInput(0, 'nm') ">{{roww.nm}}</td>
            <td contenteditable="true" @input="handleInput(0, 'zy')">{{roww.zy}}</td>
            <td style="color:red" contenteditable="true" @input="handleInput(0, 'hq')">{{roww.hq}}</td>
            <td contenteditable="true" @input="handleInput(0, 'dq')">{{roww.dq}}</td>
        </tr>
        </tbody>
    </table>
    <button @click="saveRow">保存</button>
</template>

<script setup>
import { useCounterStore } from '@/store/counter'
import { useRightClickMenuStore } from '@/store/rightClickMenu'
const counter = useCounterStore();//⭐试试改成响应式
const rightClickMenuS = useRightClickMenuStore();
// const key=rightClickMenuS.row.key;
console.log('右键获取的row')
console.log(rightClickMenuS.row);
let roww ={...rightClickMenuS.row};
let key=rightClickMenuS.row.key;
console.log('我被渲染啦')
console.log(key);
console.log('counter里的mD');
console.log(counter.moneyData[key]);

function handleInput(index,newda){
    roww[newda] = event.target.innerHTML;
    console.log('我被更改啦')
    console.log(roww);
    counter.moneyData[key].dt=roww.dt;
    console.log('改变了原文日期');
    counter.moneyData[key].nm=roww.nm;
    counter.moneyData[key].zy=roww.zy;
    counter.moneyData[key].hq=roww.hq;
    counter.moneyData[key].dq=roww.dq;
    console.log(roww);
}
function saveRow(){
    counter.cangaoInpu()
    counter.cangaoRender()
}
</script>


<style scoped>
table{
    font-size: 18px!important;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    border-collapse:collapse;
}
table th{
    text-align:center!important;
}
table tr{
    min-height: 1em;
    border: 1px solid black;
}
table td{
    color:black!important;
    font-weight:normal!important;
    /*font-size: 15px;*/
    border-top: 1px solid black;
    border-left: 1px solid black;
    min-width:50px;
}
</style>