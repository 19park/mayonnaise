<template>
  <div class="wrapper">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
      <NavigationHeader/>
      <NavigationDrawer/>
      <div class="mdl-layout__content">
        <nuxt/>
        <NavigationFooter />
      </div>
    </div>
  </div>
</template>

<script>
import NavigationDrawer from '~/components/NavigationDrawer.vue'
import NavigationHeader from '~/components/NavigationHeader.vue'
import NavigationFooter from '~/components/NavigationFooter.vue'

export default {
  components: {
    NavigationDrawer,
    NavigationHeader,
    NavigationFooter
  }
}
</script>

<style>
.wrapper {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-active {
  opacity: 0.3;
}

.bounce-enter-active {
  animation: bounce-in 0.8s;
}
.bounce-leave-active {
  animation: bounce-out 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
</style>
