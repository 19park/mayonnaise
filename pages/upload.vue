<template>
   <PageArticle class="loading-parent" ref="formContainer">
      <h4 slot="title">업로드하기</h4>
      <div slot="content">
         <section>
            <div class="dropbox">
               <input class="input-file" type="file" name="myfile[]" @change="upload($event.target.name, $event.target.files)" @drop="upload($event.target.name, $event.target.files)" multiple>
               <h2>파일을 드래그해서 드랍해주세요. </h2>
            </div>
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
import axios from 'axios'

export default {
   head: {
      title: 'Upload'
   },
   data() {
      return {
         fullPage: true
      }
   },
   components: {
      Loading
   },
   methods: {
      upload(name, files) {
         const formData = new FormData();
         const url = "https://sempre9mai.cafe24.com/2018/api/mayonnaise/upload.php";

         Array.from(files).forEach((f) => {
            formData.append('myfile[]', f)
         })

         let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer
         });

         axios.post(url, formData).then(res => {
            let getData = res.data
            let getResult = getData.RESULT
            let getPath = getData.PATH

            switch (getResult) {
               case "Y":
                  alert("업로드 성공했어요ㅋ")
                  break
               case "E":
                  alert("시스템사정으로 업로드에 실패했어요ㅠ")
                  break
               case "N":
                  alert("확장자는 jpg, jpeg, png, gif만 가능해요ㅠ")
                  break
               case "L":
                  alert("파일사이즈가 너무커요ㅠ")
                  break
               default:
                  alert(getResult)
                  break
            }
            loader.hide()
         }).catch(err => {
            console.log("업로드실패..ㅠ", err)
            alert("업로드실패..ㅠ\n" + JSON.stringify(err))
            loader.hide()
         })
      }
   }
}
</script>
<style>
.loading-parent {
  position: relative;
}

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
  width: 100%;
  top: 50px;
  left: 0;
  z-index: 2;
  text-align: center;
  font-size: 12pt;
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