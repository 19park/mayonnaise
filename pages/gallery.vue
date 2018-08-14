<template>
  <PageArticle>
    <h4 slot="title">갤러리</h4>
    <div slot="content">
      <section>
        <div class="view-area" v-images-loaded:on.progress="imageProgress">

          <isotope :itemSelector="option.itemSelector" :options='option' :list="items" :filter="filterOption" :sort="sortOption">
            <div v-for="item in items" :key="item.RNO">
              <img :src="'https://sempre9mai.cafe24.com/2018/api/mayonnaise/upload/'+item.PATH" />
            </div>
          </isotope>
        </div>
      </section>
    </div>
  </PageArticle>
</template>

<script>
import axios from 'axios'
import imagesLoaded from 'vue-images-loaded'
import isotope from 'vueisotope'
import { Stack, StackItem } from 'vue-stack-grid'

export default {
  head: {
    title: 'Gallery'
  },
  data() {
    return {
      currentPage: 1,
      items: [],
      currentLayout: 'masonry',
      selected: null,
      sortOption: "original-order",
      filterOption: "show all",
      option: {
        itemSelector: "grid-item",
        getFilterData: {
          "show all": function () {
            return true;
          },
          metal: function (el) {
            return !!el.metal;
          },
          transition: function (el) {
            return el.category === "transition";
          },
          "alkali and alkaline-earth": function (el) {
            return el.category === "alkali" || el.category === "alkaline-earth";
          },
          "not transition": function (el) {
            return el.category !== "transition";
          },

          "metal but not transition": function (el) {
            return !!el.metal && el.category !== "transition";
          },
          "number > 50": function (el) {
            return el.number > 50;
          },
          "name ends with ium": function (el) {
            return el.name.match(/ium$/);
          }
        }
      }
    }
  },
  directives: {
    imagesLoaded
  },
  components: { isotope, Stack, StackItem },
  methods: {
    imageProgress(instance, image) {
      const result = image.isLoaded ? 'loaded' : 'broken'
    }
  },
  mounted() {
    let self = this
    let $url = "https://sempre9mai.cafe24.com/2018/api/mayonnaise/getGalleryList.php"
    axios.get($url, {
      params: {
        page: self.currentPage
      }
    }).then(res => {
      let getList = res.data.LIST

      for (let i = 0; i < getList.length; i++) {
        self.items.push(getList[i])
        //window.dispatchEvent(new Event('resize'));
      }
    }).catch(err => {
      console.log(err)
      alert("에러")
    })
  }
}
</script>

<style>
.view-area .grid-item {
  position: relative;
  float: left;
  max-width: 32%;
  min-width: 120px;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 0 0 10px rbga(0, 0, 0, 0.4);
  overflow: hidden;
}

.view-area .grid-item > img {
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