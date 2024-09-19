<template>
  <div class="container-fluid">
    <div class="row flex-nowrap overflow-auto" style="margin-top: 1px">
      <div
        class="col-sm"
        style="text-align: center"
        v-for="item in dataMsg"
        :key="item.id"
      >
        <svg
          class="bd-placeholder-img rounded-circle"
          width="80"
          height="80"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: 80x80"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <image
            :href="item.url"
            :alt="item.sn"
            width="100%"
            height="100%"
          ></image>
        </svg>
        <p style="margin: 0px">{{ item.sn }}</p>
        <p style="margin: 0px">{{ item.department }}</p>
        <p style="margin: 0px">
          <a class="btn btn-secondary btn-sm" @click="onDetails(item)"
            >Details &raquo;
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { h } from 'vue'
import { ElMessageBox } from 'element-plus'

export default {
  render () {
    return h('div')
  },
  props: ['dataMsg'],
  methods: {
    onDetails (item) {
      console.log('onDetails', item)
      const newDatas = []
      for (const key in item) {
        newDatas.push(h('p', null, key + ':' + item[key]))
      }
      ElMessageBox({
        title: '詳細資料',
        message: h('div', null, newDatas)
      })
    }
  }
}
</script>
