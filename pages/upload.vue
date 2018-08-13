<template>
   <PageArticle>
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
         alert(name)
         const formData = new FormData();
         const url = "http://sempre9mai.cafe24.com/2018/api/mayonnaise/upload.php";

         Array.from(files).forEach((f) => {
            formData.append('myfile[]', f)
         })
         alert("add formdata")

         axios.post(url, formData).then(res => {
            alert(res.data.RESULT)
            let getResult = res.data.RESULT

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
         }).catch(err => {
            console.log(err)
            alert(json.stringify(err))
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