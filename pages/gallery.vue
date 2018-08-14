<template>
  <PageArticle>
    <h4 slot="title">갤러리</h4>
    <div slot="content" ref="formContainer">
      <section infinite-wrapper>

        <isotope ref="isotope" :itemSelector="option.itemSelector" :options='option' :list="items" :filter="filterOption" :sort="sortOption" class="grid-container" v-images-loaded:on="getLoadingCallBack()">
          <div v-for="item in items" :key="item.RNO">
            <img :src="item.TPATH" v-img="item.PATH" />
          </div>
        </isotope>

        <infinite-loading force-use-infinite-wrapper="true" @infinite="getGallerylist" ref="infiniteLoading">
          <span slot="no-more">모든 이미지를 조회했어용..</span>
          <span slot="no-results">마지막 이미지에용..</span>
        </infinite-loading>

      </section>
    </div>
  </PageArticle>
</template>

<script>
import Vue from 'vue';
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.min.css';
// Init plugin
Vue.use(Loading);

import VueImg from 'v-img';

Vue.use(VueImg);

import axios from 'axios'
import imagesLoaded from 'vue-images-loaded'
import isotope from 'vueisotope'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  head: {
    title: 'Gallery'
  },
  data() {
    return {
      fullPage: true,
      currentPage: 1,
      items: [],
      sortOption: "original-order",
      filterOption: "show all",
      option: {
        itemSelector: "grid-item",
        ayoutMode: 'masonry',
        masonry: {
          gutter: 3
        },
        getSortData: {
          name: "name"
        }
      }
    }
  },
  directives: {
    imagesLoaded
  },
  components: {
    InfiniteLoading,
    isotope
  },
  methods: {
    getLoadingCallBack() {
      return {
        progress: (instance, img) => {
          this.loading = true
          this.currentImg++
          this.maxImg = instance.images.length
          if (!img.isLoaded) {
            this.status = 'danger'
          }
          this.$refs.isotope.layout('masonry')
        },
        always: (instance) => {
          setTimeout(() => {
            this.loading = false
            this.currentImg = 0
          }, 250);
        }
      }
    },
    getGallerylist($state) {
      let self = this
      let $url = "https://sempre9mai.cafe24.com/2018/api/mayonnaise/getGalleryList.php"

      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      });
      
      axios.get($url, {
        params: {
          page: self.currentPage
        }
      }).then(res => {
        let getList = res.data.LIST
        let resCnt = parseInt(getList.length)

        if (resCnt < 0) {
          $state.complete()
        } else {
          for (let i = 0; i < getList.length; i++) {
            self.items.push(getList[i])
            //window.dispatchEvent(new Event('resize'));
          }
          self.currentPage++
          loader.hide()
          
          if (resCnt < 20) {
              $state.complete()
          } else {
              $state.loaded()
          }
        }
        
      }).catch(err => {
        console.log(err)
        alert("리스트를 가져오는데 실패했어요ㅠ")
        loader.hide()
      })
    }
  },
  mounted() {
    //this.getGallerylist()
  }
}
</script>

<style>
.grid-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
.grid-item {
  max-width: 23%;
  margin: 1% 0.5%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}
.grid-item:hover {
  transition: transform 0.3s;
  transform: scale(1.05);
}

@media (min-width: 450px) and (max-width: 900px) {
  .grid-item {
    max-width: 31%;
  }
}

@media all and (max-width: 449px) {
  .grid-item {
    max-width: 48%;
  }
}

.grid-item > img {
  width: 100%;
}

.vsg-stack-item {
  position: relative;
  transition: left 300ms, top 300ms;
}

.vsg-stack-item img {
  display: block;
  width: 100%;
}
</style>