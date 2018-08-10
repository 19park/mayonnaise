<template>
   <PageArticle>
      <h4 slot="title">업로드하기</h4>
      <div slot="content">
         <section>
            <div class="dropbox">
               <input class="input-file" type="file" name="myfile" @change="upload($event.target.name, $event.target.files)" @drop="upload($event.target.name, $event.target.files)">
               <h2>파일을 드래그해서 드랍해주세요. </h2>
            </div>
         </section>
      </div>
   </PageArticle>
</template>

<script>
import axios from 'axios'

export default {
   head: {
      title: 'Upload'
   },
   data() {
      return {

      }
   },
   methods: {
      upload(name, files) {
         const formData = new FormData();
         formData.append(name, files[0], files[0].name);
         const url = "http://sempre9mai.cafe24.com/2018/api/mayonnaise/upload.php";
         axios.post(url, {
            headers: {
               'Access-Control-Allow-Origin': '*'
            },
            crossdomain: true
         }, formData).then(response => {
            console.log(response);
         }).catch(err => {
            console.log(err)
         })
      }
   }
}
</script>
<style>
.dropbox {
  outline: 2px dashed #aaa;
  background: #7fb4dd;
  width: 300px;
  height: 300px;
  position: relative;
  margin: 0 auto;
}
.dropbox > h2 {
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 2;
}
.input-file {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
}
</style>