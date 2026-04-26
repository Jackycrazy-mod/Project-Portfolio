<template>
    <div class="adminc">
        <div>
            <h1>Admin Dashboard</h1>
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
        <div v-if="jsons !== null">
            <br />
            <h2>Count for each database</h2>
            <ul>
                <li>
                    <h3>Order Count:{{ jsons.orders }}</h3>
                </li>
                <li>
                    <h3>Menu Count:{{ jsons.menu }}</h3>
                </li>
                <li>
                    <h3>Staff Count:{{ jsons.staff }}</h3>
                </li>
                <li>
                    <h3>User Count:{{ jsons.customer }}</h3>
                </li>
            </ul>
        </div>
        <div v-else>
            <br />
            <br />
            <br />
            <h2>Count for each database</h2>
            <h3>error</h3>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            jsons: null,
        }
    },
    mounted() {
        this.getCount();
    },
    methods: {
        async getCount() {
            try {
                const response = await fetch('http://localhost:8080/static');
                const json = await response.json();
                this.jsons = json;
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>
<style src="./css_files/admin_style.css"></style>