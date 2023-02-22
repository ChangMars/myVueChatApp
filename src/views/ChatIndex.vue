<template>
  <div class="container-fluid">
    <div class="row align-items-start">
      <div class="accordion" id="accordionChatList" ref="accordionChatList">
        <div class="accordion-item">
          <h6 class="accordion-header d-grid gap-2" id="headingOne">
            <button
              class="btn btn-outline-dark"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              聊天室成員列表
            </button>
          </h6>
          <div
            id="collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionChatList"
          >
            <Card :data-msg="this.$store.state.ws.clientRes"></Card>
          </div>
        </div>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="app" :style="appstyle">
        <div ref="messages" class="messages" v-on:property="test">
          <Message
            v-for="message in this.$store.state.ws.wsRes"
            :key="message.id"
            :class="['message', { right: message.isMine }]"
            :dark="message.isMine"
            :text="message.text"
            :author="message.author"
          />
        </div>
      </div>
    </div>
    <div class="row align-items-end">
      <ChatBox class="chat-box" @emit-submit="onSubmit" />
    </div>
  </div>
</template>

<script>
import Message from '@/components/ChatMessage.vue'
import ChatBox from '@/components/ChatBox.vue'
import Card from '@/components/ChatCard.vue'
import { sendSocketMessage } from '@/utils/api'

export default {
  // Here we register the components which
  // we are going to use in the template
  components: {
    ChatBox,
    Message,
    Card
  },
  methods: {
    // This method will be called when a new message is sent
    onSubmit(event, text) {
      console.log('chatindex-onsubmit')
      console.log('歷史聊天數量:', this.$store.state.ws.wsRes.length)
      sendSocketMessage(text)
    },
    autoChatMsgStyle() {
      // console.log('視窗高度',document.documentElement.clientHeight)
      // console.log('手風琴元件高度',this.$refs.accordionChatList.offsetHeight)
      this.appstyle.height =
        document.documentElement.clientHeight -
        this.$refs.accordionChatList.offsetHeight -
        124 +
        'px'
    }
  },
  data() {
    return {
      appstyle: {
        height: 0 + 'px'
      }
    }
  },
  watch: {
    // 監聽vuex 中的變數是否發生變化
    '$store.state.ws.wsRes.length'(n, o) {
      console.log('訊息vuex數值發生變化', n, o)
      this.$nextTick(() => {
        // scroll刷新移動到最底部
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
        console.log('MsgScrollHeight', this.$refs.messages.scrollHeight)
      })
    }
  },
  mounted() {
    // 在加載時根據窗口大小調整樣式
    this.autoChatMsgStyle()
    let _this = this // 赋值vue的this 避免外部引用沒有vue 元件
    window.onresize = () => {
      // 監聽視窗改變時
      //調用method事件
      _this.autoChatMsgStyle()
    }
    document // 監聽collapse元件隱藏事件
      .getElementById('collapseOne')
      .addEventListener('hidden.bs.collapse', function () {
        console.log(
          'collapse元件隱藏',
          _this.$refs.accordionChatList.offsetHeight
        )
        _this.autoChatMsgStyle()
      })
    document // 監聽collapse元件顯示事件
      .getElementById('collapseOne')
      .addEventListener('shown.bs.collapse', function () {
        console.log(
          'collapse元件顯示',
          _this.$refs.accordionChatList.offsetHeight
        )
        _this.autoChatMsgStyle()
      })
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
  height: 891px;
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
