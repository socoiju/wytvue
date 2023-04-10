<template>
  <div>
    <h3>0403的学习</h3>
    <p>当前日期的读取</p>
    <p>当前日期：{{data}}</p><!-- 当前日期-->
    <h4 class="title">计数</h4>
    <button @click="zwjsbt">位于vue0403的自我计数按钮{{zwjs}}次</button><!-- click触发一个方法（自我计数方法）-->
    <br><h4>输入的文本变成css的一部分</h4>
    <input v-model="input1" placeholder="输入框1"/><input v-model="input2" placeholder="输入框2">
    <p :style="{ fontSize:input1+'px',color:input2}">本文本根据输入框1的文本变字号&输入框2的文本变色</p>
    <br><h4>输出return里的列表和其长度的十分之一</h4>
    <p>{{list1}} 此列表长度的十分之一是{{lengthjisuan}}</p>
    <br><h4>生成一个随机数</h4>
    <input v-model="inputrandom" placeholder="例：d10、2d6、5d20"><!-- 接下来计划做-->
    <button @click="roll">生成</button><br>
    <button @click="rand">d100={{r}}</button>
    <br><h4>输入十进制生成16进制，使用了函数直接传入参数的方法</h4>
    <input v-model="input4" placeholder="十进制转换16进制">
    <p>{{input4}}的十六进制为：{{ttst(input4)}}</p>
    <button @click="cangao">计算残高</button><br>
    <br><h4>2023年</h4>
    <p>先月残高</p><input v-model="input5" placeholder="先月残高">
    <br><table>
        <thead>
          <th>日付</th>
          <th>相手勘定</th>
          <th>摘要</th>
          <th>出金</th>
          <th>入金</th>
          <th>残高</th>
        </thead>
      <tbody>
        <tr v-for="(row,index) in moneydata" :key="index">
            <td contenteditable="true" @click="test" input id="person_name">{{row.dt}}</td>
            <td contenteditable="true" @change="test">{{row.nm}}</td>
            <td contenteditable="true" @change="test">{{row.zy}}</td>
            <td contenteditable="true" @change="test">{{row.hq}}</td>
            <td contenteditable="true" @change="test">{{row.dq}}</td>
<!--            <td>{{cangaodata(index)}}</td>-->
        </tr>
      </tbody>
    </table>
    <button>增加一行</button>
  </div>
</template>

<script>
import moment from 'moment';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "vue0403",
    methods:{
        zwjsbt(){//点击数
            this.zwjs++;
        },
        rand(){//随机数rd100
            this.r=Math.round(Math.random()*100);
        },
        ttst(kk){//转换16进制
            let b=Number(kk).toString(16);//之前失败是因为没有把输入的东西读成Number
            return b;
        },
        test(){
            console.log("12345");
        },
    },
    computed: {
        lengthjisuan() {//收缩长度
            let a = 0;
            a = this.list1.length / 10;
            return a;
        },

        // cangaodata(){//残高计算
        //     return(index)=>{
        //         let sum=0;
        //         for(let i=0;i<index;i++){
        //             sum=-Number(this.moneydata[i].hq)+Number(this.moneydata[i].dq)+Number(this.moneydata[i-1].xq);
        //         }
        //     }
        //     return sum;
        // }
    },
    data(){
        return{
            zwjs:0,
            list1:["a","b","c"],
            r:0,
            input1:35,
            input2:"#"+(Math.round(Math.random()*256)).toString(16)+(Math.round(Math.random()*256)).toString(16)+(Math.round(Math.random()*256)).toString(16),
            input3:{
                type:String,
                default:""
            },
            input4:"",
            input5:0,
            moneydata:[
                {dt:"20230104",nm:"xxx",zy:"",hq:"1800",dq:""},
                {dt:"20230104",nm:"xxx",zy:"",hq:"",dq:"3400"},
                {dt:"20230104",nm:"xxx",zy:"",hq:"1500",dq:""}
            ],


            data:moment().format('YYYY/MM/DD')
        };
    }
}
</script>

<style scoped>

  table{
      margin-left:auto;margin-right:auto;
      border-collapse:collapse;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
  }
  td,th{
      border-top: 1px solid black;
      border-left: 1px solid black;
  }
  table input{
      border:none;
  }
</style>