<template>
<div style="height:250px">
  <h3>0412-0413的学习-表格制作</h3>
  <input v-model="n">
  <el-button class="button1">数组提取</el-button>
  <el-button class="button1" @click="counter.tableData(),counter.cangaoInpu(),counter.cangaoRender()">mD再计算调试用</el-button>
  <el-card class="box-card" style="margin-top:10px">
      <div class="card-header">
          <span>pinia 获得第{{n}}个defaultData数据(0-6)</span>
      </div>
      <div  class="text item">{{counter.moneyData[n]}}</div>
  </el-card>
</div>
<!--  @expand="handleExpand"-->
<!--  @row-click="clickRow"-->
<!--  height="350"-->
    <div style="width:1000px;justify: center;position:relative">
      <right-click-menu @mouseenter="mouseInMenuC" @click="clickDeleteMenu" v-show="showMenu==true" :style="{position:'absolute',left:menuPosition.x+'px',top:menuPosition.y+'px'}"/>
      <editRow v-if="rightClickMenuS.menuEditRow==true" :style="{position:'absolute',left:menuPosition.x+'px',top:menuPosition.y+'px'}"/>
      <el-table
              border
              :data="counter.moneyData"
              style="margin-top:10px;"
              width="750"
              row-key="key"
              @collapse="handleCollapse"
              @row-contextmenu="menu"
              @click="clickDeleteMenu"
              ref="tablePosition"
      >
        <el-table-column sortable @click-right="menu" width="170px" class="dataCell" prop="dt" label="日付"/>
        <el-table-column width="150px" class="nameCell" prop="nm" label="相手勘定"/>
        <el-table-column editable prop="zy" label="摘要"/>
        <el-table-column width="100px" class="redMoneyCell" prop="hq" label="出金"/>
        <el-table-column width="100px" class="moneyCell" prop="dq" label="入金"/>
        <el-table-column width="100px" label="残高">
          <template v-slot="scope">
            {{ counter.cangaoRenderData[scope.$index] }}
          </template>
        </el-table-column>
<!--      <el-table-column class="moneyCell" prop="children" label="调试用"/>-->
      </el-table>
    </div>
<!--      <el-table border :data="counter.cangaoData" style="width: 100%" height="250">-->
<!--          <el-table-column contenteditable="true" class="dataCell" prop="dt" label="日付" width="180"/>-->
<!--      </el-table>-->
<!--  </div>-->
  <el-button  class="button1" @click="addRow()" style="margin-top:10px">追加</el-button>
  <el-button  class="button1" @click="addRow()" style="margin-top:10px">删除空行</el-button>
  <el-button  class="button1" style="margin-top:10px">导出</el-button>
  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>


</template>

<script setup>
import {onBeforeMount, onMounted, ref, toRef} from "vue"
//import axios from "axios"
//import { storeToRefs } from 'pinia'响应式之后再试
import { useCounterStore } from '@/store/counter'
import { useRightClickMenuStore } from '@/store/rightClickMenu'
import rightClickMenu from"./xiaozujian/rightClickMenu.vue"
import editRow from"./xiaozujian/editRow.vue"
// import { getCurrentInstance } from 'vue'//为了获得表格位置来计算右键菜单出现点1
const counter = useCounterStore();//⭐试试改成响应式
const rightClickMenuS = useRightClickMenuStore()
const tablePosition=ref(null)
const table = toRef(tablePosition, 'value')
let n=ref(1)
//let tableData=ref([...counter.moneyData])
let showMenu=ref(false)
let menuPosition={x:100,y:120}
let tableOffset={x:0,y:0}
let timer = null;
const TableRect = () => {//获取表格的页面坐标
    // 获取组件实例的 DOM 元素
    const tableElem = table.value?.$el
    if (tableElem) {
        return tableElem.getBoundingClientRect()
    }
    return null
}

function mouseInMenuC(){//鼠标进入右键菜单，取消菜单自毁计时
    clearInterval(timer);
    timer = null;
}
function clickDeleteMenu(){//❓左键点击外面（当没有进入的时候）问题是现在设置的是表格内部，如果点其他地方还是没用 如何监控一个任意处的点击
    showMenu.value=false;
    clearInterval(timer);
    timer = null;
}
function menu(row, column, event){

    rightClickMenuS.row=row;
    event.preventDefault();
    if(!(showMenu.value==false)){
        showMenu.value=false;
        // clearInterval(timer);
        // timer = null;
    }
    console.log(event);
    if ("zd" in row&&!(row.zd==3)){//右键的编辑对子行不生效
        //console.log(`我这里有zd哦！！！`)
        // tableOffset={x:TableRect().x,y:TableRect().y};
        menuPosition.x=event.pageX-tableOffset.x+1;
        menuPosition.y=event.pageY-tableOffset.y+1;
        //console.log(`⭐我获得了右键点击的坐标值，X为${menuPosition.x}，Y为${menuPosition.y}`);
        showMenu.value=true;
        // timer = setInterval(() => {
        //     showMenu.value=false;
        //     clearInterval(timer)
        //     timer = null;
        // }, 1500);
    }
}
function handleCollapse(){
    counter.cangaoInpu()
}
function addRow(){
  counter.addRow(counter.moneyData.length-1)
  counter.cangaoInpu()
  //tableData.value=[...counter.moneyData];
  //console.log(`我是addRow，增加行处理完毕${counter.moneyData[counter.count]}`);
}

onBeforeMount(() => {
  counter.tableData()
  //console.log("数据的转换，刷新mD的数据")
  counter.cangaoInpu()
  counter.cangaoRender()
  //tableData.value=[...counter.moneyData];
  //console.log("我是onBeforeMount，我初始化所有数据啦")

})


onMounted(() => {
    //console.log(`⭐表格坐标`)
    tableOffset={x:TableRect().x,y:TableRect().y}
    // document.addEventListener('mousemove', mousemoveHandler)//或许可以用这个来解决鼠标监听和菜单正常消失
    //console.log(tableOffset)
})

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
    font-size: 14px;
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
.el-icon svg{
    color:black;
}
.el-table{
    font-size: 18px!important;
    border:1px solid black!important;

}
.el-table thead,th{
    justify-content: center!important;
    color:black!important;
    font-weight:normal!important;
    /*font-size: 16px;*/
    //justify-content: space-between;
    border: 1px solid black;
}
.el-table th cell{
    text-align:center!important;
}
.el-table tr{
    min-height: 1em;
}
.el-table td{
    color:black!important;
    font-weight:normal!important;
    /*font-size: 15px;*/
    border: 1px solid black;
}
.el-input{
    --el-input-text-color:black!important;
    --el-table-border:none!important;
    --el-table-border:none!important;

}
.redMoneyCell{/*出金的红色还没有成功*/
    color:red!important;
    font-weight: normal!important;
}
</style>