<template>
    <div id="favorite-item" class="container">
        <div>
            <el-dropdown>
                <h4> To view 5-day forecast select city from
                    <span class="el-dropdown-link">
    Favorites<i class="el-icon-caret-bottom el-icon--right"></i>
  </span></h4>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="fav in this.$store.state.favorites">
                        <span @click="getCity(fav)"> {{fav.name}}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div v-if="cityName" class="weather-box-div">
            <h2 class="weather-box-header">{{cityName}}</h2>
            <div class="row" v-if="simple_forecast">
                <div class="col-xs-2 weather-box weather-box-margin" v-for="f in simple_forecast">
                    <h3 class="text-center">{{ f.weather_type }}</h3>
                    <h3 class="text-center">{{f.temp_min}}°/{{ f.temp_max}}°</h3>
                    <div class="row">
                        <div class="col-xs-6">
                            <h4>{{ f.day }}</h4>
                            <h5> {{ f.date }}</h5>
                        </div>
                        <div class="col-xs-2">
                            <span><object type="image/svg+xml" :data="f.icon"></object></span>
                        </div>
                    </div>
                    <button id="popup-button" class="button_clear" @click="forecastByDay(f.date)">Details</button>
                </div>
            </div>
        </div>
       <div class="weather-box-div" v-show="details">
            <div class="row">
                <div class="col-xs-12">
                    <h4 class="weather-box-header">Hourly forecast
                        <button class="button_clear pull-right" @click="hide">Hide</button>
                    </h4>
                    
                </div>
            </div>
            <div class="row">
                <div class="col-xs-1" v-for="d in detailedForecast">
                    <h4 class="text-center">{{d.weather_type}}</h4>
                    <h4 class="text-center">{{d.temp_max}}</h4>
                    <h5 class="text-center"> {{ d.timestamp | hours }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

    .weather-box {
        color: #000;
    }
    
    .hourly-forecast-header {
        font-size: 14pt;
    }

    .weather-box-div {
        border: 4px;
        border-style: solid;
        z-index: 5;
        border-color: #333745;
    }
    
    .weather-box-header {
        border: 0px 0px 1px 0px;
        border-bottom-style: solid;
        padding: 10px;
        border-color: #333745;
    }
    
    .weather-box-margin {
        margin-left: 30px;
    }
</style>
<script>
import config from '../auth/config.js'
export default{
    name: "favorite-item",
    data: function(){
        return{
            forecast:[],
            hide: false,
            show: true,
            cityName: '',
            simple_forecast: [],
            detailedForecast: [],
            details: false,
        }
    },
    methods:{
        hide(){
            this.details = false
        },
        getFavorites(){
            var curr_user = this.$store.state.current_user.id
            this.$http.get(config.baseURL+config.forecastURL,{params: {"id":curr_user}} ).then(function(data){
               this.forecast = data.body['forecastFavorites']
               this.favorites = data.body['favorites']
               console.log(this.favorites)
               this.show = true
               this.hide = true
            }),(promise)=>{
                console.log(response)
            }
        },
        test: function(name){
            let fore = this.forecast
            for(var j = 0;j<fore.length; j++){
                if(name == fore[j].city_name){
                    this.forecastByName.push(fore[j])
                }
            }
        },
        getCity: function(city){
            this.cityName = city.name
            this.$http.get(config.baseURL + config.oneCityForecast, {params: {'city_id': city.city_id}}).then(function(data){
                let parsed = JSON.parse(data.body)
                this.simple_forecast = parsed.simplified_forecast
                this.forecast = parsed.forecast
                this.details = false
            }),(promise)=>{
                console.log(response)
            }
        },
        forecastByDay: function(date){
            this.detailedForecast = []
            let arr = this.forecast
            this.details = true 
            for(var i = 0;i<arr.length; i++){
                let dateFromArr = new Date(arr[i].timestamp)
                let dateFromUser = new Date(date)
                if(dateFromArr.getDate() == dateFromUser.getDate()){
                    this.detailedForecast.push(arr[i])
                }
            }
        }
    },
    computed:{
       
    }



}
</script>