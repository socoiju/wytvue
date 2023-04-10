<template>
<button @click=" sendS">喵喵A</button>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "buttoncountA",
    data(){
        return{
            n:1,
            b:0,
        }
    },

    props: ['getS',"k"],
    methods: {
        sendS() {
            // console.log("我是选项式按钮A。从父组件来的k为"+this.k);
            this.n=this.k+1;
            this.b++;
            console.log(`A收到了新的点击，这是第${this.b}次`);
            this.getS(this.n);
        }
    }
}
</script>
