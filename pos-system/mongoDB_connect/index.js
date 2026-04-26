'use strict'

const restify = require('restify')
const server = restify.createServer()
const corsMiddleware = require('restify-cors-middleware2')
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['https://*.repl.co', '*'],
  allowHeaders: ['cors'],
  exposeHeaders: ['API-Token-Expiry']
})

server.use(restify.plugins.fullResponse())
server.use(restify.plugins.bodyParser({ mapParams: false }))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.authorizationParser())
server.pre(cors.preflight)
server.use(cors.actual)

// URI for MongoDB connection (Replace with YOUR KEY, you can find from your MongoDB account)
const uri = `mongodb+srv://Jackycrazy_mod:A487709394b@possystemuse.pttabnv.mongodb.net/?retryWrites=true&w=majority`
const db = 'PosSystem'
const collection = 'customer'
//another collection
const collection2 = 'staff'
const collection3 = 'orders'
const collection4 = 'menu'


const status = {
  'ok': 200,
  'created': 201,
  'notModified': 304,
  'notFound': 404
}

const defaultPort = 8080

// Default route
server.get('/', (req, res, next) => res.send('Custom API for Workshop 4 and lab exercises'))

// ********************** Project sample API start *******************
//////////////////////////////////////////////////////////////////////////////////////

// Connect MongoDB to get static data
server.get('/static', (req, res, next) => {
  const client = new MongoClient(uri);
  async function run() {
    try {
      await client.connect();
      const database = client.db(db);
      const collection_customer = database.collection(collection);
      const collection_staff = database.collection(collection2);
      const collection_orders = database.collection(collection3);
      const collection_menu = database.collection(collection4);

      const count = await collection_customer.countDocuments();
      const count2 = await collection_staff.countDocuments();
      const count3 = await collection_orders.countDocuments();
      const count4 = await collection_menu.countDocuments();

      const json = {
        'customer': count,
        'staff': count2,
        'orders': count3,
        'menu': count4
      }
      res.send(json);
    
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
})

//connect mongodb to insert new order data
server.post('/order/create', (req, res, next) => {
  console.log('Create order')

  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {

      // Replace with your 'database' and 'collection' name
      const orders = client.db(db).collection(collection3)

      // insertOne can return data. Stored the data in 'order'
      const order = await orders.insertOne({
        food_id: req.body.food_id,
        food_name:req.body.food_name,
        food_price:req.body.food_price,
        food_quantity:req.body.quantity,})
      
      console.log(order)
      res.send(order)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})


// Connect MongoDB to get all order
server.get('/order/all', (req, res, next) => {
  console.log('Get All order')

  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {

      // Replace with your 'database' and 'collection' name
      const orderDb = client.db(db).collection(collection3)

      // find can return data. Stored the data in 'users'
      /*const order = await orderDb.insertOne({
        food_id: "9",
        food_name:"藍莓炒紅莓",
        food_price:"100",
        food_quantity:"1",})*/

      const orders = await orderDb.find().toArray()
      
      //console.log(users.name)
      res.send(orders)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})


// Connect MongoDB to delete order
server.del('/order/delete/:id', (req, res, next) => {
  
  const id = new ObjectId(req.params.id)

  console.log(`Deleting order with ID ${id}`)
  //console.log(`${req.params.id}`)
  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {
      // Replace with your 'database' and 'collection' name
      const orderDb = client.db(db).collection(collection3)

      // deleteOne can return data. Stored the data in 'users'
      const result = await orderDb.deleteOne({"_id": id})

      console.log(result)
      res.send(result)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})

//connect mongodb to insert new menu data
server.post('/menu/create', (req, res, next) => {
  console.log('Create menu')

  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {

      // Replace with your 'database' and 'collection' name
      const menus = client.db(db).collection(collection4)

      // insertOne can return data. Stored the data in 'user'
      const menu = await menus.insertOne({
        name: req.body.name,
        price: req.body.price,
      })
      
      console.log(menu)
      res.send(menu)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})


// Connect MongoDB to get all menu
server.get('/menu/all', (req, res, next) => {
  console.log('Get All menu')

  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {

      // Replace with your 'database' and 'collection' name
      const menuDb = client.db(db).collection(collection4)

      // find can return data. Stored the data in 'users'
      /*const menu = await menuDb.insertOne({
        name: "提子炒青瓜",
        price: 100,
      })*/

      const menus = await menuDb.find().toArray()
      
      //console.log(users.name)
      res.send(menus)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})

// Update menu data
server.put('/menu/update', (req, res, next) => {
  const id = req.body.id
  const price = req.body.price

  const idObj = new ObjectId(id)
  console.log(typeof idObj,idObj)
  console.log(`Update menu with ID ${id} and price ${price}`)

  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {
      
      // Replace with your 'database' and 'collection' name
      const menuDb = client.db(db).collection(collection4)
      // find can return data. Stored the data in 'users'
      const result = await menuDb.updateOne(
        { "_id": idObj },
        { $set: { "price": price } }
      );
      
      if (result.nModified === 0) {
        res.status(404).send('Document not found');
      } else {
        res.send(result);
      }
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})

// Connect MongoDB to delete menu
server.del('/menu/delete/:id', (req, res, next) => {
  
  const id = new ObjectId(req.params.id)

  console.log(`Deleting menu with ID ${id}`)
  //console.log(`${req.params.id}`)
  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {
      // Replace with your 'database' and 'collection' name
      const menuDb = client.db(db).collection(collection4)

      // deleteOne can return data. Stored the data in 'users'
      const result = await menuDb.deleteOne({"_id": id})

      console.log(result)
      res.send(result)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})

// Connect MongoDB to insert new staff data
server.post('/staff/create', (req, res, next) => {
  console.log('Create staff')

  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {

      // Replace with your 'database' and 'collection' name
      const staffs = client.db(db).collection(collection2)

      // insertOne can return data. Stored the data in 'user'
      const staff = await staffs.insertOne({
        name: req.body.name,
        contect: req.body.contect,
        age: req.body.age,
        salary: req.body.salary,
      })
      
      console.log(staff)
      res.send(staff)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})

// Connect MongoDB to get all staffs
server.get('/staff/all', (req, res, next) => {
  console.log('Get All staffs')

  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {

      // Replace with your 'database' and 'collection' name
      const staffDb = client.db(db).collection(collection2)

      // find can return data. Stored the data in 'users'
      /*const staff = await staffDb.insertOne({
        name: "max",
        contect: "123456789",
        age: 20,
        salary: 10000,
      })*/

      const staffs = await staffDb.find().toArray()
      
      //console.log(users.name)
      res.send(staffs)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})

// Update staff data
server.put('/staff/update', (req, res, next) => {
  const id = req.body.id
  //console.log(typeof id,id)
  const name = req.body.name
  const salary = req.body.salary

  const idObj = new ObjectId(id)
  console.log(typeof idObj,idObj)
  console.log(`Update User ${name} with ID ${id} and salary ${salary}`)

  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {
      
      // Replace with your 'database' and 'collection' name
      const staffDb = client.db(db).collection(collection2)
      // find can return data. Stored the data in 'users'
      const result = await staffDb.updateOne(
        { "_id": idObj },
        { $set: { "salary": salary } }
      );
      
      if (result.nModified === 0) {
        res.status(404).send('Document not found');
      } else {
        res.send(result);
      }
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})

// Connect MongoDB to delete staff
server.del('/staff/delete/:id', (req, res, next) => {
  
  const id = new ObjectId(req.params.id)

  console.log(`Deleting staff with ID ${id}`)
  //console.log(`${req.params.id}`)
  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {
      // Replace with your 'database' and 'collection' name
      const staffDb = client.db(db).collection(collection2)

      // deleteOne can return data. Stored the data in 'users'
      const result = await staffDb.deleteOne({"_id": id})

      console.log(result)
      res.send(result)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})
// Connect MongoDB to insert new user data
server.post('/user/create', (req, res, next) => {
  console.log('Create user')

  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {

      // Replace with your 'database' and 'collection' name
      const users = client.db(db).collection(collection)

      // insertOne can return data. Stored the data in 'user'
      const user = await users.insertOne({
        name: req.body.name,
        password: req.body.password,
        customer_address: req.body.customer_address,
      })
      
      console.log(user)
      res.send(user)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})

// Connect MongoDB to check whether the user is exist
server.post('/user/validate', (req, res, next) => {
  const input_address = req.body.admin_address

  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {

      // Replace with your 'database' and 'collection' name
      const users = client.db(db).collection('admin')

      // findOne can return data. Stored the data in 'user'
      const result = await users.findOne({'admin_address': input_address})

      console.log(result)
      res.send(result)

    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})

// Connect MongoDB to get all users
server.get('/user/all', (req, res, next) => {
  console.log('Get All Users')

  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {

      // Replace with your 'database' and 'collection' name
      const userDb = client.db(db).collection(collection)

      // find can return data. Stored the data in 'users'
      const users = await userDb.find().toArray()
      
      //console.log(users.name)
      res.send(users)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})

// Update user data
server.put('/user/update', (req, res, next) => {
  const id = req.body.id
  //console.log(typeof id,id)
  const name = req.body.name
  const password = req.body.password
  const customer_address = req.body.customer_address

  const idObj = new ObjectId(id)
  console.log(typeof idObj,idObj)
  console.log(`Update User ${name} , ${customer_address} with ID ${id} and password ${password}`)

  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {
      
      // Replace with your 'database' and 'collection' name
      const userDb = client.db(db).collection(collection)
      // find can return data. Stored the data in 'users'
      const result = await userDb.updateOne(
        { "_id": idObj },
        { $set: { "name": name,
                  "password": password, 
                  "customer_address": customer_address } }
      );
      
      if (result.nModified === 0) {
        res.status(404).send('Document not found');
      } else {
        res.send(result);
      }
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})

// Connect MongoDB to delete users
server.del('/user/delete/:id', (req, res, next) => {
  
  const id = new ObjectId(req.params.id)

  console.log(`Deleting User with ID ${id}`)
  //console.log(`${req.params.id}`)
  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {
      // Replace with your 'database' and 'collection' name
      const userDb = client.db(db).collection(collection)

      // deleteOne can return data. Stored the data in 'users'
      const result = await userDb.deleteOne({"_id": id})

      console.log(result)
      res.send(result)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})
// get item for menu**********************************menu
server.get('/menu_page', (req, res, next) => {
  console.log('Get All Menu')

  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);

  async function run() {
    try {
      // Replace with your 'database' and 'collection' name
      const menuDb = client.db(db).collection('menu')

      // find can return data. Stored the data in 'menu'
      const menu = await menuDb.find().toArray()

      console.log(menu)
      res.send(menu)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
})

// add item to chart**********************************cart
server.post('/chart/add', (req, res, next) => {
  const totalPrice = req.body.totalPrice
  const totalQuantity = req.body.totalQuantity
  const products = req.body.products

  console.log(`Total price ${totalPrice}`)
  console.log(`totalQuantity ${totalQuantity}`)
  console.log(`Add chart ${products}`)
  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);

  async function run() {
    try {
      // Replace with your 'database' and 'collection' name
      const chartDb = client.db(db).collection('chart')
      // insertOne can return data. Stored the data in 'cart'
      const chart = await chartDb.insertOne({
        totalPrice : totalPrice,
        totalQuantity : totalQuantity,
        products : products
      })

      console.log(chart)
      res.send(chart)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
})

server.get('/chart/find', (req,res,next) => {
  const client = new MongoClient(uri)

  async function find_charts(){
    try{
      const chartDB = client.db(db).collection('chart')

      const products = await chartDB.find().toArray()
      console.log(products)
      res.send(products)
    }
    finally{
      await client.close()
    }
  }
  find_charts().catch(console.dir)
})

server.post('/order/add', (req,res,next) => {
  const orders = req.body

  console.log(orders)
  console.log(orders.length)
  const client = new MongoClient(uri)

  async function run(orders){
    try{
      const orderDb = client.db(db).collection('orders')
      const chartDB = client.db(db).collection('chart')

      for(let i =0;i<orders.length;i++){
        const id =orders[i].food_id
        const name =orders[i].food_name
        const price =orders[i].food_price
        const quantity =orders[i].food_quantity

        const order = await orderDb.insertOne({
          "food_id":id,
          "food_name":name,
          "food_price":price,
          "food_quantity":quantity
        })
        console.log(order)
id      }



      
      const remove = await chartDB.deleteMany()

      console.log(remove)

    }finally{
      await client.close()
    }
  }
  run(orders).catch(console.dir)
})

// Connect MongoDB to take the order
server.get('/order/take', (req, res, next) => {
  console.log('Get order')

  // Variable 'uri' can be found at the top
  const client = new MongoClient(uri);
  
  async function run() {
    try {

      // Replace with your 'database' and 'collection' name
      const orderDb = client.db(db).collection("orders")

      const orders = await orderDb.find().toArray()
      
      console.log(orders)
      res.send(orders)
    } finally {
      await client.close()
    }
  }
  run().catch(console.dir)
  
})

server.post('/order/complete',(req,res,next)=>{
  const remove_id = req.body.id
  console.log(remove_id)

  const client = new MongoClient(uri)

  async function run(){
    try{
      const orderDb = client.db(db).collection("orders")

      const completed = await orderDb.deleteOne({_id:new ObjectId(`${remove_id}`)})

      const update_orders = await orderDb.find().toArray()
      console.log(completed)
      console.log(update_orders)
      res.send(update_orders)
    }finally{
      await client.close()
    }
  }
  run().catch(console.dir)
})



// ********************** Project sample API end *******************

// create API server
server.listen(defaultPort, err => {
  console.log('%s listening at %s', server.name, server.url)
  console.log('Custom API for Workshop 4 and lab exercises')
})



