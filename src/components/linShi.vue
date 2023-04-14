<templeted>
<ul>
    <li v-for="task in tasks"
        :key="task.id"
    >
        <span><input type="checkbox" v-model="task.completed"></span>
        <span></span>
        <span><button @click="deleteTask(task.id)">删除</button></span>
    </li>
</ul>
</templeted>
<script setup>
import {ref} from "vue";
const getTasks = async () => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (querySnapshot) => {
        tasks.value = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
    });
};
</script>