<template>
   <PageArticle>
      <h4 slot="title">업로드하기</h4>
      <div slot="content">
         <section>
            <div class="view-area">
               <uploader :options="options" class="uploader-example">
                  <uploader-unsupport></uploader-unsupport>
                  <uploader-drop>
                     <p>사진을 드래그&amp;드롭 하거나, </p>
                     <uploader-btn>파일선택하기</uploader-btn>
                     <uploader-btn :attrs="attrs">이미지선택하기</uploader-btn>
                     <!--
                     <uploader-btn :directory="true">select folder</uploader-btn>
                     //-->
                  </uploader-drop>
                  <uploader-list></uploader-list>
               </uploader>
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
   },
   data() {
      return {
         options: {
            // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
            target: '/api',
            testChunks: false
         },
         attrs: {
            accept: 'image/*'
         }
      }
   }
}
</script>
<style>
.uploader-example {
  padding: 15px;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>