const graphql = require('graphql');


const {GraphQLList,GraphQLUnionType, GraphQLObjectType,GraphQLString,GraphQLBoolean,GraphQLInt,GraphQLFloat} = graphql;


const statusType = new GraphQLObjectType({
    name:'Status',
    fields:()=>({
        description: { type:GraphQLString},
        icon: { type:GraphQLString},
    })
})

const CurrentDay  = new GraphQLObjectType({
    name:'CurrentDay',
    fields:{
            localTime: { type:GraphQLString},
            temp_Celsius: { type:GraphQLFloat},
            temp_Fahrenheit: { type:GraphQLFloat},
            is_day_time: { type:GraphQLBoolean},
            status: {type:statusType}, 
            wind_Speed_Kph:{ type:GraphQLFloat},
            wind_Speed_Mph:{ type:GraphQLFloat},
            wind_direction:{ type:GraphQLString},
            humidity:{ type:GraphQLInt},
            day_chance_of_rain:{ type:GraphQLInt},
            pressure_millibars:{ type:GraphQLFloat},
            pressure_inHg:{ type:GraphQLFloat},
            last_updated:{ type:GraphQLString},
            location_name: {type:GraphQLString},
            location_country: {type:GraphQLString}
    
    }
})

const ForecastData  = new GraphQLObjectType({
    name:'ForecastData',
    fields:{
            date_epoch:{type:GraphQLString},
            maxtemp_c:{ type:GraphQLFloat},
            maxtemp_f:{ type:GraphQLFloat},
            mintemp_c:{ type:GraphQLFloat},
            mintemp_f:{ type:GraphQLFloat},
            daily_chance_of_rain:{ type:GraphQLInt},
            status: {type:statusType},     
    }
})



const Response= new GraphQLObjectType({
    name:'Response',
    fields:{
        forecast: {type: new GraphQLList(ForecastData)},
        current: {type:CurrentDay}
    }
})




const successResponse  = new GraphQLObjectType({
    name:'weatherResponse',
    fields:{
        data:{type:Response},
        status:{type:GraphQLInt}
    }
})

const notFoundResponse  = new GraphQLObjectType({
    name:'notFoundResponse',
    fields:{
        status:{type:GraphQLInt},
    }   
})

 
const WeatherType = new GraphQLUnionType({
    name:'weatherData',
    types:[successResponse,notFoundResponse],
    resolveType:(value)=>{
        return value.data?successResponse:notFoundResponse;
    }
})



module.exports = WeatherType