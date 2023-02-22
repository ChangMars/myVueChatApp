// import { useStore } from 'vuex' // 在app內部template才可以用這種方式引入
import store from '../store' // 在app外部使用時用這種方式引入
import axios from 'axios'
import { ElMessage } from 'element-plus'
const wsUrl = process.env.VUE_APP_WSURL
var socket = null

export const connectSocket = () => {
  const token = localStorage.getItem('token') // 獲取登入後token
  socket = new WebSocket(`${wsUrl}?token=${token}`) // 連接websocket
  // const vuxstore = store // 使用儲存系統
  console.log('WS連線vuex', store)
  socket.onopen = function () {
    console.log('WS 連線完成!!')
    if (socket.readyState === 1) {
      const jsonobj = {
        ReceiveClientId: '',
        action: 'join',
        msg: '1',
        nick: localStorage.getItem('name')
      }
      const jsonstr = JSON.stringify(jsonobj)
      socket.send(jsonstr)
      ElMessage('連線成功進入聊天室')
      console.log('進入room')
    }
  }
  socket.onmessage = function (msg) {
    console.log('接收到WS訊息', msg.data)
    if (
      msg.data.match(/join room 1 success .$/) ||
      msg.data.match(/leave room 1 success .$/)
    ) {
      getUserList().then((res) => {
        store.commit('ws/setClientRes', res)
        console.log('聊天室列表寫入vuex', store)
      })
    } else {
      const msgtemp = {
        id: localStorage.getItem('empno'),
        isMine: msg.data.split(':')[0].trim() === localStorage.getItem('name'),
        text: msg.data.replace(msg.data.split(':')[0] + ': ', ''), //      msg.data.split(':')[1].trim(),
        author: msg.data.split(':')[0].trim()
      }
      store.commit('ws/setWsRes', msgtemp)
      console.log('訊息寫入vuex', msgtemp)
    }
  }
  socket.onerror = function (err) {
    console.log('error', err)
    console.log('error', socket.readyState)
    ElMessage('連線失敗請重新登入')
  }
  socket.onclose = function (close) {
    console.log('close', close)
    console.log('close', socket.readyState)
    ElMessage('連線關閉')
  }

  store.commit('ws/setWs', socket)
  console.log('WS附值完成', store.state.ws.ws)
}

export const sendSocketMessage = (text) => {
  const jsonobj = {
    ReceiveClientId: '',
    action: 'send_to_room',
    msg: text,
    nick: localStorage.getItem('name')
  }
  const jsonstr = JSON.stringify(jsonobj)
  if (socket.OPEN && socket.readyState === 1) {
    socket.send(jsonstr)
  }
  console.log(socket.readyState)
  // 如果WebSocket關閉，顯示消息
  if (socket.readyState === 2 || socket.readyState === 3) {
    console.log('WebSocket已關閉無法傳遞訊息')
    ElMessage('已關閉連接無法傳遞訊息')
  }
}

export const getUserList = async () => {
  const api =
  process.env.VUE_APP_API_HOST + "api/websocket/getroomuserdetail?RoomNo=1"
  let _data = await axios.get(api).then((res) => {
    if (res.status === 200) {
      console.log('獲取聊天室列表成功')
      return res.data
    }
  })
  return _data
}

export const login = async (user) => {
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8'
  }
  const api =
    process.env.VUE_APP_API_HOST + "api/authenticate/login"
  let _data = await axios
    .post(api, user)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        console.log(res.data)
        const { department, empno, name, token, expiration } = res.data
        localStorage.setItem('department', department)
        localStorage.setItem('empno', empno)
        localStorage.setItem('name', name)
        localStorage.setItem('token', token)
        localStorage.setItem('expiration', expiration)
        connectSocket()
        store.dispatch('setUser', true)
        ElMessage('登入成功')
        return true
      } else {
        ElMessage(`登入失敗[${res.data}]`)
        return false
      }
    })
    .catch((error) => {
      ElMessage(`登入失敗[${error}]`)
      return false
    })
  return _data
}

export const verifyLogin = async (token) => {
  const api =
    process.env.VUE_APP_API_HOST + "api/authenticate/showuserrolesbyauth"
  // let tokene = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBZG1pbiBSb2xlIjoiQWRtaW4gUm9sZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJQYXJhbXRlciIsIlFSQUNPcCIsIkFkbWluIiwiQ0JPZWVPcCIsIllaT2VlT3AiLCJQTU9lZU9wIl0sInN1YiI6IjAxNjg5MCIsImp0aSI6ImRkODBmMDViLTM2ZjItNDdjYy04YWM2LTQ0MTkwYmQzNGMwNCIsImV4cCI6MTY3Njk3MTgzOCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo2MTk1NSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.ZqnQoq9Z3071flQqZk3cNkfZJw60E2YjFQY1yw6F9s0'
  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
  let _data = await axios
    .get(api, { headers: headers })
    .then((res) => {
      if (res.status === 200) {
        console.log('token 驗證成功')
        return true
      }
    })
    .catch(() => {
      console.log('token 驗證呼叫失敗')
      return false
    })
  return _data
}
