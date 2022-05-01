
const graphql = require('graphql');


const { GraphQLObjectType,GraphQLString } = graphql;


const IconType = new GraphQLObjectType({
    name:'Icon',
    fields:()=>({
        name:{
            type:GraphQLString
        }
    })
})

module.exports= IconType;