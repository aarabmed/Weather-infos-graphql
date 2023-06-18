require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServerPluginDrainHttpServer } =require('apollo-server-core');
const http =require('http');

const {ApolloServer, gql} = require('apollo-server-express')
const schema = require('./graphql/schema')


const app = express()
const httpServer = http.createServer(app);

const corsOptions = {
  origin: [" http://localhost:9000/", "https://weatherup-5ebb929523f3.herokuapp.com/"]
};

// Put together a schema
const server = new ApolloServer({
  schema,
  cors: corsOptions,
  introspection: true,
  playground: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError:(err)=>{
    if(!err.originalError){
        return err;
    }
    const message  = err.message || 'error occurred!'
    const status = err.originalError.code || 500
    return {
        data:err.originalError.data ,
        status: status,
        message: message
    }
  }
});




mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true,useNewUrlParser: true , useFindAndModify: false })
  .then(async()=>{  
      await server.start()
      server.applyMiddleware({ app, path: "/graphql"})

      await new Promise(resolve => httpServer.listen({ port: process.env.PORT||4000 }, resolve))
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)      
      
    }).catch(err=>{
      console.log('Error while connecting to database')
    })
