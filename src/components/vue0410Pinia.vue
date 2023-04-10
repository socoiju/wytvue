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
  <buttoncountC  @click.stop="axiosxx"><!-- 写了-stop，还是会触发按钮的click-->
    <template #bt>axios请求</template>
  </buttoncountC>
<p>获得第{{dj}}个数据(0-100)</p><h4>{{ti}}{{id}}</h4><p>{{dd}}</p>
  <button @click="cl"></button>
<p>获得第{{dj}}个defaultData数据(0-10)</p><h4>{{data}}</h4>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import { useCounterStore } from '@/store/counter';
import buttoncountC from './xiaozujian/buttoncountC.vue';

const counter = useCounterStore();
let dj=ref(counter.count);
let [id,ti,dd,n]= [ref(null),ref(''),ref(''),ref(1)];
// let id=ref('');
// let ti=ref('');
// let dd=ref('');
// let n=ref(1);
// let [dt, nm, zy, hq, dq,zd]= [ref(null),ref(null),ref(null),ref(null),ref(null),ref(null)];
// [dt, nm, zy, hq, dq,zd]=counter.moneyDataB[k];

let data=ref(counter.moneyData[counter.count]);
data=counter.moneyData[counter.count];

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

function cl(){
    let k=[];//这是存放键值对的，是旅费交通费的话，注册一个日期名字的键，把它放在这个列表里面，之后有新的也好查找
    let k1=[...counter.defaultData];
    let k2=[];//存新的东西用的
    let r=0;
    for(const item of k1){
        // item.zd=0;//！！moneyData增加zd属性，设置初始值 ！！这两行放下面了
        // item.zdnr=[];//！！moneyData增加zdnr属性用来放置折叠的信息，设置初始值。但其实其他不折叠的用不到，这个有点累赘吧

        if (["旅費交通費"].includes(item.nm)){//符合折叠条件
            //！！不考虑排序。尽量一个一个就那样push进去，k存文件夹行的索引，好找
            let str=item.dt+item.nm;//！！注册键的格式是日期加上名字"20230102旅費交通費"这种，防止之后多了其他名字
            if (str in k) {//当已经存在折叠文件夹， 把此内容推到过去的索引那里。push进去
                // console.log(`当前的k2${k2}，已有折叠文件夹，打算推送给${k[str]}`);
                // console.log(k2);
                k2[k[str]].zdnr.push({...item});
                k2[k[str]].zd=1;
                //---解决：push也是引用来着。问题：每次触发这个函数，这里都会增加而不是清空后再写入。
                k2[k[str]].zy=k2[k[str]].zy+"、"+item.zy;
                k2[k[str]].hq=Number(k2[k[str]].hq)+Number(item.hq);
                //console.log(`摘要叫做${item.zy}的，当前索引数为${r}。是旅費交通費，且已经有同日记录，推送到了第${k[str]}行`);
                // console.log(`推送了此${str}内容去${k[str]}位置`);
            } else {//暂时只有一个，正常push,但给zdnr里面一个副本，如果有第二项，它就是第一项折叠内容了
                item.zdnr=[item];
                k2.push({...item});
                k[str] = [r];//新建一个键值对,这是记录的文件夹位置索引
                r++;
                //console.log(k);
                //console.log(`摘要叫做${item.zy}的，当前索引数为${r}。是旅費交通費，推送出来，放在第${r}行。并为这个新日期${str}增加了一个键和新的索引值：${r}，放在k里面了`);
            }
        } else{//不是那个名字，正常推送
            item.zd=0;
            item.zdnr=[];
            k2.push(item);
            r++;
            //console.log(`摘要叫做${item.zy}的，当前索引数为${r}。不是旅費交通費，普通地推送出来，放在第${r}行`);
        }
        // console.log("这是期间每次的k2");
        // console.log(k2);
        if(r>100){
            break;
        }
    }
    counter.moneyData=[...k2];
    console.log(counter.moneyData[3]);

    data.value=counter.moneyData[counter.count].dt;
    console.log(`处理完毕${data.value}`);
    //console.log(k2);
    //this.cangaoInpu();先不算

    // console.log("这是期间每次的k1");
    // console.log(k1);
}


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
h4,p{font-size:25px;}
input{
    border:none;background-color: #d2d2d2;
    font-size:25px;width:100px;height:40px;
}
</style>