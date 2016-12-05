<template>
  <div id="signuploginmodal">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            {{type}}
            <div v-if="login">
            <h3> Enter your credentials </h3>
            </div>
            <div v-if="signup">
              <h3> To register fill the forms beyond. </h3>
            </div>
          </div>

          <div class="modal-body">
            <div v-if="login">
              <div class="form-group">
                <label  for="usr">Username</label>
                <input v-model="credentials.username" type="text" id="usr" class="form-control">
                <label  for="pass">Password</label>
                <input v-model="credentials.password" type="password" id="pass" class="form-control">
                <button class="btn btn-primary" type="submit" @click="submitLogIn">Logon</button>
            </div>
            </div>
            <div v-if="signup">
              <div class="form-group">
                <label  for="usr_sign">Username</label>
                <input v-model="credentials.username" id="usr_sign" type="text" class="form-control" >
                <label for="pass_sign">Password</label>
                <input v-model="credentials.password" id="pass_sign" type="password" class="form-control" >
                <label  for="confPass">Confirm password</label>
                <input v-model="credentials.confPassword" id="confPass" type="password" class="form-control">
                <button class="btn btn-primary" type="submit" @click="submitSignUp">SignUP</button>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
  </div>
</template>
<script>

export default { 
    name:'signuploginmodal',
    template: '#signuploginmodal',
    props: ['type'],
    data: function() {
          return {
            login: false,
            signup: false
          }
    },

    methods: {

    },

    computed: {
      loginSignUp: function() {
        console.log('computed')
      },
      
    },

    watch: {
      type: function() {
        console.log('test')
        this.loginSignUp
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