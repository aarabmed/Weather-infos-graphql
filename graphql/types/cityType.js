const graphql = require('graphql');
const CountryType = require('./countryType')

const { GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt} = graphql;


const CityType = new GraphQLObjectType({
    name:'City',
    fields:{
        id: { type:GraphQLID },
        cityName: { type:GraphQLString },
        localId : { type: GraphQLInt},
        stateId: { type:GraphQLInt },
        stateCode: { type:GraphQLString },
        country: { type: CountryType },
        lat: { type:GraphQLString },
        lng: { type:GraphQLString }
    }
})

module.exports= CityType;