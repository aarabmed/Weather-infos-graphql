const graphql = require('graphql');



const { GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt} = graphql;


const ErrorType = new GraphQLObjectType({
    name:'Error',
    fields:()=>({
        message: { type:GraphQLString },
        code : { type: GraphQLInt},
    })
})

module.exports= ErrorType;