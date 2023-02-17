<template>
  <div class="container-fluid">
    <div class="row flex-nowrap overflow-auto ">
      <div class="col-sm" style="text-align: center;" v-for="item in dataMsg" :key="item.id">
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
          <image :href="item.url" width="100%" height="100%"></image>
        </svg>
        <h3>{{ item.sn }}</h3>
        <h6>
          {{ item.department }}
        </h6>
        <p><a class="btn btn-secondary btn-sm" href="#">Details &raquo;</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dataMsg']
}
</script>
