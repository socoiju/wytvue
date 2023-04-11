import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter',{
    //id: 'moneyData',//如果上面和这里都写了id，以此处id为准
    state: () => ({//必须 用于返回 store 的初始状态。值都堆在这里面
        count:0,
        zhi:1,
        defaultData: [//金钱的基础数据。
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
        moneyData:[//金钱的处理数据，有了子节点
            {dt: "20230108", nm: "1号XXX", zy: "9号", hq: "1800", dq: ""},
        ]
    }),
    actions: {//必须 包含了 store 操作的对象。
        increment() {
            this.count+=this.zhi;
        },
        decrement() {
            this.count-=this.zhi;
        },
        tableData(){
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
                        //1让ls等于自己 2给自己建立zdnr数组 3 ls放进去 4 整个item推给k2
                        let ls={...item};
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
            this.moneyData=[...k2];//完全改变了moneyData的值
            //console.log(this.moneyData[3]);
            //counter.count为总计数

            //console.log(this.moneyData);
            //this.cangaoInpu();先不算

            // console.log("这是期间每次的k1");
            // console.log(k1);
        }
    },
});
