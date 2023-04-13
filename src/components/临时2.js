let defaultData=[//金钱的基础数据。
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
];
let moneyData=[//金钱的处理数据，有了子节点
    {dt: "20230108", nm: "mD初始值不出现才对", zy: "mD初始值不出现才对", hq: "1800", dq: ""},
];
function tableData() {
    const k = [];//k存放"20230102旅費交通費"这种数字键，在查询k里键时，查到说明之前有同类，可合并，它对应的值是第一个同类（文件夹行）在k1里的索引。
    const k1=[...defaultData];//⭐⭐问题在这里。
    const k2 = [];//放结果用的k2
    // console.log('⭐ K1',k1);
    // console.log('——————————————————————————')
    let r = 0;//记录遍历时索引，把文件夹行的索引放在k里
    for (const item of k1) {//在默认数据k1中一个一个遍历
        if (["旅費交通費"].includes(item.nm)) {//符合折叠条件
            let str = item.dt + item.nm;
            if (str in k) {//is 3. put 3 in 1
                k2[k[str]].children.push({...item});
                k2[k[str]].children[k2[k[str]].children.length - 1].zd = 3;
                k2[k[str]].zd = 1;
                k2[k[str]].zy = k2[k[str]].zy + "、" + item.zy;
                k2[k[str]].hq = Number(k2[k[str]].hq) + Number(item.hq);

            } else {//  is 1    create children
                let ls = {...item};
                k2.push({...item});
                k2[k2.length-1].zd=0;
                k2[k2.length-1].children=[ls];
                k2[k2.length-1].children[k2[k2.length-1].children.length-1].zd=3;
                k[str] = r;
                r++;
            };
        } else {// is 0
            k2.push(item);
            k2[k2.length-1].zd=0;
            r++;
        };
    };

    moneyData = [...k2];
    let i = 0;
    for (let item of moneyData) {
        item.key = i;
        if ("children" in item && item.children.length == 1) {//delete children
            delete item.children;
            if (item.zd == 1) {
                item.zd = 0;
            };
        };
        i++;
    };
};
tableData();
tableData();
tableData();
tableData();
console.log(moneyData[1]);