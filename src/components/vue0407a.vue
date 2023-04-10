<template>
    <buttoncountA :getS="getS" :k="k"/>
    <buttoncountB :getS="getS" :k="k"/>
</template>

<script>
import buttoncountA from "./xiaozujian/buttoncountA.vue";
import buttoncountB from "./xiaozujian/buttoncountB.vue";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "vue0407a.vue",
    data() {
        return {
            k:0,
        }
    },
    components:{
        buttoncountA,buttoncountB
    },
    methods:{
        getS(name) {
            this.k=name;
            console.log(`App收到了新的点击，这是第${name}次`);
        }
    }
}
</script>