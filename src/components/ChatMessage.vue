<template>
  <div :class="['message', { dark }]">
    <h5>{{ author }}</h5>
    <div v-html="msgfomat"></div>
    <div v-if="!haveImgUrl"></div>
    <div v-else>
      <el-image
        style="width: 100px; height: 100px"
        :src="url"
        :zoom-rate="1.2"
        :preview-src-list="srcList"
        :initial-index="4"
        fit="cover"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: [
    'text', // Content of the message
    'author', // Author of the message
    'dark' // Background variant of the box
  ],
  methods: {
    isImgUrlValid(imgurl) {
      return new Promise(function (resolve, reject) {
        var ImgObj = new Image() //判断图片是否存在
        ImgObj.src = imgurl
        ImgObj.onload = function (res) {
          resolve(res)
        }
        ImgObj.onerror = function (err) {
          reject(err)
        }
      }).catch((e) => {})
    },
    isImgUrl(imgurl) {
      return (/\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(imgurl) || /\w.(png|jpg|jpeg|svg|webp|gif|bmp)\?/i.test(imgurl))
    }
  },
  data() {
    return {
      haveImgUrl: false,
      url: '',
      srcList: []
    }
  },
  computed: {
    msgfomat() {
      // 將網址分離出來
      let textR = this.text
      let reg =
        /(https?|ftp|file)(:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/g
      let arr = textR.match(reg) || []

      // 處理網址是圖片的
      arr.forEach((element) => {
        console.log(element)
        console.log(this.isImgUrl(element))
        if (this.isImgUrl(element)) {
          // 判斷是是否為圖片網址
          this.haveImgUrl = true
          this.url = element
          this.srcList.push(element)
          this.isImgUrlValid(element) // 預先載入看圖片連結是否有效
            .then((res) => {
              console.log('可以載入圖片')
            })
            .catch(() => console.log('無法載入圖片'))
        }
      })

      if (arr.length) {
        textR = textR.replace(reg, "<a href='$1$2' target='_blank'>$1$2</a>")
      }
      return textR
    }
  }
}
</script>

<style scoped>
.message {
  background: #e7e7e7;
  border-radius: 10px;
  padding: 1rem;
  width: fit-content;
}

.message.dark {
  background: #e9eaf6;
}

h5 {
  margin: 0 0 0.5rem 0;
}
</style>
