<template>
  <PageArticle>
    <h4 slot="title">갤러리</h4>
    <div slot="content">
      <section>
        <div class="view-area" v-images-loaded:on.progress="imageProgress">
          <stack :column-min-width="200" :gutter-width="8" :gutter-height="8" :monitor-images-loaded="true" @click="selected=element">
            <stack-item v-for="(item, i) in items" :key="i">
              <img :src="'https://sempre9mai.cafe24.com/2018/api/mayonnaise/upload/'+item.PATH" />
            </stack-item>
          </stack>
        </div>
      </section>
    </div>
  </PageArticle>
</template>

<script>
import axios from 'axios'
import imagesLoaded from 'vue-images-loaded'
import { Stack, StackItem } from 'vue-stack-grid'

export default {
  head: {
    title: 'Gallery'
  },
  data() {
    return {
      currentPage: 1,
      items: []
    }
  },
  directives: {
    imagesLoaded,
  },
  components: { Stack, StackItem },
  methods: {
    imageProgress(instance, image) {
      const result = image.isLoaded ? 'loaded' : 'broken';
      console.log('image is ' + result + ' for ' + image.img.src);
    },
    layout() {
      this.$refs.cpt.layout('masonry');
    }
  },
  mounted() {
    let self = this
    let $url = "https://sempre9mai.cafe24.com/2018/api/mayonnaise/getGalleryList.php";
    axios.get($url, {
      params: {
        page: self.currentPage
      }
    }).then(res => {
      let getList = res.data.LIST

      for (let i = 0; i < getList.length; i++) {
        console.log(getList[i])

        self.items.push(getList[i])
        window.dispatchEvent(new Event('resize'));
      }
    }).catch(err => {
      console.log(err)
      alert("에러")
    })
  }
}
</script>

<style>
.vsg-stack-item {
  position: relative;
  transition: left 300ms, top 300ms;
}

.vsg-stack-item img {
  display: block;
  width: 100%;
}
</style>