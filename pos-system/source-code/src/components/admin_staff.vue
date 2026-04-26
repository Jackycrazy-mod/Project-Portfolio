<template>
    <div class="adminc">
        <div>
            <h1>Admin staff</h1>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <div class="router">
                            <router-link to="/admin_dashboard">Dashboard</router-link>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="router">
                            <router-link to="/admin_menu">Menu</router-link>
                        </div>
                    </div>
                    <!--<div class="col-md-3">
                    <div class="router">
                        <router-link to="/admin_display">Admin display</router-link>
                    </div>
                </div>-->
                    <div class="col-md-3">
                        <div class="router">
                            <router-link to="/admin_user">User</router-link>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="router">
                            <router-link to="/admin_order">Orders</router-link>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="router">
                            <router-link to="/admin_staff">Staff</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--other router link-->
        <!--display all user-->
        <div v-if="staffs.length > 0">
            <br />
            <h2>All staff</h2>
            <ul>
                <li v-for="staff in staffs">ID:{{ staff._id }} /Age:{{ staff.age }} /Salary:{{ staff.salary }} /Name:{{
                    staff.name }}</li>
            </ul>
            <div class="side">
                <div>
                    <h3>Add staff</h3>
                    <form @submit.prevent="addStaff">
                        <label for="age">Age</label>
                        <input type="text" placeholder="age" v-model="newStaff.age" />
                        <label for="name">Name</label>
                        <input type="text" placeholder="name" v-model="newStaff.name" />
                        <label for="salary">salary</label>
                        <input type="text" placeholder="salary" v-model="newStaff.salary" />
                        <button type="submit">Add staff</button>
                    </form>
                </div>
                <div>
                    <h3>Delete staff</h3>
                    <form @submit.prevent="deleteStaffById">
                        <label for="id">ID</label>
                        <input type="text" placeholder="id" v-model="deleteStaff._id" />
                        <button type="submit">Delete staff</button>
                    </form>
                </div>
                <div>
                    <h3>Update staff</h3>
                    <form @submit.prevent="updateStaffById">
                        <label for="id">ID</label>
                        <input type="text" placeholder="id" v-model="updateStaff.id" />
                        <label for="salary">salary</label>
                        <input type="text" placeholder="salary" v-model="updateStaff.salary" />
                        <button type="submit">Update salary</button>
                    </form>
                </div>
            </div>
        </div>
        <div v-else>
            <br />
            <br />
            <h1>Loading...</h1>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            staffs: [],
            newStaff: {
                age: '',
                name: '',
                salary: ''
            },
            deleteStaff: {
                _id: ''
            },
            updateStaff: {
                id: '',
                salary: ''
            }
        };
    },
    mounted() {
        this.getAllStaffs().catch(err => {
            console.log(err);
            this.$parent.loading = false;
            this.$parent.error = true;
        });
    },
    methods: {
        async getAllStaffs() {
            try {
                const response = await fetch('http://localhost:8080/staff/all');
                const data = await response.json();
                this.staffs = data;
            } catch (error) {
                console.log(error);
                this.$parent.loading = false;
                this.$parent.error = true;
            }
        },
        async addStaff() {
            try {
                const response = await fetch('http://localhost:8080/staff/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newStaff)
                });
                const data = await response.json();
                this.staffs.push(data.ops[0]);

                this.newStaff.age = '';
                this.newStaff.name = '';
                this.newStaff.salary = '';
                await this.getAllStaffs();
            } catch (error) {
                console.log(error);
                this.$parent.loading = false;
                this.$parent.error = true;
            }
        },
        async updateStaffById() {
            try {
                const response = await fetch('http://localhost:8080/staff/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.updateStaff)
                });
                const data = await response.json();
                console.log(data);
                const index = this.staffs.findIndex(staff => staff._id == this.updateStaff.id);
                this.staffs[index].salary = this.updateStaff.salary;

                this.updateStaff.id = '';
                this.updateStaff.salary = '';
                await this.getAllStaffs();

            } catch (error) {
                console.log(error);
                this.$parent.loading = false;
                this.$parent.error = true;
            }
        },
        async deleteStaffById() {
            try {

                const response = await fetch(`http://localhost:8080/staff/delete/${this.deleteStaff._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.deleteStaff._id)
                });
                const data = await response.json();
                console.log(data);

                this.staffs = this.staffs.filter(staff => staff._id !== this.deleteStaff._id);
                this.deleteStaff = {
                    _id: ''
                };
                await this.getAllStaffs();
            } catch (error) {
                console.log(error);
                this.$parent.loading = false;
                this.$parent.error = true;
            }
        }
    }
};
</script>

<style src="./css_files/admin_style.css"></style>
