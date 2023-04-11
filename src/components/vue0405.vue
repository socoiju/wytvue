<template>
    <div>
        <h3>0405的学习</h3><h4>2023年</h4>
        <p>输入上个月剩的钱</p><input v-model="input1"   placeholder="先月残高"><button @click="cangaoInpu">提交</button>
        <p>上个月剩的钱为{{Number(input1)}}</p>
        <button @click="defaultDataChuli">导入默认数据</button>
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
        <tr draggable="true" v-for="(row,index) in moneyDataB" :key="index">
            <td><button @click="qkrow(index)">クリア</button></td>            <td><button @click="delrow(index)">削除</button></td>
            <td contenteditable="true" @input="handleInput(index, 'dt') " >{{row.dt}}</td>
            <td  class="cell"><span @input="handleInput(index, 'nm')" contenteditable="true" v-html="row.nm"></span><button class="arrow-button" v-show="this.moneyDataB[index].zd==1" @click="zhediedk"><span class="arrow1"></span></button><button class="arrow-button" v-show="this.moneyDataB[index].zd==2" @click="zhediegb"><span class="arrow2"></span></button></td>
            <td contenteditable="true" @input="handleInput(index, 'zy'),zyGetZd(index)">{{row.zy}}</td>
            <td style="color:red" contenteditable="true" @input="handleInput(index, 'hq'),cangaoInpu()">{{row.hq}}</td>
            <td contenteditable="true" @input="handleInput(index, 'dq'),cangaoInpu()">{{row.dq}}</td>
            <td>{{cangaoData[index]}}</td><!--这里不能用括号要用方括号-->
        </tr>
        </tbody>
    </table>
        <button @click="addrow">增加一行</button>
        <br><br><br><br><br><br>
    </div>
</template>

<script>

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "vue0405",
    computed: {
        //
        // moneyDataB(index){
        //     if (this.moneyDataB[index].zd==2) {
        //         let a = index - this.moneyDataB[index].zdnr.length;
        //         let b = index;
        //         let r=0;
        //         for (let i = a; i < b; i++) {
        //             this.moneyDataB[index].zdnr[r].zy=this.moneyDataB[i].zy;
        //             this.moneyDataB[index].zdnr[r].hq=this.moneyDataB[i].hq;
        //             this.moneyDataB[index].zdnr[r].dq=this.moneyDataB[i].dq;
        //             this.moneyDataB[index].zy += this.moneyDataB[i].zy;
        //             this.moneyDataB[index].hq += this.moneyDataB[i].hq;
        //             this.moneyDataB[index].dq += this.moneyDataB[i].dq;
        //             r++;
        //         }
        //     }
        // }
    },
    mounted(){
            this.defaultDataChuli()
            this.cangaoInpu()
    },

    methods:{
        test(){
            console.log("this.moneyDataB");
        },

        // roundNumber(value) {
        //     return Math.round(value);
        // },

        //虽然这样的时间格式能用，但编辑过程中很影响编辑，先删掉
        dateStyle(value) {
            let value1 = String(value);
            if (!value1) return '';
            const year = value1.slice(0, 4);
            const month = value1.slice(4, 6);
            const day = value1.slice(6, 8);
            return `${year}/${month}/${day}`;
        },

        //名称判断-成功用在11号的代码里啦
        defaultDataChuli(){
            let k=[];//这是存放键值对的，是旅费交通费的话，注册一个日期名字的键，把它放在这个列表里面，之后有新的也好查找
            let k1=[...this.defaultData];
            let k2=[];//存新的东西用的
            let r=0;
            for(const item of k1){
                // item.zd=0;//！！moneyData增加zd属性，设置初始值 ！！这两行放下面了
                // item.zdnr=[];//！！moneyData增加zdnr属性用来放置折叠的信息，设置初始值。但其实其他不折叠的用不到，这个有点累赘吧

                if (["旅費交通費"].includes(item.nm)){//符合折叠条件
                    //！！不考虑排序。尽量一个一个就那样push进去，k存文件夹行的索引，好找
                    let str=item.dt+item.nm;//！！注册键的格式是日期加上名字"20230102旅費交通費"这种，防止之后多了其他名字
                    if (str in k) {//当已经存在折叠文件夹， 把此内容推到过去的索引那里。push进去
                        //console.log(`当前的k2${k2}，已有折叠文件夹，打算推送给${k[str]}`);
                        //console.log(k2);
                        k2[k[str]].zdnr.push({...item});
                        k2[k[str]].zd=1;
                        //---解决：push也是引用来着。问题：每次触发这个函数，这里都会增加而不是清空后再写入。
                        k2[k[str]].zy=k2[k[str]].zy+"、"+item.zy;
                        k2[k[str]].hq=Number(k2[k[str]].hq)+Number(item.hq);
                        //console.log(`摘要叫做${item.zy}的，当前索引数为${r}。是旅費交通費，且已经有同日记录，推送到了第${k[str]}行`);
                        // console.log(`推送了此${str}内容去${k[str]}位置`);
                    } else {//暂时只有一个，正常push,但给zdnr里面一个副本，如果有第二项，它就是第一项折叠内容了
                        let ls={...item};//4月11日的修改，防止循环引用
                        item.zdnr=[ls];
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
            this.moneyDataB=[...k2];
            //console.log(k2);
            this.cangaoInpu();

            // console.log("这是期间每次的k1");
            // console.log(k1);
        },

        //单独处理摘要
        // defaultDataChuliZy(){
        //
        // },

        //在编辑表格后修改原值
        handleInput(index,newda){
            this.moneyDataB[index][newda] = event.target.innerHTML;
        },

        //残高计算。编辑其他如果涉及到残高计算，引用此函数 -成功用在11号的代码里啦
        cangaoInpu(){
            let k=[this.input1];
            for( let i=0;i<this.moneyDataB.length;i++) {
                let loss = Number(this.moneyDataB[i].hq);
                let gett = Number(this.moneyDataB[i].dq);
                if (this.moneyDataB[i].zd == 3) {   //3是折叠内的值，不参与计算。
                    loss = 0;
                    gett = 0;
                }
                this.cangaoData[i] = k[i] - loss + gett;
                k.push(Math.round(this.cangaoData[i]));
                //console.log("运行第"+i+"次的金钱数据："+this.moneyDataB[i]);
                if (loss==0 && gett==0) {
                    this.cangaoData[i] = "";
                    //break;//发现此行没有入金和出金就停止计算残高。但是这样的话中间行数就不能空。总之先这样写着，毕竟原文行数也没有留空
                }
                //console.log("运行第" + i + "次：" + this.cangaoData);
            }
        },

        //增加一行，折叠状态默认为0（非折叠行），重算残高9
        addrow(){
            this.moneyDataB.push({dt: "", nm: "<span @input=\"handleInput(index, 'nm')\" contenteditable=\"true\" v-html=\"row.nm\"></span>", zy: "", hq: "", dq: "",zd:0,zdnr:[]});
            this.cangaoInpu();
        },

        //清空一行，重算残高
        qkrow(index){
            this.moneyDataB[index]={dt: "", nm: "", zy: "", hq: "", dq: "",zd:0,zdnr:[]};
            this.cangaoInpu();
        },

        //删除一行，重算残高
        delrow(index){
            this.moneyDataB.splice(index,1);
            this.cangaoInpu();
        },

        //判断摘要是不是简略输入（是否符合正则）
        zyRegex(str){
            const regex = /^\d+(\([ぁ-んーァ-ヶーｱ-ﾝﾞﾟ一-龠0-9０-９a-zA-Zａ-ｚＡ-Ｚ]+\))?\+\d+(\([ぁ-んーァ-ヶーｱ-ﾝﾞﾟ一-龠0-9０-９a-zA-Zａ-ｚＡ-Ｚ]+\))?(\+\d+(\([ぁ-んーァ-ヶーｱ-ﾝﾞﾟ一-龠0-9０-９a-zA-Zａ-ｚＡ-Ｚ]+\))?)*$/;
            if (regex.test(str)) {
                return true;
            }else{
                return false;
            }
        },

        //(从摘要)得到折叠值。先用楼上判断是不是那种输入，是的话用楼下拿到钱和内容，然后计算总花费，改变此行折叠状态为1（文件夹行），重算残高
        zyGetZd(index){
            let str=this.moneyDataB[index].zy;
            if (this.zyRegex(str)==true) {
                this.zySplit(str);//拿到钱和内容
                //console.log("符合数字+++格式，计算总额ing");
                let sum=0;//计算总数
                for(let i=0;i<this.zySplit(str).length;i++){
                    sum+=this.zySplit(str)[i].money;
                }
                this.moneyDataB[index].hq=sum;
                this.moneyDataB[index].zd=1;
                this.cangaoInpu();
            } else {
                console.log("不符合数字+++格式");
                if(this.moneyDataB[index].zdnr==[]) {
                    //console.log("我的包里什么都没有")
                    this.moneyDataB[index].zd = 0;
                }
            }
        },

        //发现摘要是简略输入后，用这个函数切分字符串，分出钱和内容的数组后返回
        zySplit(str){
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

        //获取按钮所在单元格的行数
        getRow(event){
            const button = event.target; // 获取按钮本身的 DOM 元素
            const cell = button.closest("td"); // 获取按钮所在的单元格
            const row = cell.parentNode; // 获取单元格所在的行
            const rowIndex = Array.from(row.parentNode.children).indexOf(row); // 获取行的索引
            return rowIndex;
        },

        //打开 是1，才显示这个按钮。才能点。所以不用判断是不是1……。直接旋转按钮就行。如果zdnr是空，用那个判断，否则用zdnr来做。
        zhediedk(event){
            let list=[];//建立新的列表
            if(this.moneyDataB[this.getRow(event)].zdnr.length<1){
                console.log("我在无zdnr的if里面，正常运行ing");
                let str=this.moneyDataB[this.getRow(event)].zy;//这里的行数（索引）:this.getRow(event)

                for(let i=0;i<this.zySplit(str).length;i++){//基于摘要字符串的数组，输出折叠内容
                    console.log("我在无zdnr的for里面，正常运行ing");
                    list.push({
                        dt:"", nm:"",
                        zy: this.zySplit(str)[i].nr,
                        hq: this.zySplit(str)[i].money,
                        dq: "",zd:3});
                }
            }else{
                console.log("我在有zdnr的if里面，正常运行ing");
                for(let i=0;i<this.moneyDataB[this.getRow(event)].zdnr.length;i++){//基于zdnr，输出折叠内容
                    //list.push({dt: this.moneyDataB[this.getRow(event)].dt, nm:this.moneyDataB[this.getRow(event)].nr, zy: this.moneyDataB[this.getRow(event)].nm, hq: this.zySplit(str)[i].money, dq: "",zd:3});
                    console.log("我在有zdnr的for里面，正常运行ing");
                    list.push({
                        dt:"", nm:"",
                        zy: this.moneyDataB[this.getRow(event)].zdnr[i].zy,
                        hq: this.moneyDataB[this.getRow(event)].zdnr[i].hq,
                        dq: this.moneyDataB[this.getRow(event)].zdnr[i].dq,
                        zd: 3});
                }
            }
            this.moneyDataB[this.getRow(event)].zd=2;//折叠子行为2号
            this.moneyDataB.splice(this.getRow(event),0,...list);
            this.cangaoInpu();
        },

        //关闭 是2，才显示这个按钮。删除折叠。这个还没做。
        zhediegb(event){
            console.log(this.moneyDataB[this.getRow(event)]);
            console.log(`准备删掉折叠的东西啦，折叠的索引是：${this.getRow(event)}`);
            this.moneyDataB[this.getRow(event)].zd=1;
            let a=0;
            let b=0;
                if(this.moneyDataB[this.getRow(event)].zdnr.length<1){
                    a=this.getRow(event)-this.zySplit(this.moneyDataB[this.getRow(event)].zy).length;
                    if(a<0){a=0;}
                    b=this.zySplit(this.moneyDataB[this.getRow(event)].zy).length+a;
                }else{
                    a=this.getRow(event)-this.moneyDataB[this.getRow(event)].zdnr.length;
                    if(a<0){a=0;}
                    b=this.moneyDataB[this.getRow(event)].zdnr.length+a;
                }

            for(let i=a;i<b;i++){
                console.log(i+"     "+b+"检查一下能不能删掉……");
                if (this.moneyDataB[i].zd==3){
                    console.log(this.moneyDataB[i].zy);
                    this.moneyDataB.splice(i,b-i);
                    break;
                }
                console.log(i+"     "+b+"期间有非子项，再次循环……");
            }

            this.cangaoInpu();
        },

        //折叠展开后编辑内容后自动修改精简的摘要和子行，优先子行，还没做
        // zhedieZk(event){
        //     //往前读字符串orzdnr长度的数组，里面的内容变化影响到自己的字符串、zdnr长度的变化。
        //     //优先做zdnr这个。先拿到索引，然后往前扣n个，然后for
        //     let index=this.getRow(event);
        //
        // },
    },
    data() {
        return {
            // zddt:[{money:"",nr:""}],
            input1:"",//上个月的残高
            defaultData: [//基础数据。
                {dt: "20230104", nm: "1号XXX", zy: "1号", hq: "1800.4", dq: "18000.8"},
                {dt: "20230104", nm: "旅費交通費", zy: "2号", hq: "2", dq: ""},
                {dt: "20230104", nm: "旅費交通費", zy: "3号", hq: "3", dq: ""},
                {dt: "20230104", nm: "旅費交通費", zy: "3.1号", hq: "3.1", dq: ""},
                {dt: "20230104", nm: "旅費交通費", zy: "3.2号", hq: "3.2", dq: ""},
                {dt: "20230105", nm: "旅費交通費", zy: "4号", hq: "4", dq: ""},
                {dt: "20230105", nm: "旅費交通費", zy: "5号", hq: "5", dq: ""},
                {dt: "20230105", nm: "6号杂费", zy: "56(じ)+89(橡皮2)+45(ｚｚ)", hq: "190.1", dq: ""},
                {dt: "20230105", nm: "7号ZZZ", zy: "7号", hq: "1500", dq: ""},
                {dt: "20230108", nm: "旅費交通費", zy: "8号", hq: "8", dq: ""},
                {dt: "20230104", nm: "旅費交通費", zy: "8.1号", hq: "8.1", dq: ""},
                {dt: "20230108", nm: "1号XXX", zy: "9号", hq: "1800", dq: ""},
            ],
            moneyDataL: [//基于楼上的数据而来。存储格式统一的。
                // {dt: "20230104", nm: "XXX", zy: "", hq: "1800", dq: "",zd:0,zdnr:[]},//zd是表示折叠的 0为不能折叠也不是子元素
                // {dt: "20230104", nm: "YYY", zy: "", hq: "", dq: "3400",zd:0,zdnr:[]},//1表示能折叠然后是文件夹类型
                // {dt: "20230104", nm: "杂费", zy: "56(じ)+89(橡皮2)+45(ｚｚ)", hq: "190", dq: "",zd:1,zdnr:[]},//2表示它是子文件夹类型 三者可以修改和转换
                // {dt: "20230104", nm: "ZZZ", zy: "", hq: "1500", dq: "",zd:0,zdnr:[]},//2表示它是子文件夹类型 三者可以修改和转换
            ],
            moneyDataB: [//折叠数据的展开和折叠可以改变这个，不能改变楼上。如果编辑了文本，修改这个。然后基于这个，点击保存修改时候修改或导出defaultData/moneyDataBL
            ],
            //moneyDataB默认数据备份
            // moneyDataB: [//折叠数据的展开和折叠可以改变这个，不能改变楼上。如果编辑了文本，修改这个。然后基于这个，点击保存修改时候修改或导出defaultData/moneyDataBL
            //     {dt: "20230104", nm: "XXX", zy: "", hq: "1800", dq: "",zd:0,zdnr:[]},//zd是表示折叠的 0为不能折叠也不是子元素
            //     {dt: "20230104", nm: "YYY", zy: "", hq: "", dq: "3400",zd:0,zdnr:[]},//1表示能折叠然后是文件夹类型
            //     {dt: "20230104", nm: "杂费", zy: "56(じ)+89(橡皮2)+45(ｚｚ)", hq: "190", dq: "",zd:1,zdnr:[]},//2表示它是子文件夹类型 三者可以修改和转换
            //     {dt: "20230104", nm: "ZZZ", zy: "", hq: "1500", dq: "",zd:0,zdnr:[]},//2表示它是子文件夹类型 三者可以修改和转换
            // ],
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
    z-index: 999;

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