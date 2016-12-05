<template>
    <div id="favorite-item" class="container-fluid">

        <div class="col-xs-2 well" v-for="f in forecast" id="weather-box" v-if="show">
            <h3 class="text-center">{{ f.weather_type }}</h3>
            <h3 class="text-center">{{f.temp_min}}°/{{ f.temp_max}}°</h3>
            <div class="row">
                <div class="col-xs-6">
                    <h4 >{{ f.city_name}}</h4>
                    <h4 >{{ f.day }}</h4>
                    <h5 > {{ f.date }}</h5>
                </div>
                <div class="col-xs-2">
                    <span><object class="color" type="image/svg+xml" :data="f.icon"></object></span>
                </div>
            </div>
        </div>
        <button type="submit" @click="getFavorites" class="btn btn-default" v-if="!hide">Show Favorites</button>
        <button type="submit" @click="hideFavorites" class="btn btn-default" v-if="hide">Hide Favorites</button>
    </div>
</template>
<style>
    #weather-box{
        margin-left: 40px;
        background-color: #0fda77;
        color: #ffffff;
    }

    .color path {
        fill: #fff;
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
            show: true
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
               console.log(this.forecast);
               this.show = true
               this.hide = true
            }),(promise)=>{
                console.log(response)
            }
        }
    },



}
</script>
