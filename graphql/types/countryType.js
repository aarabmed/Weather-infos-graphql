const graphql = require('graphql');


const StateType = require('./stateType');

const { GraphQLObjectType,GraphQLID,GraphQLString, GraphQLInt, GraphQLList} = graphql;

const Coordinates = new GraphQLObjectType({
    name:'Coordinates',
    fields:{
        lat: { type:GraphQLString },
        lng: { type:GraphQLString }
    }
})

const SingleCity = new GraphQLObjectType({
    name:'singleCity',
    fields:{
        id: { type:GraphQLID },
        cityName: { type:GraphQLString },
        localId : { type: GraphQLInt},
        stateId: { type:GraphQLInt },
        stateCode: { type:GraphQLString },
        lat: { type:GraphQLString },
        lng: { type:GraphQLString }
    }
})

const CountryType = new GraphQLObjectType({
    name:'Country',
    fields:{
        id: { type:GraphQLID },
        name: { type:GraphQLString },
        countryName: { type:GraphQLString },
        cities: {type: new GraphQLList(SingleCity)},
        country_code_alpha3: { type:GraphQLString },
        country_code_alpha2: { type:GraphQLString },
        phone_code: { type:GraphQLString },
        capital: { type:GraphQLString },
        currency: { type:GraphQLString },
        native_name: { type:GraphQLString },
        flag: { type:GraphQLString },
        native_language: { type:GraphQLString },
        country_coordinates: {type:Coordinates},
        states: { type: StateType},
    }
})

module.exports= CountryType




