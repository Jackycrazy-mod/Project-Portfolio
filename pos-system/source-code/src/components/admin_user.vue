<template>
    <div class="adminc">
        <div>
            <h1>Customer user</h1>
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
        <div v-if="users.length > 0">
            <br />
            <h2>All Users</h2>
            <ul>
                <li v-for="user in users">ID:{{ user._id }} /Customer Address:{{ user.customer_address }} /Password:{{
                    user.password }} /Name:{{ user.name }}</li>
            </ul>
            <div class="side">
                <div>
                    <h3>Add user</h3>
                    <form @submit.prevent="addUser">
                        <label for="customer_address">Customer Address</label>
                        <input type="text" placeholder="customer_address" v-model="newUser.customer_address" />
                        <label for="name">Name</label>
                        <input type="text" placeholder="name" v-model="newUser.name" />
                        <!--<label for="id">ID</label>
                    <input type="text" placeholder="id" v-model="newUser.id" />-->
                        <label for="password">Password</label>
                        <input type="text" placeholder="password" v-model="newUser.password" />
                        <button type="submit">Add User</button>
                    </form>
                </div>
                <div>
                    <h3>Delete user</h3>
                    <form @submit.prevent="deleteUserById">
                        <label for="id">ID</label>
                        <input type="text" placeholder="id" v-model="deleteUser._id" />
                        <button type="submit">Delete User</button>
                    </form>
                </div>
                <div>
                    <h3>Update user</h3>
                    <form @submit.prevent="updateUserById">
                        <label for="name">Name</label>
                        <input type="text" placeholder="name" v-model="updateUser.name" />
                        <label for="customer_address">Customer Address</label>
                        <input type="text" placeholder="customer_address" v-model="updateUser.customer_address" />
                        <label for="id">ID</label>
                        <input type="text" placeholder="id" v-model="updateUser.id" />
                        <label for="password">Password</label>
                        <input type="text" placeholder="password" v-model="updateUser.password" />
                        <button type="submit">Update User</button>
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
            users: [],
            newUser: {
                customer_address: '',
                name: '',
                password: ''
            },
            updateUser: {
                id: '',
                name: '',
                customer_address: '',
                password: ''
            },
            deleteUser: {
                _id: ''
            }
        };
    },
    mounted() {
        this.getAllUsers().catch(err => {
            console.log(err);
            this.$parent.loading = false;
            this.$parent.error = true;
        });
    },
    methods: {
        async getAllUsers() {
            try {
                const response = await fetch('http://localhost:8080/user/all');
                const data = await response.json();
                this.users = data;
            } catch (error) {
                console.log(error);
                this.$parent.loading = false;
                this.$parent.error = true;
            }
        },
        async addUser() {
            try {
                const response = await fetch('http://localhost:8080/user/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newUser)
                });
                const data = await response.json();
                this.users.push(data.ops[0]);

                this.newUser.customer_address = '';
                this.newUser.name = '';
                this.newUser.password = '';
                await this.getAllUsers();
            } catch (error) {
                console.log(error);
                this.$parent.loading = false;
                this.$parent.error = true;
            }
        },
        async updateUserById() {
            try {
                const response = await fetch('http://localhost:8080/user/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.updateUser)
                });
                const data = await response.json();
                console.log(data);
                const index = this.users.findIndex(user => user.id == this.updateUser.id);
                this.users[index].customer_address = this.updateUser.customer_address;
                this.users[index].password = this.updateUser.password;
                this.users[index].name = this.updateUser.name;

                this.updateUser.customer_address = '';
                this.updateUser.id = '';
                this.updateUser.name = '';
                this.updateUser.password = '';
                await this.getAllUsers();

            } catch (error) {
                console.log(error);
                this.$parent.loading = false;
                this.$parent.error = true;
            }
        },
        async deleteUserById() {
            try {

                const response = await fetch(`http://localhost:8080/user/delete/${this.deleteUser._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.deleteUser._id)
                });
                const data = await response.json();
                console.log(data);

                this.users = this.users.filter(user => user._id != this.deleteUser._id);

                this.deleteUser = {
                    _id: ''
                };

                await this.getAllUsers();
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
