import { defineStore } from 'pinia'
export const useRightClickMenuStore = defineStore('rightClickMenuS',{
    //id: 'moneyData',//如果上面和这里都写了id，以此处id为准
    state: () => ({//必须 用于返回 store 的初始状态。值都堆在这里面
        position:{x:0,y:0},
        row:0,//触发组件的那一行的索引
    }),
    actions: {//必须 包含了 store 操作的对象。
        // popo(){
        //         }
    },
});
