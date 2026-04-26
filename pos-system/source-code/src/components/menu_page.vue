<template>
  <div class="menu-page">
    <div class="container">
      <header>
        <h1>My Restaurant Menu</h1>
        <div class="shopping">
          <button @click.prevent="showCart">
          <img src="./images/shopping.svg" alt="Shopping Cart" />
          <span v-if="totalQuantity > 0">{{ totalQuantity }}</span>
          </button>
        </div>
      </header>
      <div class="list">
        <div class="item">
          <img src="./images/1.PNG" alt="Food 1" />
          <div class="title">Itali Pasta</div>
          <div class="price">$10</div>
          <button @click="addToCart(1, 'Itali Pasta', 10)">Add to Cart</button>
        </div>
        <div class="item">
          <img src="./images/2.PNG" alt="Food 2" />
          <div class="title">Turkey</div>
          <div class="price">$15</div>
          <button @click="addToCart(2, 'Turkey', 15)">Add to Cart</button>
        </div>
        <div class="item">
          <img src="./images/3.PNG" alt="Food 3" />
          <div class="title">Fish</div>
          <div class="price">$12</div>
          <button @click="addToCart(3, 'Fish', 12)">Add to Cart</button>
        </div>
        <div class="item">
          <img src="./images/4.PNG" alt="Food 4" />
          <div class="title">Soup</div>
          <div class="price">$8</div>
          <button @click="addToCart(4, 'Soup', 8)">Add to Cart</button>
        </div>
        <div class="item">
          <img src="./images/5.PNG" alt="Food 5" />
          <div class="title">Salad</div>
          <div class="price">$18</div>
          <button @click="addToCart(5, 'Salad', 18)">Add to Cart</button>
        </div>
        <div class="item">
          <img src="./images/6.PNG" alt="Food 6" />
          <div class="title">Piza</div>
          <div class="price">$11</div>
          <button @click="addToCart(6, 'Piza', 11)">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu_page",
  data() {
    return {
      totalPrice:0,
      totalQuantity:0,
      products:[]
    };
  },
  methods: {
    async addToCart(id, title, price) {
      this.totalPrice += price;
      this.totalQuantity += 1;

      this.products.push({"food_id":id,"food_name":title,"food_price":price})

      console.log(this.products);

    },
    async showCart(){
      this.$router.push({ name: 'chart_list'})

      const requestOptions ={
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          totalPrice : this.totalPrice,
          totalQuantity : this.totalQuantity,
          products : this.products
        })
      }
      const response = await fetch(
        "http://localhost:8080/chart/add",
        requestOptions
      )
      const data = await response.json()
      console.log(data)
    }
  },
};
</script>
<style>
.menu-page body {
    background-color: #e3e7e8;
    font-family: system-ui;
  }
  .menu-page .container {
    width: 1000px;
    margin: auto;
    transition: 0.5s;
  }
  .menu-page header {
    display: grid;
    grid-template-columns: 1fr 50px;
    margin-top: 50px;
  }
  .menu-page header .shopping {
    position: relative;
    text-align: right;
  }
  .menu-page header .shopping img {
    width: 40px;
  }
  .menu-page header .shopping span {
    background: red;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: absolute;
    top: -5px;
    left: 80%;
    padding: 3px 10px;
  }
  .menu-page .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
    row-gap: 20px;
    margin-top: 50px;
  }
  .menu-page .list .item {
    text-align: center;
    background-color: #dce0e1;
    padding: 20px;
    box-shadow: 0 50px 50px #757676;
    letter-spacing: 1px;
  }
  .menu-page .list .item img {
    width: 90%;
  }
  .menu-page .list .item .title {
    font-weight: 600;
  }
  .menu-page .list .item .price {
    margin: 10px;
  }
  .menu-page .list .item button {
    background-color: #1c1f25;
    color: #fff;
    width: 100%;
    padding: 10px;
  }
  .menu-page .card {
    position: fixed;
    top: 0;
    left: 100%;
    width: 500px;
    background-color: #453e3b;
    height: 100vh;
    transition: 0.5s;
  }
  .menu-page .active .card {
    left: calc(100% - 500px);
  }
  .menu-page .active .container {
    transform: translateX(-200px);
  }
  .menu-page .card h1 {
    color: #e8bc0e;
    font-weight: 100;
    margin: 0;
    padding: 0 20px;
    height: 80px;
    display: flex;
    align-items: center;
  }
  .menu-page .card .checkOut {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .menu-page .card .checkOut div {
    background-color: #e8bc0e;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
  }
  .menu-page .card .checkOut div:nth-child(2) {
    background-color: #1c1f25;
    color: #fff;
  }
  .menu-page .listCard li {
    display: grid;
    grid-template-columns: 100px repeat(3, 1fr);
    color: #fff;
    row-gap: 10px;
  }
  .menu-page .listCard li div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .menu-page .listCard li img {
    width: 90%;
  }
  .menu-page .listCard li button {
    background-color: #fff5;
    border: none;
  }
  .menu-page .listCard .count {
    margin: 0 10px;
  }
</style>
