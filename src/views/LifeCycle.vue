<template>
  <h1>這是一個Vue3生命週期範例</h1>
  <Card :data-msg="this.$store.state.ws.clientRes"></Card>
</template>

<script>
import Card from '@/components/ChatCard.vue'
import { Console } from 'console'

export default {
  components: {
    Card
  },
  setup() {},
  beforeCreate() {},
  inject: ['inject1'],
  props: ['props1'],
  // methods需要靠事件觸發渲染，只要有觸發就會重新計算求值，所以像前面的範例一定需要加上()
  methods: {
    // methods可以攜帶參數 , methods不一定要return
    func1(text) {
      console.log('func1', text)
    }
  },
  data() {
    return {
      param1: 'param1'
    }
  },
  // computed只有在依賴的資料改變時才會重新計算求值，儘管在模板中多次調用 computed、或是改變其他資料觸發畫面再重新渲染，只要 computed property 原始依賴響應的資料 沒有更動，就不會重新計算求值。
  computed: {
    // computed不能攜帶參數 , computed 一定要使用return
    func2() {
      console.log('func2')
      ret
    }
  },
  watch: {
    'param1'(n, o) { // 監聽param1 中的變數是否發生變化
      console.log('watch')
      console.log(n, o)
    }
  },
  provide() {
    return {
      emitter,
    };
  },
  created() {},
  beforeMount() {},
  mounted() {}
}
</script>
