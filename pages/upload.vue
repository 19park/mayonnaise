<template>
   <PageArticle>
      <h4 slot="title">업로드하기</h4>
      <div slot="content">
         <section>
            <div class="view-area">

            </div>
         </section>
      </div>
   </PageArticle>
</template>

<script>
import Vue from 'vue'
import uploader from 'vue-simple-uploader'

Vue.use(uploader)

export default {
   head: {
      title: 'Upload'
   }
}
</script>