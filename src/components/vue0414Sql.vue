<template>
    <h1>Tasks List</h1>
    <div style="display: inline-block">
        <input v-model="task"/>
        <button @click="addTask">增加</button>
    </div>
    <ul style="height:300px;margin-top:20px">
        <li v-for="task in tasks"
            :key="task.id"

        >
            <div>
                <span><input type="checkbox" v-model="task.completed" @change="updateTask(task)"/></span>
                <span :style="task.completed ? 'text-decoration:line-through;color:#aaaaaa' : ''">{{task.task}}</span><span v-if="'completedTime' in task" style="font-size:12px">（完成于{{new Date(task.completedTime).toLocaleString()}}）</span>
<!--                <span><button @click="deleteTask(task.id)">删除</button></span>-->

            </div>
        </li>
    </ul>
</template>
<script setup>
import {ref,onUnmounted} from "vue";
import { db } from '@/firebase';
import { collection, onSnapshot,doc,addDoc,deleteDoc,setDoc,updateDoc,deleteField } from 'firebase/firestore';

const tasks=ref([]);
const task=ref('');
let id=0;
let unsubscribe;
// let id=0;//这里不需要响应式
//一个增加的函数，一个删除的
// const getTasks=async()=>{//勉强学会了可能还要温习
//      //await getDocs是只读取，但如果要更新，用onSnapshot。
//      //↓得到一个快照，存储了db和‘tasks’
//     const snapshot = await getDocs(collection(db,'tasks'));
//      //↓为tasks赋值。具体为，把快照docs map了
//     tasks.value=snapshot.docs.map(
//      //↓处理成每一个都有doc的data部分也有doc.id的
//         (doc)=>({...doc.data(),id:doc.id})
//     );
// }
//我的好像不对？
// const getTasks=async()=>{
//     const unsubscribe=onSnapshot(collection(db,'tasks'),(querySnapshot)=>{
//         tasks.value=querySnapshot.docs.map(
//      //↓处理成每一个都有doc的data部分也有doc.id的
//         (doc)=>({...doc.data(),id:doc.id})
//     );
//     });
// };
const getTasks = async () => {
    unsubscribe = onSnapshot(collection(db, 'tasks'), (querySnapshot) => {
        tasks.value = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
    });
};

getTasks();
const addTask=async()=>{
    //不需要id
    await addDoc(collection(db,'tasks'),{
        task:task.value,
        completed:false
    });
    //tasks.value.push({id,task:task.value,completed:false});
    task.value='';
    //id++;//?
}
const deleteTask=async(id)=>{
    await deleteDoc(doc(db,'tasks',id));//用id在这里对应
    //⭐下面这句可以学学，虽然获取索引有点绕
    // const index=tasks.value.findIndex((task)=>task.id===id);
    // tasks.value.splice(index,1);
}
const updateTask=async(taskmiao)=>{
    await setDoc(doc(db,'tasks',taskmiao.id),{
        task:taskmiao.task,
        completed:taskmiao.completed,//确定这里不是
        completedTime:new Date().getTime()
    });
    if (taskmiao.completed==false){
        //console.log(`检查到这是一个没有完成的任务`)
        await updateDoc(doc(db,'tasks',taskmiao.id),{
            // task:taskmiao.task,
            completedTime:deleteField(),
        });
    }
}
onUnmounted(()=>{
    unsubscribe();//
})
</script>

<style scoped>
ul,div,button{
    font-size:20px
}
    li{
        /*text-align:left;*/
        list-style:none;
    }
</style>