<template>
  <div id="signuploginmodal" v-if="loginSignUp" >
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <span class="glyphicon glyphicon-remove pull-right text_color" @click="$emit('close')"></span>
          <div class="modal-header">
            <div class="alert alert-danger" role="alert" v-if="error" @click="error = false">
             <strong>{{error}}</strong>
             <p> To close the error message click on the message</p>
            </div>
            <div v-if="login">
            <h4 class="text_color"> Enter your credentials. </h4>
            </div>
            <div v-if="signup">
              <h4 class="text_color"> To register fill the forms. </h4>
              <p> Password and Username must be longer than 6 symbols </p>
            </div>
          </div>
          <div class="modal-body">
            <div v-if="login">
              <div class="form-group">
                <input v-model="credentials.username" type="text" class="form-control" placeholder="Username">
                <br>
                <input v-model="credentials.password" type="password" class="form-control" placeholder="Password">
                <br>
                <button class="btn btn-primary" type="submit" @click="submitLogIn">Logon</button>
            </div>
            </div>
            <div v-if="signup">
              <div class="form-group">
                <input v-model="credentials.username" type="text" class="form-control" placeholder="Username">
                <br>
                <input v-model="credentials.password" type="password" class="form-control" placeholder="Password">
                <br>
                <input v-model="credentials.confPassword" type="password" class="form-control" placeholder="Confirm Password">
                <br>
                <button class="btn btn-primary" type="submit" @click="submitSignUp">SignUP</button>
              </div>
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
export default { 
    name:'signuploginmodal',
    template: '#signuploginmodal',
    props: ['type'],
    data: function() {
          return {
            login: false,
            signup: false,
            test: '',
            credentials: {
              username: '',
              password: '',
              confPassword: ''
            },
            error: ''
          }
    },

    methods: {
      submitSignUp(){
            if(this.credentials.password == this.credentials.confPassword){
                var credentials = {
                    username: this.credentials.username,
                    password: this.credentials.password
                }
                auth.signUp(this,credentials)
            }else{
                this.error = "Password field's must be identical"
            }
      },
      submitLogIn(){
            var credentials = {
                  username: this.credentials.username,
                  password: this.credentials.password
                }
            auth.logIn(this,credentials)
            if(this.error == ''){
              this.$emit('close')
            }
          },
    },

    computed: {
      loginSignUp: function() {
        return this.test = this.type
      }
      
    },

    watch: {
      test: function() {
        if(this.test == 'login'){
          this.login = true
        }else{
          this.signup = true
        }
      }
    }
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
  width: 300px;
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
  margin: 20px 0;
}

.modal-default-button {
  float: right;
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
</style>