<template>
  <Card :data-msg="userlist"></Card>
  <div class="app">
    <div ref="messages" class="messages">
      <Message
        v-for="message in messages"
        :key="message.id"
        :class="['message', { right: message.isMine }]"
        :dark="message.isMine"
        :text="message.text"
        :author="message.author"
      />
    </div>
    <ChatBox class="chat-box" @emit-submit="onSubmit" />
  </div>
</template>

<script>
import Message from '@/components/ChatMessage.vue'
import ChatBox from '@/components/ChatBox.vue'
import Card from '@/components/ChatCard.vue'
import axios from 'axios'

export default {
  // Here we register the components which
  // we are going to use in the template
  components: {
    ChatBox,
    Message,
    Card
  },
  data() {
    return {
      user: undefined,
      messages: [],
      userlist: [],
      timer: null
    }
  },
  mounted() {
    this.getUserList()
    this.timer = setInterval(() => { // 定時刷新Timer
      setTimeout(this.getUserList, 0)
    }, 1000 * 60 * 10) // 10分鐘檢查一次
  },
  // This is going to be called
  //  when the component gets rendered
  created() {
    this.getConnection()
  },
  methods: {
    getConnection() {
      const ipaddress = 'wss://ylcwss01.yulon-motor.com.tw/pmswagger/websocket'
      const token = localStorage.getItem('token')
      window.ws = new WebSocket(`${ipaddress}?token=${token}`) // 連接websocket
      window.ws.onopen = () => {
        if (ws.readyState === 1) {
          const jsonobj = {
            ReceiveClientId: '',
            action: 'join',
            msg: '1',
            nick: localStorage.getItem('name'),
          }
          const jsonstr = JSON.stringify(jsonobj)
          window.ws.send(jsonstr)
          console.log('進入room')
        }
      }
      window.ws.onclose = () => {
        // this.$router.push('/login')
      }
      window.ws.onmessage = (msg) => {
        console.log(msg.data)
        if(msg.data.match(/join room 1 success .$/) || msg.data.match(/leave room 1 success .$/))
        {
          this.getUserList()
        }
        else
        {
          const msgtemp = {
            id: localStorage.getItem('empno'),
            isMine:
              msg.data.split(':')[0].trim() === localStorage.getItem('name'),
            text: msg.data.split(':')[1].trim(),
            author: msg.data.split(':')[0].trim()
          }
          this.messages.push(msgtemp)
          this.$nextTick(() => { // scroll刷新移動到最底部
            this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
            console.log(this.$refs.messages.scrollHeight)
          })
        }
      }
      console.log('Websocket connection!')
    },

    // This method will be called when a new message is sent
    onSubmit(event, text) {
      // event.preventDefault();
      const jsonobj = {
        ReceiveClientId: '',
        action: 'send_to_room',
        msg: text,
        nick: localStorage.getItem('name')
      }
      const jsonstr = JSON.stringify(jsonobj)
      if (window.ws.OPEN && window.ws.readyState === 1) {
        window.ws.send(jsonstr)
      }
      console.log(window.ws.readyState)
      // 如果WebSocket关闭，显示消息
      if (window.ws.readyState === 2 || window.ws.readyState === 3) {
        console.log('WebSocket已關閉無法傳遞訊息')
        this.$router.push('/login')
      }
    },

    getUserList() {
      const api =
        'https://ylcwss01.yulon-motor.com.tw/pmswagger/api/websocket/getroomuserdetail?RoomNo=1'
      axios.get(api).then((res) => {
        console.log(res)
        if (res.status === 200) {
          // res.data.forEach(element => {
          //   if(this.userlist.findIndex((x) => x.EmpNo === element.EmpNo) === -1)
          //   {
          //     this.userlist.push(element)
          //   }
          // });
          this.userlist = res.data
        } else {
          console.log(res.data)
        }
      })
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Georama';
  src: url('../assets/Georama.ttf');
}

@font-face {
  font-family: 'Georama';
  src: url('../assets/Georama.ttf');
  font-weight: bold;
}

* {
  box-sizing: border-box;
}

html {
  font-family: 'Georama', sans-serif;
}

body {
  margin: 0;
}

button {
  border: 0;
  background: #2a60ff;
  color: white;
  cursor: pointer;
  padding: 1rem;
}

input {
  border: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.1);
}
</style>

<style scoped>
.app {
  height: 70vh;
  display: flex;
  flex-direction: column;
}

.messages {
  flex-grow: 1;
  overflow: auto;
  padding: 1rem;
}

.message + .message {
  margin-top: 1rem;
}

.message.right {
  margin-left: auto;
}
</style>
