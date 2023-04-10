<template>
    <div>
        <h1>用户列表</h1>
        <ul>
            <li v-for="user in users" :key="user.id">
                {{ user.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "vue0406",
    setup() {
        const users = reactive([
            { id: 1, name: '张三' },
            { id: 2, name: '李四' },
            { id: 3, name: '王五' },
        ]);

        const filteredUsers = computed(() => {
            return users.filter(user => user.name.includes('张'));
        });

        return {
            users: filteredUsers,
        };
    },
};
</script>
