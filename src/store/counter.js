import {defineStore} from 'pinia'

export const useCounterStore = defineStore('counter', {
    //id: 'moneyData',//如果上面和这里都写了id，以此处id为准
    state: () => ({//必须 用于返回 store 的初始状态。值都堆在这里面
        count: 0,
        zhi: 1,
        defaultData: [//金钱的基础数据。
            {dt: "20230104", nm: "1号XXX", zy: "1号", hq: "1800.4", dq: "18000.8"},
            {dt: "20230104", nm: "旅費交通費", zy: "2号", hq: "2", dq: ""},
            {dt: "20230104", nm: "旅費交通費", zy: "3号", hq: "3", dq: ""},
            {dt: "20230104", nm: "旅費交通費", zy: "3.1号", hq: "3.1", dq: ""},
            {dt: "20230104", nm: "旅費交通費", zy: "3.2号", hq: "3.2", dq: ""},
            {dt: "20230105", nm: "旅費交通費", zy: "4号", hq: "4", dq: ""},
            {dt: "20230105", nm: "旅費交通費", zy: "5号", hq: "5", dq: ""},
            {dt: "20230105", nm: "6号杂费", zy: "56(じ)+89(橡皮2)+45(ｚｚ)", hq: "190.1", dq: "245"},
            {dt: "20230105", nm: "7号ZZZ", zy: "7号", hq: "1500", dq: ""},
            {dt: "20230108", nm: "旅費交通費", zy: "8号", hq: "8", dq: ""},
            {dt: "20230104", nm: "旅費交通費", zy: "8.1号", hq: "8.1", dq: ""},
            {dt: "20230108", nm: "9号XXX", zy: "9号", hq: "1800", dq: "345"},
        ],
        moneyData: [//金钱的处理数据，有了子节点
            {dt: "20230108", nm: "mD初始值不出现才对", zy: "mD初始值不出现才对", hq: "1800", dq: ""},
        ],
        moneySaveData:[],
        cangaoData: [],
        cangaoRenderData: [],//为了给表格折叠的时候显示正常的残高
        cangao: 0,//先月残高
    }),
    actions: {//必须 包含了 store 操作的对象。
        increment() {
            this.count += this.zhi;
        },
        decrement() {
            this.count -= this.zhi;
        },
        tableData() {
            const k = [];//k存放"20230102旅費交通費"这种数字键，在查询k里键时，查到说明之前有同类，可合并，它对应的值是第一个同类（文件夹行）在k1里的索引。
            const k1 = [...this.defaultData];//k1复制默认数据出来，防止修改掉默认数据。
            const k2 = [];//放结果用的k2
            let r = 0;//记录遍历时索引，把文件夹行的索引放在k里
            for (const item of k1) {//在默认数据k1中一个一个遍历
                if (["旅費交通費"].includes(item.nm)) {//符合折叠条件
                    //！！不考虑排序。尽量一个一个就那样push进去，k存文件夹行的索引，好找
                    //！！注册键的格式是日期加上名字"20230102旅費交通費"这种，防止之后多了其他名字
                    let str = item.dt + item.nm;//str中存放数字识别键，这些都放在k里面了
                    if (str in k) {//当之前已经存在同类或有折叠文件夹， 把此内容推到那个索引的children数组中。push进去
                        k2[k[str]].children.push({...item});//为k2里自己的第一个同类索引的children推送复制的自己。
                        k2[k[str]].children[k2[k[str]].children.length - 1].zd = 3;//把刚推送的“复制的自己”的zd改为3，这是子节点的标志。
                        k2[k[str]].zd = 1;//把这个同类索引的zd改为1，这是文件夹行的标志。
                        //这里似乎是当时push忘记那仨点点了---解决：push也是引用来着。问题：每次触发这个函数，这里都会增加而不是清空后再写入。
                        k2[k[str]].zy = k2[k[str]].zy + "、" + item.zy;//为文件夹行生成新的摘要，每个用日文标点区分开
                        k2[k[str]].hq = Number(k2[k[str]].hq) + Number(item.hq);//计算此行金钱sum
                        //console.log(`摘要叫做${item.zy}的，当前索引数为${r}。是旅費交通費，且已经有同日记录，推送到了第${k[str]}行`);
                        // console.log(`推送了此${str}内容去${k[str]}位置`);
                        //因为k2没有增加新的项，所以r索引不增加
                        //💟0413检查结果 没有发现对于tD的改动，而且每次运行之前k,k2都是空数组，理论上不会重叠堆放。⭐可以检查每次运行前k，k1,k2是不是空的。
                    } else {//虽然属于折叠项但这是第一个,所以正常push,但给children里面一个自己的副本，如果有第二项，它就是第一项折叠内容了，如果没有，最后会删掉它的children。
                        //1复制自己叫ls 2给自己建立children数组 3 把自己的复制版ls放进去 4 把带着ls的item（自己）推给k2
                        let ls = {...item};
                        k2.push({...item});
                        k2[k2.length-1].zd=0;
                        k2[k2.length-1].children=[ls];
                        k2[k2.length-1].children[k2[k2.length-1].children.length-1].zd=3;
                        k[str] = r;//在k中新建一个键值对,这是记录的文件夹位置索引。我为什么要写[r]，只有一个索引就够了。
                        r++;
                    }
                } else {//不是那个名字，正常推送。是普通的行
                    k2.push(item);//❗这里没有推送自己的复制版，⭐出错会是在这里吗
                    k2[k2.length-1].zd=0;
                    r++;
                }
                if (r > 100) {//暂时用不上，日后可删。之前没写好，死循环的时候用的
                    break;
                }
            }
            this.moneyData = [...k2];
            let i = 0;//为了树形表格的渲染，需要添加编号
            for (let item of this.moneyData) {//直接改mD了
                item.key = i;
                if ("children" in item && item.children.length == 1) {//单文件夹行不再保留这个
                    delete item.children;
                    if (item.zd == 1) {//保证没有孩子节点的折叠值为0.如果确定了这之前也能保证，这里的可以删掉
                        item.zd = 0;
                    }
                }
                i++;
            }
            //console.log(this.moneyData[3]);
            //counter.count为总计数

            //console.log(this.moneyData);
            //this.cangaoInpu();先不算

            // console.log("这是期间每次的k1");
            // console.log(k1);
        },

        cangaoInpu() {
            let k = [this.cangao];
            for (let i = 0; i < this.moneyData.length; i++) {
                let loss = Number(this.moneyData[i].hq);
                let gett = Number(this.moneyData[i].dq);
                if (this.moneyData[i].zd == 3) {   //3是折叠内的值，不参与计算。
                    loss = 0;
                    gett = 0;
                }
                this.cangaoData[i] = k[i] - loss + gett;
                k.push(Math.round(this.cangaoData[i]));
                //console.log("运行第"+i+"次的金钱数据："+this.moneyData[i]);
                if (loss == 0 && gett == 0) {
                    this.cangaoData[i] = "";
                    //break;//发现此行没有入金和出金就停止计算残高。但是这样的话中间行数就不能空。总之先这样写着，毕竟原文行数也没有留空
                }

            }
        },
        cangaoRender() {
            // console.log(`⭐在渲染残高之前的真实残高，应该是已经计算过了的`);
            // console.log(this.cangaoData)
            this.cangaoRenderData = [...this.cangaoData];
            // console.log("⭐在计算渲染残高之前");
            // console.log(this.cangaoRenderData);
            let n = 0;
            for (let i = this.moneyData.length - 1; i >= 0; i--) {
                //console.log(`⭐当前看的是第${i}个moneyData的数据！`)
                if (this.moneyData[i].zd == 1) {//代表有文件夹
                    n = this.moneyData[i].children.length;
                    // console.log(`⭐这是一个有子节点的行，行的索引为${i}，子节点数目为${n}`);
                    for (n; n > 0; n--) {
                        this.cangaoRenderData.splice(i + 1, 0, "");
                    }

                }
            }
            // console.log("⭐计算之后");
            // console.log(this.cangaoRenderData);
        },
        //增加一行，折叠状态默认为0（非折叠行），重算残高9
        addRow(index) {
            this.moneyData.splice(index+1,0,{dt: "", nm: "", zy: "", hq: "", dq: "", zd: 0, children: []})
            if (index+1>=this.moneyData.length-1){//new 7最大
                if (index+1==0) {//唯一
                    this.moneyData[index+1].key =0;
                }else{
                    this.moneyData[index+1].key =this.moneyData[index].key+1; //7 key =6 key+1
                }
            }else if(index+1==0){//最小
                this.moneyData[index+2].key = (this.moneyData[index+1].key+this.moneyData[index+3].key)/2;
                this.moneyData[index+1].key=0;
            } else{
                this.moneyData[index+1].key = (this.moneyData[index].key+this.moneyData[index+2].key)/2;
            }//7 key = (6+8)/2

            for(let i=0;i<this.moneyData.length;i++){
                this.moneyData[i].key=i;
            }
            this.cangaoInpu();
            this.cangaoRender();
            //console.log("我是来自counter，为moneyData增加一行的函数，我运行了一次");
        },
        deleteRow(index){
            this.moneyData.splice(index,1);
            for(let i=0;i<this.moneyData.length;i++){
                this.moneyData[i].key=i;
            }
            this.cangaoInpu();
            this.cangaoRender();
        },
        clearRow(index){
            this.moneyData[index]={dt: "", nm: "", zy: "", hq: "", dq: "", zd: 0, children: []};
            for(let i=0;i<this.moneyData.length;i++){
                this.moneyData[i].key=i;
            }
            this.cangaoInpu();
            this.cangaoRender();
        },



    },
});
