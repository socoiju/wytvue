import { defineStore } from 'pinia'
export const useMoneyDataStore = defineStore('moneyData',{
    //id: 'moneyData',//如果上面和这里都写了id，以此处id为准
    state: () => ({//必须 用于返回 store 的初始状态。
        count: 0,
    }),
    actions: {//必须 包含了 store 操作的对象。
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        },
    },
});
