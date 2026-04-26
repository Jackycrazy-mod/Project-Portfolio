<template>
  <div class="chart-list">
    <body>
      <div class="container">
        <button type="button" @click.prevent="confirmOrder">Confirm Order</button>
        <ul>
          <li v-for="(item, index) in items" :key="index">
            {{ item.food_name }}({{ item.food_quantity }})(${{
              item.food_price
            }})
            <button class="add" @click="addChart(item.food_id)">+</button>
            <button class="minus" @click="removeChart(item.food_id)">-</button>
          </li>
        </ul>
      </div>
    </body>
  </div>
</template>

<script>
export default {
  name: "chart_list",
  props: ["shoppingCart"],
  created() {
    this.getChart();
  },
  data() {
    return {
      items: [], //[{food_id:"id",food_name:"food_name","food_price":y,food_quantity:x}]
      totalPrice: 0,
      totalQuantity: 0,
      newItem: "",
    };
  },
  methods: {
    async getChart() {
      let url = "http://localhost:8080/chart/find";
      const response = await fetch(url);
      const raw_data = await response.json();
      const data = raw_data[0];
      const totalPrice = data.totalPrice;
      const totalQuantity = data.totalQuantity;

      console.log(totalPrice);

      for (let i = 0; i < data.products.length; i++) {
        const food_item = data.products[i];

        const food_id = food_item.food_id;
        const food_name = food_item.food_name;
        const food_price = food_item.food_price;
        var id_exists = false;

        for (let j = 0; j < this.items.length; j++) {
          if (this.items[j].food_id == food_id) {
            this.items[j].food_price += food_price;
            this.items[j].food_quantity++;
            id_exists = true;
            break;
          }
        }

        if (!id_exists) {
          this.items.push({
            food_id: food_id,
            food_name: food_name,
            food_price: food_price,
            food_quantity: 1,
          });
        }
      }

      this.totalPrice = totalPrice;
      this.totalQuantity = totalQuantity;
    },
    async addChart(id){
      console.log(id)
      for (let i = 0; i<this.items.length;i++){
        const check_item = this.items[i]
        if(id == check_item.food_id){
          const food_price = check_item.food_price/check_item.food_quantity
          this.items[i].food_price += food_price
          this.items[i].food_quantity++
        }
      }
    },
    async removeChart(id){
      console.log(id)
      for (let i = 0; i<this.items.length;i++){
        const check_item = this.items[i]
        if(id == check_item.food_id){
          const food_price = check_item.food_price/check_item.food_quantity
          this.items[i].food_price -= food_price
          this.items[i].food_quantity--
        }
      }
    },
    async confirmOrder(){
      this.$router.push({name:'order_confirmed'})
      console.log(this.items)
      const requestOptions={
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(this.items)
      }

      const response = await fetch(
        "http://localhost:8080/order/add",
        requestOptions
      )
      const data = await response.json()
      console.log(data)
    }
  },
};
</script>

<style>
.chart-list * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  letter-spacing: 1px;
  text-transform: capitalize;
}
.chart-list body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chart-list .container {
  height: 450px;
  width: 330px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  padding: 10px;
  overflow-y: auto;
}
.chart-list #input {
  height: 50px;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 5px;
  background: #666;
  color: #fff;
}
.chart-list #input::placeholder {
  color: #bbb;
}
.chart-list ul li {
  background: #eee;
  color: #333;
  border-radius: 50px;
  margin: 10px 0;
  padding: 10px;
  position: relative;
}
.chart-list ul button {
  border: none;
}
.chart-list ul .add {
  right: 40px;
  color: green;
}
.chart-list ul .minus {
  right: 15px;
  color: #ff0033;
}
.chart-list ul .add,
.minus {
  position: absolute;
  cursor: pointer;
}
</style>
