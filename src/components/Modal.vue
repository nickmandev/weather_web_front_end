<template>
<div id="favorite_modal">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <button class="glyphicon glyphicon-remove pull-right button_style" @click="$emit('close')"></button>
            <div class="modal-header">
              <slot>
                <h4>Type the name of the city you want to add to favorites</h4>
              </slot>
            </div>
          <div class="modal-body">
              <input type="text" class="form-control" placeholder="Press Enter to search..." v-model="cityName" @keyup.enter="searchCity">
              <transition name="slide-fade">
              <div v-if="showImg" class="row">
                <div class="col-xs-10 col-xs-offset-1 text-center">
                  <br>
                  <strong>To close the image click on it.</strong>
                  <img id="map" :src="url"  @click="showImg = false">
                  </div>
              </div>
              </transition>
              <ul class="list-group" v-show="results">
                <li class="list-group-item" v-for="res in results">
                    <h4> {{res.city_name}}, {{res.country}}
                      <div class="pull-right">
                        <span class="glyphicon glyphicon-plus" @click="addCity(res)"></span>
                        <span class="glyphicon glyphicon-map-marker" @click="viewMap(res.latitude,res.longitude)"></span>
                      </div>
                    </h4>
                </li>
              </ul>
          </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import auth from '../auth/auth.js'
import config from '../auth/config.js'
    export default{
        name: 'modal',
        template: '#modal',
        data: function(){
            return{
                cityName:'',
                results:[],
                showImg: false
            }
        },
        methods:{
            searchCity: function(){
                var city = this.cityName
                this.$http.get(config.baseURL+config.addCityURL,{params:{'city': city}}).then(function(data){
                    var parsed = JSON.parse(data.body)
                    this.results = parsed['citys']
                }),(promise)=>{
                    console.log(promise)
                }
            },
            addCity: function(city){
                var param = {'city': city, 'curr_user': this.$store.state.current_user}
                this.$http.put(config.baseURL+config.updateFavoritesURL, param).then(function(data){
                   this.$store.commit('setFavorites', JSON.parse(data.body))
                }),(promise)=>{
                    console.log(false)
                }
            },
            viewMap: function(lat, long){
                let URL = config.googleApiURL + lat + ","+ long + config.googleApiOptions + config.googleApiKey
                    this.url = URL
                    this.showImg = true
            }

        },
    }
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  max-width: 100%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  max-width: 100%;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

#map {
  width: 400px;
  margin-bottom: 10px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}

</style>
