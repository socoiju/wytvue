<template>
  <div>
    <h3>0404的学习</h3><h4>2023年</h4>
    <p>输入上个月剩的钱</p><input v-model="input1"   placeholder="先月残高"><button @click="cangaoInpu">提交</button>
    <p>上个月剩的钱为{{Number(input1)}}</p>
    <br><table>
      <thead>
        <th></th>
        <th></th>
        <th>日付</th>
        <th>相手勘定</th>
        <th>摘要(折叠部分显示)</th>
        <th style="color:red" >出金</th>
        <th>入金</th>
        <th>残高</th>
      </thead>
      <tbody>
        <tr draggable="true" v-for="(row,index) in moneyData" :key="index">
            <td><button @click="qkrow(index)">クリア</button></td>            <td><button @click="delrow(index)">削除</button></td>
            <td contenteditable="true" @input="handleInput(index, 'dt') ">{{row.dt}}</td>
            <td class="cell"  @input="handleInput(index, 'nm')">{{row.nm}}<button class="arrow-button" v-if="this.moneyData[index].zd==1" @click="zhediedk"><span class="arrow1"></span></button><button class="arrow-button" v-if="this.moneyData[index].zd==2" @click="zhediegb"><span class="arrow2"></span></button></td>
            <td contenteditable="true" @input="handleInput(index, 'zy'),zyregex(index)">{{row.zy}}</td>
            <td style="color:red" contenteditable="true" @input="handleInput(index, 'hq'),cangaoInpu()">{{row.hq}}</td>
            <td contenteditable="true" @input="handleInput(index, 'dq'),cangaoInpu()">{{row.dq}}</td>
            <td>{{cangaoData[index]}}</td><!--这里不能用括号要用方括号-->
        </tr>
      </tbody>
    </table>
    <button @click="addrow">增加一行</button>
<!--    <button @click="regexyz">第三个值符合正则吗</button>-->
    <br><br><br><br><br><br>
  </div>
</template>

<script>

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "vue0404",
    methods:{
        test(){
            console.log("this.moneyData");
        },
        handleInput(index,newda){//在编辑表格后修改原值
            this.moneyData[index][newda] = event.target.innerHTML;

        },
        cangaoInpu(){//残高计算。编辑其他如果涉及到残高计算，引用此函数
            let k=[this.input1];
            for( let i=0;i<this.moneyData.length;i++) {
                let loss = Number(this.moneyData[i].hq);
                let gett = Number(this.moneyData[i].dq);
                if (this.moneyData[i].zd == 3) {   //3是折叠内的值，不参与计算。
                    loss = 0;
                    gett = 0;
                }
                this.cangaoData[i] = k[i] - loss + gett;
                k.push(this.cangaoData[i]);
                //console.log("运行第"+i+"次的金钱数据："+this.moneyData[i]);
                if (loss==0 && gett==0) {
                    this.cangaoData[i] = "";
                    //break;//发现此行没有入金和出金就停止计算残高。但是这样的话中间行数就不能空。总之先这样写着，毕竟原文行数也没有留空
                }
                console.log("运行第" + i + "次：" + this.cangaoData);
            }
        },
        addrow(){//增加一行，折叠状态默认为0（非折叠行），重算残高
            this.moneyData.push({dt: "", nm: "", zy: "", hq: "", dq: "",zd:0});
            this.cangaoInpu();
        },
        qkrow(index){//清空一行，重算残高
            this.moneyData[index]={dt: "", nm: "", zy: "", hq: "", dq: "",zd:0};
            this.cangaoInpu();
        },
        delrow(index){//删除一行，重算残高
            this.moneyData.splice(index,1);
            this.cangaoInpu();
        },
         zyregex(index){//判断摘要是不是简略输入，如果是，用楼下函数拿到钱和内容，然后计算总花费，改变此行折叠状态为1（文件夹行），重算残高
             // eslint-disable no-irregular-whitespace
            const regex = /^\d+(\([ぁ-んーァ-ヶーｱ-ﾝﾞﾟ一-龠0-9０-９a-zA-Zａ-ｚＡ-Ｚ]+\))?\+\d+(\([ぁ-んーァ-ヶーｱ-ﾝﾞﾟ一-龠0-9０-９a-zA-Zａ-ｚＡ-Ｚ]+\))?(\+\d+(\([ぁ-んーァ-ヶーｱ-ﾝﾞﾟ一-龠0-9０-９a-zA-Zａ-ｚＡ-Ｚ]+\))?)*$/;
            let str=this.moneyData[index].zy;
            if (regex.test(str)) {
                this.zySplit(str);
                console.log("符合数字+++格式，计算总额ing");
                let sum=0;
                for(let i=0;i<this.zySplit(str).length;i++){
                    sum+=this.zySplit(str)[i].money;
                }
                this.moneyData[index].hq=sum;
                this.moneyData[index].zd=1;
                this.cangaoInpu();
            } else {
                console.log("不符合数字+++格式");
                this.moneyData[index].zd=0;
            }
        },
        zySplit(str){//发现摘要是简略输入后，用这个函数切分摘要字符串，分出钱和内容后返回
            let s=str.split("+");

            let zddt=[];
            for (const item of s){
                if (item.includes(")")){
                    zddt.push({money:Number(item.split(")")[0].split("(")[0]),nr:item.split(")")[0].split("(")[1]});
                }else{
                    zddt.push({money:Number(item),nr:""});
                }
            }
            return zddt;
        },
        getRow(event){//获取按钮所在单元格的行数
            const button = event.target; // 获取按钮本身的 DOM 元素
            const cell = button.closest("td"); // 获取按钮所在的单元格
            const row = cell.parentNode; // 获取单元格所在的行
            const rowIndex = Array.from(row.parentNode.children).indexOf(row); // 获取行的索引
            return rowIndex;
        },
        zhediedk(event){//是1，才显示这个按钮。才能点。所以不用判断是不是1……。直接旋转按钮就行
            let list=[];
            let str=this.moneyData[this.getRow(event)].zy;
            for(let i=0;i<this.zySplit(str).length;i++){
                //list.push({dt: this.moneyData[this.getRow(event)].dt, nm:this.moneyData[this.getRow(event)].nr, zy: this.moneyData[this.getRow(event)].nm, hq: this.zySplit(str)[i].money, dq: "",zd:3});
                list.push({dt:"", nm:"", zy: this.zySplit(str)[i].nr, hq: this.zySplit(str)[i].money, dq: "",zd:3});
            }
            this.moneyData[this.getRow(event)].zd=2;
            this.moneyData.splice(this.getRow(event),0,...list);
            this.cangaoInpu();

        },
        zhediegb(event){//是2，才显示这个按钮。
            this.moneyData[this.getRow(event)].zd=1;
        },

    },
    data() {
        return {
            // zddt:[{money:"",nr:""}],
            input1:"",//上个月的残高
            // defaultData: [
            //     {dt: "20230104", nm: "XXX", zy: "", hq: "1800", dq: "",zd:0},//zd是表示折叠的 0为不能折叠也不是子元素
            //     {dt: "20230104", nm: "YYY", zy: "", hq: "", dq: "3400",zd:0},//1表示能折叠然后是文件夹类型
            //     {dt: "20230104", nm: "YYY", zy: "", hq: "", dq: "3400",zd:0},//1表示能折叠然后是文件夹类型
            //     {dt: "20230104", nm: "YYY", zy: "", hq: "", dq: "3400",zd:0},//1表示能折叠然后是文件夹类型
            //     {dt: "20230104", nm: "YYY", zy: "", hq: "", dq: "3400",zd:0},//1表示能折叠然后是文件夹类型
            //     {dt: "20230104", nm: "杂费", zy: "56(じ)+89(橡皮2)+45(ｚｚ)", hq: "190", dq: "",zd:1},//2表示它是子文件夹类型 三者可以修改和转换
            //     {dt: "20230104", nm: "ZZZ", zy: "", hq: "1500", dq: "",zd:0},//2表示它是子文件夹类型 三者可以修改和转换
            // ],
            moneyData: [
                {dt: "20230104", nm: "XXX", zy: "", hq: "1800", dq: "",zd:0,zdnr:[]},//zd是表示折叠的 0为不能折叠也不是子元素
                {dt: "20230104", nm: "YYY", zy: "", hq: "", dq: "3400",zd:0,zdnr:[]},//1表示能折叠然后是文件夹类型
                {dt: "20230104", nm: "杂费", zy: "56(じ)+89(橡皮2)+45(ｚｚ)", hq: "190", dq: "",zd:1,zdnr:[]},//2表示它是子文件夹类型 三者可以修改和转换
                {dt: "20230104", nm: "ZZZ", zy: "", hq: "1500", dq: "",zd:0,zdnr:[]},//2表示它是子文件夹类型 三者可以修改和转换
            ],
            cangaoData:[-1800,-1800+3400,-1800+3400-1500]
        }
    },
}
</script>

<style scoped>
.arrow-button {
    background:none;
    border: none;
    position: relative;
}

.arrow1 {
    /*transform: rotate(90deg)translateY(-50%);*/
    display: block;
    border-top: 5px solid transparent;
    border-bottom:5px solid transparent;
    border-left: 5px solid black;
}
.arrow2 {
    transform: rotate(-90deg);
    display: block;
    border-top: 5px solid transparent;
    border-bottom:5px solid transparent;
    border-left: 5px solid black;
}
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
table button{
    border:none;
    background:none;
}
</style>