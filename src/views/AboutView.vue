<template>
  <div class="container">
    <h1 style="text-align: center; color: rgb(0, 88, 66)">
      Welcome to YouAlone Chatroom
    </h1>
    <h3>
      如有任何使用問題煩請截圖寄信至ChangChiaRong@gmail.com，感謝各位的使用~
    </h3>
    <chat-video></chat-video>
  </div>
</template>
<script>
import ChatVideo from '@/components/ChatVideo.vue'

export default {
  components: {
    ChatVideo
  }
}
</script>
