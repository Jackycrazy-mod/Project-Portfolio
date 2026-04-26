<template>
    <div class="adminc">
        <div>
            <h1>Admin order</h1>
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
        <div v-if="orders.length > 0">
            <br />
            <h2>All order</h2>
            <ul>
                <li v-for="order in orders">ID:{{ order._id }} /food_id:{{ order.food_id }} /Name:{{ order.food_name }}
                    /food price:{{ order.food_price }} /Quantity:{{ order.food_quantity }}</li>
            </ul>
            <div class="side">
                <div>
                    <h3>Add order</h3>
                    <form @submit.prevent="addOrder">
                        <label for="food_id">food_id</label>
                        <input type="text" placeholder="food_id" v-model="newOrder.food_id" />
                        <label for="food_name">food_name</label>
                        <input type="text" placeholder="food_name" v-model="newOrder.food_name" />
                        <label for="food_price">food_price</label>
                        <input type="text" placeholder="food_price" v-model="newOrder.food_price" />
                        <label for="quantity">quantity</label>
                        <input type="text" placeholder="quantity" v-model="newOrder.quantity" />
                        <button type="submit">Add order</button>
                    </form>
                </div>
                <div>
                    <h3>Delete order</h3>
                    <form @submit.prevent="deleteOrderById">
                        <label for="id">ID</label>
                        <input type="text" placeholder="id" v-model="deleteOrder._id" />
                        <button type="submit">Delete order</button>
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
            orders: [],
            newOrder: {
                food_id: '',
                food_name: '',
                food_price: '',
                quantity: ''
            },
            deleteOrder: {
                _id: ''
            }
        };
    },
    mounted() {
        this.getAllOrder().catch(err => {
            console.log(err);
            this.$parent.loading = false;
            this.$parent.error = true;
        });
    },
    methods: {
        async getAllOrder() {
            try {
                const response = await fetch('http://localhost:8080/order/all');
                const data = await response.json();
                this.orders = data;
            } catch (error) {
                console.log(error);
                this.$parent.loading = false;
                this.$parent.error = true;
            }
        },
        async addOrder() {
            try {
                const response = await fetch('http://localhost:8080/order/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newOrder)
                });
                const data = await response.json();
                this.orders.push(data.ops[0]);

                this.newOrder.food_id = '';
                this.newOrder.food_name = '';
                this.newOrder.food_price = '';
                this.newOrder.quantity = '';
                await this.getAllOrder();
            } catch (error) {
                console.log(error);
                this.$parent.loading = false;
                this.$parent.error = true;
            }
        },
        async deleteOrderById() {
            try {

                const response = await fetch(`http://localhost:8080/order/delete/${this.deleteOrder._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.deleteOrder._id)
                });
                const data = await response.json();
                console.log(data);

                this.orders = this.orders.filter(order => order._id != this.deleteOrder._id);

                this.deleteOrder = {
                    _id: ''
                };
                await this.getAllOrder();
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
