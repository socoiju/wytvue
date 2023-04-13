<template>
    <div class="menu" @click.right="clickRight">
    <ul class="menuContext">
        <li @click="editRow"><p>编辑</p></li>
        <el-divider/>
        <li @click="clearRow"><p>清空</p></li>
        <li @click="deleteRow"><p>删除</p></li>
        <el-divider/>
        <li @click="addRowOnThis"><p>在上面插入一行</p></li>
        <li @click="addRowUnderThis"><p>在下面插入一行</p></li>
    </ul>
    </div>
</template>

<script setup>
import { useCounterStore } from '@/store/counter'
import { useRightClickMenuStore } from '@/store/rightClickMenu'
const counter = useCounterStore();
const rightClickMenuS = useRightClickMenuStore()
function clickRight(event){//禁止自己又触发右键点击
    event.preventDefault();
}
function editRow(){
    rightClickMenuS.menuEditRow=true;
}
function clearRow(){
    let index=rightClickMenuS.row.key;
    counter.clearRow(index);
}
function deleteRow(){
    let index=rightClickMenuS.row.key;
    counter.deleteRow(index);
}
function addRowOnThis(){
    let index=rightClickMenuS.row.key;
    counter.addRow(index-1);

}
function addRowUnderThis(){
    let index=rightClickMenuS.row.key;
    counter.addRow(index);

}
</script>

<style scoped>
.menu{
    z-index: 999;
    background:white;
    border:solid;
    border-color:black;
    border-width:1px;
    font-size: 18px;
    width:150px;
}
.menuContext{
    /*上-右-下-左*/
    padding:0.3em 0 0.3em 0;
    margin:0;
}
li:active{
    background: #e7e7e7 ;
    color:black !important;
}
li:hover{
    color: #3b658d;
}
li{
    text-align:left;
    list-style:none;
    //width:140px;
    font-size:1em;
}
p{
    margin:0;
    padding-left:0.5em;
    font-size:1em;
    user-select: none;
}
.el-divider{
    margin:0.3em 0 0.3em 0;
}

</style>