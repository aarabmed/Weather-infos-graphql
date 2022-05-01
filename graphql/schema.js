const graphql = require('graphql');
const { GraphQLUpload } = require('graphql-upload');
const CountryType = require('./types/countryType');
const StateType = require('./types/stateType');
const ErrorType = require('./types/error')
const CityType = require('./types/cityType')
const WeatherType = require('./types/weatherType')
const IconType = require('./types/iconType');


const { getCountry,getState,getCity, getError, getWeather,setIcon } = require('./resolvers')



const { GraphQLObjectType,GraphQLID,GraphQLString, GraphQLUnionType,} = graphql;





const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        country:{
            type: new graphql.GraphQLList(CountryType),
            args: {countryName:{type:GraphQLString}},
            resolve : getCountry
        },
        state:{
            type: new graphql.GraphQLList(StateType),
            args: {stateName:{type:GraphQLString}},
            resolve: getState
        },
        city:{
            type: new graphql.GraphQLList(CityType),
            args: {cityName:{type:GraphQLString}},
            resolve: getCity
        },
        weather:{
            type: WeatherType,
            args: {cityName:{type:GraphQLString}},
            resolve: getWeather
        }
    },
})

const RootMutation = new GraphQLObjectType({
    name:'RootMutationType',
    fields:{
        uploadIcon:{
            type: new graphql.GraphQLList(IconType),
            args: {icon:{type:GraphQLUpload}},
            resolve:setIcon
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query:RootQuery,
    mutation:RootMutation,
})