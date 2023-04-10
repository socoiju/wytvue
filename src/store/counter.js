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

        ]
    }),
    actions: {//必须 包含了 store 操作的对象。
        increment() {
            this.count+=this.zhi;
        },
        decrement() {
            this.count-=this.zhi;
        },
    },
});
