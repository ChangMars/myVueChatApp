<template>
  <div id="app">
    <div id="login" v-loading="isLoading">
      <div id="description">
        <h1>Login</h1>
        <p>歡迎使用YouAlone聊天室，請使用工號和密碼登入。</p>
      </div>
      <div id="form">
        <form @submit.prevent="signIn">
          <label for="username">UserName</label>
          <input
            type="text"
            id="username"
            v-model="user.username"
            placeholder="請輸入工號"
            autocomplete="off"
          />

          <label for="password">Password</label>&nbsp;
          <i class="fas"></i>
          <input
            type="password"
            id="password"
            v-model="user.password"
            placeholder="請輸入密碼"
          />
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../utils/api'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    signIn () {
      this.isLoading = true
      login(this.user)
        .then((res) => {
          console.log('登入成功', res)
          this.isLoading = false
          if (res) {
            this.$router.push('/chat')
          }
        })
        .catch((error) => console.log('登入失敗', error))
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

div#app {
  width: 100%;
  height: 100%;
}

div#app div#login {
  align-items: center;
  background-color: #e2e2e5;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

div#app div#login div#description {
  background-color: #ffffff;
  width: 280px;
  padding: 35px;
}

div#app div#login div#description h1,
div#app div#login div#description p {
  margin: 0;
}

div#app div#login div#description p {
  font-size: 0.8em;
  color: #95a5a6;
  margin-top: 10px;
}

div#app div#login div#form {
  background-color: #34495e;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #ecf0f1;
  width: 260px;
  padding: 35px;
}

div#app div#login div#form label,
div#app div#login div#form input {
  outline: none;
  width: 100%;
}

div#app div#login div#form label {
  color: #95a5a6;
  font-size: 0.8em;
}

div#app div#login div#form input {
  background-color: transparent;
  border: none;
  color: #ecf0f1;
  font-size: 1em;
  margin-bottom: 20px;
}

div#app div#login div#form ::placeholder {
  color: #ecf0f1;
  opacity: 1;
}

div#app div#login div#form button {
  background-color: #ffffff;
  color: black;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

div#app div#login div#form button:hover {
  background-color: hsl(120, 28%, 59%);
}

@media screen and (max-width: 600px) {
  div#app div#login {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }

  div#app div#login div#description {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }

  div#app div#login div#form {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
  }

  div#app div#login div#form form {
    margin: 0 auto;
    max-width: 280px;
    width: 100%;
  }
}
</style>
