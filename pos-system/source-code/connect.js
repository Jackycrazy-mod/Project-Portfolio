/*const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://shirakabaae:199921.guan@shirakaba.ecmjpr7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

collection.findOne({ name: 'shirakaba' }, (err, result) =>  {
  console.log(result);
});
client.close();*/

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
//此處讀取資料庫?
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['chef', 'staff', 'customer'], required: true }
});

const User = mongoose.model('User', userSchema);