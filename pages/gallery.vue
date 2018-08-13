<template>
  <PageArticle>
    <h4 slot="title">갤러리</h4>
    <div slot="content">
      <section>
        <h4>gallery list..</h4>

        <div class="view-area">
          <stack :column-min-width="320" :gutter-width="8" :gutter-height="8">
            <stack-item v-for="(item, i) in items" :key="i">
              {{ item.someContent }}
            </stack-item>
          </stack>
        </div>
      </section>
    </div>
  </PageArticle>
</template>

<script>
import axios from 'axios'
import { Stack, StackItem } from 'vue-stack-grid';

export default {
  head: {
    title: 'Gallery'
  },
  components: { Stack, StackItem },
  data() {
    return {
      currentPage: 1,
      items: []
    }
  },
  mounted() {
    let self = this
    let $url = "http://sempre9mai.cafe24.com/2018/api/mayonnaise/getGalleryList.php";
    axios.get($url, {
      params: {
        page: self.currentPage
      }
    }).then(res => {
      console.log(res)
      let getList = res.getList

      for (let i = 0; i < getList.length; i++) {
        self.items.push(getList[i])
      }
    }).catch(err => {
      console.log(err)
      alert("에러")
    })
  }
}
</script>