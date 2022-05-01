const graphql = require('graphql');


const { GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLList} = graphql;


const StateListType = new GraphQLObjectType({
    name:'StateList',
    fields:{
        stateId: { type:GraphQLInt },
        stateName: { type:GraphQLString },
        stateCode: { type:GraphQLString },
    }
})


const StateType = new GraphQLObjectType({
    name:'State',
    fields:{
        states:{
            type: new GraphQLList(StateListType),
            // resolver
        },
    }
})



module.exports= StateType;