<template>
    <div id="favorite-item" class="container">
        <!--  <div class="col-xs-2 " id="weather-box" v-if="show">
            <h3 class="text-center">{{ f.weather_type }}</h3>
            <h3 class="text-center">{{f.temp_min}}°/{{ f.temp_max}}°</h3>
            <div class="row">
                <div class="col-xs-6">
                    <h4 >{{ f.day }}</h4>
                    <h5 > {{ f.date }}</h5>
                </div>
                <div class="col-xs-2">
                    <span><object class="color" type="image/svg+xml" :data="f.icon"></object></span>
                </div>
            </div>
        </div> -->
        <br>
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
            <h2>{{cityName}}</h2>
            <div class="row" v-if="simple_forecast">
                <div class="col-xs-2 weather-box" v-for="f in simple_forecast">
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
                </div>
            </div>
        </div>
    </div>

</template>
<style>
    .weather-box {
        margin-left: 30px;
        color: #000;
        border-bottom-style: solid;
        border-bottom-width: 1px;
    }
    
    .custom_row_style {
        border-style: solid;
        border: 1px;
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
            simple_forecast: []
        }
    },
    methods:{
        hideFavorites(){
            this.show = false
            this.hide = false
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
            }),(promise)=>{
                console.log(response)
            }
        }
    },
    computed:{
       
    }



}
</script>