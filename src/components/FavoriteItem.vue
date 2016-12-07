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
        <div class="row">
            <div class="col-xs-2" v-show="forecastByName" v-for="fore in forecastByName">
                <h4 class="text-center">{{ fore.weather_type }}</h4>
                <h4 class="text-center">{{fore.temp_min}}°/{{ fore.temp_max}}°</h4>
                <div class="row">
                    <div class="col-xs-6">
                        <h4>{{ fore.day }}</h4>
                        <h5> {{ fore.date }}</h5>
                    </div>
                    <div class="col-xs-2">
                        <span><object class="color" type="image/svg+xml" :data="fore.icon"></object></span>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <button type="submit" @click="getFavorites" class="button_style" v-if="!hide">Show Favorites</button>
        <button type="submit" @click="hideFavorites" class="button_style" v-if="hide">Hide Favorites</button>
    </div>
</template>
<style>
    #weather-box {
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
            favorites: [],
            forecastByName: []
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
        }
    },
    computed:{
    }



}
</script>