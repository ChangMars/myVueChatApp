<template>
  <div id="app">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  mounted () {
    const canvas = this.$refs.canvas
    const ctx = canvas.getContext('2d')
    const ws = new WebSocket('wss://localhost:5001/websocket')

    ws.onmessage = function (event) {
      const imageData = event.data
      const img = new Image()
      img.src = URL.createObjectURL(new Blob([imageData], { type: 'image/jpeg' }))

      img.onload = function () {
        ctx.drawImage(img, 0, 0)
      }
    }

    ws.onopen = function () {
      console.log('WebSocket connection opened')
    }

    ws.onclose = function () {
      console.log('WebSocket connection closed')
    }
  }
}
</script>

<style scoped>
#app {
  text-align: center;
  margin-top: 60px;
}

canvas {
  width: 640px;
  height: 480px;
  border: 1px solid black;
}
</style>
