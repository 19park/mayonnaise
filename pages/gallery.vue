<template>
   <PageArticle>
      <h4 slot="title">갤러리</h4>
      <div slot="content">
         <section>
            <h4>갤러리를 통해보는 마요와 네즈의 모오습,,</h4>

            <div class="view-area">
               <tn-slider class='wrapper' :index='index' :count='6'>
                  <p slot='tn-prev' class='prev-icon'>prev</p>
                  <tn-item v-for='(slide,i) in slides' :key="i" @on-item-click='clickItem(i)'>
                     <div class='customed-item'>
                        <img :src="slide.src">
                        <p>notes: blabla</p>
                     </div>
                  </tn-item>
                  <p slot='tn-next' class='next-icon'>next</p>
               </tn-slider>
            </div>
         </section>
      </div>
   </PageArticle>
</template>

<script>
import { TnSlider, TnItem } from 'thumbnail-slider';

export default {
   head: {
      title: 'Gallery'
   },
   mounted() {
      document.querySelector('.mdl-tabs__tab.is-active').click()
   },
   components: {
      'tn-item': TnItem,
      'tn-slider': TnSlider,
   },
   data() {
      return {
         index: 0,
         slides: [
            { src: 'https://cdn.pixabay.com/photo/2016/11/07/05/13/map-1804891__480.jpg' },
            { src: 'https://cdn.pixabay.com/photo/2016/11/07/05/13/map-1804891__480.jpg' },
            { src: 'https://cdn.pixabay.com/photo/2016/11/07/05/13/map-1804891__480.jpg' },
         ]
      }
   },
   methods: {
      clickItem(i) {
         this.index = i;
      },
   }
}
</script>

<style src="@/thumbnail-slider/dist/thumbnailSlider.css"></style>
<style scoped>
@media all and (max-width: 320px) {
  .mdl-tabs__tab {
    padding: 0 12px;
  }
}
</style>