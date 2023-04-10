import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter',{
    //id: 'moneyData',//如果上面和这里都写了id，以此处id为准
    state: () => ({//必须 用于返回 store 的初始状态。值都堆在这里面
        count: 0,
        zhi:0,
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
