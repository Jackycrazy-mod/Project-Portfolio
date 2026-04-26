<template>
    <div class="adminc">
        <div>
            <h1>admin menu</h1>
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
        <div v-if="menus.length > 0">
            <br />
            <h2>All menu</h2>
            <ul>
                <li v-for="menu in menus">ID:{{ menu._id }} /Price:{{ menu.price }} /Name:{{ menu.name }}</li>
            </ul>
            <div class="side">
                <div>
                    <h3>Add menu</h3>
                    <form @submit.prevent="addMenu">
                        <label for="name">Name</label>
                        <input type="text" placeholder="name" v-model="newMenu.name" />
                        <label for="price">price</label>
                        <input type="text" placeholder="price" v-model="newMenu.price" />
                        <button type="submit">Add menu</button>
                    </form>
                </div>
                <div>
                    <h3>Delete menu</h3>
                    <form @submit.prevent="deleteMenuById">
                        <label for="id">ID</label>
                        <input type="text" placeholder="id" v-model="deleteMenu._id" />
                        <button type="submit">Delete menu</button>
                    </form>
                </div>
                <div>
                    <h3>Update price</h3>
                    <form @submit.prevent="updateMenuById">
                        <label for="id">ID</label>
                        <input type="text" placeholder="id" v-model="updateMenu.id" />
                        <label for="price">price</label>
                        <input type="text" placeholder="price" v-model="updateMenu.price" />
                        <button type="submit">Update price</button>
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
            menus: [],
            newMenu: {
                name: '',
                price: ''
            },
            deleteMenu: {
                _id: ''
            },
            updateMenu: {
                id: '',
                price: ''
            }
        };
    },
    mounted() {
        this.getAllMenu().catch(err => {
            console.log(err);
            this.$parent.loading = false;
            this.$parent.error = true;
        });
    },
    methods: {
        async getAllMenu() {
            try {
                const response = await fetch('http://localhost:8080/menu/all');
                const data = await response.json();
                this.menus = data;
            } catch (error) {
                console.log(error);
                this.$parent.loading = false;
                this.$parent.error = true;
            }
        },
        async addMenu() {
            try {
                const response = await fetch('http://localhost:8080/menu/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newMenu)
                });
                const data = await response.json();
                this.menus.push(data.ops[0]);

                this.newMenu.name = '';
                this.newMenu.price = '';
                await this.getAllMenu();
            } catch (error) {
                console.log(error);
                this.$parent.loading = false;
                this.$parent.error = true;
            }
        },
        async updateMenuById() {
            try {
                const response = await fetch('http://localhost:8080/menu/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.updateMenu)
                });
                const data = await response.json();
                console.log(data);

                const index = this.menus.findIndex(menu => menu._id == this.updateMenu.id);
                this.menus[index].price = this.updateMenu.price;

                this.updateMenu.id = '';
                this.updateMenu.price = '';
                await this.getAllMenu();
            } catch (error) {
                console.log(error);
                this.$parent.loading = false;
                this.$parent.error = true;
            }
        },
        async deleteMenuById() {
            try {

                const response = await fetch(`http://localhost:8080/menu/delete/${this.deleteMenu._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.deleteMenu._id)
                });
                const data = await response.json();
                console.log(data);

                this.menus = this.menus.filter(menu => menu._id != this.deleteMenu._id);

                this.deleteMenu = {
                    _id: ''
                };
                await this.getAllMenu();
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