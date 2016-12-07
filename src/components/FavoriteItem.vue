<template>
    <div id="favorite-item " class="container">
        <div class="row custom_row_style">
        <div class="col-xs-2 " v-for="f in forecast" id="weather-box" v-if="show">
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
        </div>
        <button type="submit" @click="getFavorites" class="button_style" v-if="!hide">Show Favorites</button>
        <button type="submit" @click="hideFavorites" class="button_style" v-if="hide">Hide Favorites</button>
    </div>
</template>
<style>
    #weather-box{
        margin-left: 30px;
        color: #000;
        border-top-style: solid;
        border-bottom-style: solid;
        border-bottom-width: 0px;
    }
    
    .button_style { 
        background-color: #333745;
        color: #fff;
        border: none;
        padding: 10px;
    }

    .custom_row_style {
        border-right-style: solid;
        border-left-style: solid;
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
