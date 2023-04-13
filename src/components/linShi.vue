<template>
    <el-table :data="tableData">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="age" label="Age" />
        <el-table-column editable prop="zy" label="摘要" />
    </el-table>
    <el-table :data="tableData">
        <el-table-column label="Name" prop="name">
            <template v-slot="{ row }">
                <el-input v-model="row.name"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="Age" prop="age">
            <template v-slot="{ row }">
                <el-input v-model.number="row.age"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="Email" prop="email">
            <template v-slot="{ row }">
                <el-input v-model="row.email"></el-input>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
let tableData=[
    { id: 1231, name: 'John', age: 30, zy:'qwertyui',email: 'john@example.com' },
    { id: 1541,name: 'Jane', age: 25, zy:'opcdsyui', email: 'jane@example.com' },
    { id: 2233,name: 'Bob', age: 40, zy:'asdfrtyui', email: 'bob@example.com' }
]

</script>