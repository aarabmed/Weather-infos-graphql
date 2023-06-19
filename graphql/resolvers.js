require('dotenv').config();
const fetch = require('cross-fetch');
const moment = require('moment');
const promisesAll = require ('promises-all');
const Country = require('../models/country')
const State = require('../models/state')
const City = require('../models/city')

const uploadIcon = require('../utils/upload');


module.exports={
    getCountry: async (parent,args)=>{
        const cName = args.countryName.toLowerCase()
        const res = await Country.find({name:{ $regex: "^"+cName, $options: "i" }}).populate('countryStates')
        return res
    },
    getState: async (parent,args)=>{
        const sName = args.stateName.charAt(0).toUpperCase() + args.stateName.slice(1);
        const res = await State.find({"states.stateName":{ $regex: "^"+sName, $options: "i"}})
        const newRes = res.map(el=>({...el._doc,states:el.states.filter(e=>e.stateName.includes(sName)).map(e=>({...e._doc,countryName:el.countryName}))}))
        return newRes
    },
    getCity: async (parent,{cityName})=>{
        let cName =''
        let res =[]
       
            if(cityName===''){
                return []
            }
            const newCityName = cityName.split(' ');
            if(newCityName.length>1){
                newCityName.forEach(el => {
                    cName = cName.concat(el.charAt(0).toUpperCase()+el.slice(1)+' ')
                });
            }else{
                cName = newCityName[0].charAt(0).toUpperCase()+newCityName[0].slice(1)
            }

            const validCityName = cName.trim();
            const response = await City.find({cityName:{'$regex':`^${validCityName}`,$options:'i'}}).populate([{path:'country',populate:[{path:'states'}]}])
            console.log('Cityyy:',response)
            

            return response
    },
    getWeather: async (parent,{cityName})=>{
        
        const weather  = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.W_KEY}&q=${cityName}&days=3`)
        const res = await weather.json()

       if(res.error){
          if(res.error.code===1006||res.error.code===1003){
            return {
                status:404
            };
          }
        } 
        const startTime = moment('5:59', "HH:mm");
        const endTime = moment('18:00', "HH:mm");
        const currentTime = res.location.localtime.split(' ')[1]

        const isDay = moment(currentTime,"HH:mm").isBetween(startTime, endTime);


        const oldIcon = res.current.condition.icon.split('/');
        const iconName =  oldIcon[oldIcon.length-1].split('.')[0];

        const icon = `https://storage.googleapis.com/weather-icons/images/icons/${isDay?'day':'night'}/${iconName}.png`
        
        const newStatus = {
            description:res.current.condition.text,
            icon:icon
        }
        const current = {
            localTime: res.location.localtime,
            location_name: res.location.name,
            location_country: res.location.country,
            temp_Celsius: res.current.temp_c,
            temp_Fahrenheit: res.current.temp_f,
            is_day_time: isDay,
            status: newStatus,
            day_chance_of_rain:res.forecast.forecastday[0].day.daily_chance_of_rain,
            wind_Speed_Kph:res.current.wind_kph,
            wind_Speed_Mph:res.current.wind_mph,
            wind_direction:res.current.wind_dir,
            humidity:res.current.humidity,
            pressure_millibars:res.current.pressure_mb,
            pressure_inHg:res.current.pressure_in,
            last_updated:res.current.last_updated,
        }


        const forecast = res.forecast.forecastday
            .map(item=>{
                const oldIcon = item.day.condition.icon.split('/');
                const iconName =  oldIcon[oldIcon.length-1].split('.')[0];
                const icon = `https://storage.googleapis.com/weather-icons/images/icons/day/${iconName}.png`

                return({
                    date_epoch:item.date_epoch,
                    maxtemp_c:item.day.maxtemp_c,
                    maxtemp_f:item.day.maxtemp_f,
                    mintemp_c:item.day.mintemp_c,
                    mintemp_f:item.day.mintemp_f,
                    daily_chance_of_rain:item.day.daily_chance_of_rain,
                    status:{description:item.day.condition.text,icon:icon}
                })
            })
        forecast.shift()

    
        
        return {
            data:{
                current,
                forecast:forecast,
            },
            status:200
        }
    },
    getError: async ()=>{
        let arrayError = [];
        let error={
            message:'',
            code:null
        }
        arrayError.push('No city name have been spcified!')
        if(arrayError.length>0){        
            error.message = arrayError
            error.code = 400
        }
        return error
    },
    setIcon: async (parent,{icon})=>{
        let { resolve, reject } = await promisesAll.all(
            icon.map(uploadIcon)
        )
        
        if (reject.length)
        reject.forEach(({ name, message }) =>
        // eslint-disable-next-line no-console
        console.error(`Name!!: ${name}:  Message!!:${message}`)
        )
        const name = resolve.map(e=>({name:e.filename}))
        return name
    }
}
