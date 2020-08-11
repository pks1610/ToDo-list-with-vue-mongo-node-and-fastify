const fastify = require('fastify')({ logger: true });
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var newDb = 'todoDb';
var newColl = 'todoListCollection'; 

// Registering Fastify-cors
fastify.register(require('fastify-cors'), {});

// Declare a route for getting form data and ingesting into mongo
fastify.post('/getTodoForm', async (request, reply) => {
    MongoClient.connect(url, {useUnifiedTopology: true}, (err,db) => {
      if(err) throw err;
      var dbo = db.db(newDb);
      dbo.collection(newColl).insertOne(request.body);
    });
    return('data submitted');
});

fastify.get('/fetchTodoList', async (req, res) => {
  var data;
    MongoClient.connect(url, {useUnifiedTopology: true}, (err,db) => {
      if(err) throw err;
      var dbo = db.db(newDb);
      dbo.collection(newColl).find().toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
      });
    });
});

// Run the server!
const start = async () => {
    try {
      await fastify.listen(3000)
      fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
};
start();