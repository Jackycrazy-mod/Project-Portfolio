<template>
  <div class="chart-list">
    <body>
      <div class="container">
        <ul>
          Order List <button class="refresh" @click="getOrder" style="color: yellow; background-color: brown;">Refresh</button>
          <li v-for="(item, index) in items" :key="index">
            {{ index+1 }}.
            {{ item.food_name }}({{ item.food_quantity }})
            <button class="completed" @click="completeOrder(item[`_id`])">Completed</button>
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
    this.getOrder();
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
    async getOrder() {
      this.items=[]
      let url = "http://localhost:8080/order/take";
      const response = await fetch(url);
      const data = await response.json();
      for(let i = 0; i<data.length;i++){
        this.items.push(data[i])
      }
    },
    async completeOrder(remove_id){
      console.log(remove_id)

      const requestOptions={
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:remove_id})
      }

      const response = await fetch(
        "http://localhost:8080/order/complete",
        requestOptions
      )
      this.items=[]
      const data = await response.json()
      console.log(data)
      for(let i = 0; i<data.length;i++){
        this.items.push(data[i])
      }
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
.chart-list ul .completed {
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
