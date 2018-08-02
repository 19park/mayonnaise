<template>
  <PageArticle>
    <h4 slot="title">About</h4>
    <div slot="content">
      <section>
        <h5>사진업로드</h5>
			<div>
				 <button id="product-gallery-dropzone" v-on:click="$upload.select('product-gallery')" :disabled="$upload.meta('product-gallery').state === 'sending'">
					  <span v-show="$upload.meta('product-gallery').state === 'sending'">Uploading...</span>
					  <span v-show="!$upload.meta('product-gallery').state === 'sending'">Select Photos</span>
				 </button>

				 <button v-on:click="$upload.reset('product-gallery')" :disabled="$upload.meta('product-gallery').state === 'sending'">
					  초기화하기
				 </button>
			</div>

			<div class="progress">
				 <div class="progress-bar" :style="'width: ' + $upload.meta('product-gallery').percentComplete + '%;'">
					  {{ $upload.meta('product-gallery').percentComplete }}% 완료
				 </div>
			</div>

			<div v-if="$upload.errors('product-gallery').length" class="text-danger">
				 {{ $upload.errors('product-gallery')[0].msg }}
			</div>

			<div>
				 <div v-if="!$upload.files('product-gallery').all.length">
					  No uploads here yet.
				 </div>

				 <div v-for="file in $upload.files('product-gallery').progress">
					  <div>
							{{ file.name }}
					  </div>

					  <div class="progress">
							<div class="progress-bar" :style="'width: ' + file.percentComplete + '%;'">
								 {{ file.percentComplete }}%
							</div>
					  </div>
				 </div>

				 <div v-for="file in $upload.files('product-gallery').queue">
					  <div>
							{{ file.name }}
							<br/>
							업로드 대기중..
					  </div>
				 </div>

				 <div v-for="file in $upload.files('product-gallery').success">
					  {{ file.name }}
					  <br/>
					  업로드 완료.
				 </div>

				 <div v-for="file in $upload.files('product-gallery').error">
					  {{ file.name }}
					  <br/>
					  {{ file.errors[0].msg }}
				 </div>
			</div>
      </section>
    </div>
  </PageArticle>
</template>

<script>
import Vue from 'vue';
import vueUpload from '@websanova/vue-upload';

Vue.use(vueUpload);

export default {
  head: {
    title: 'About'
  },
  created() {
		 
	},

	mounted() {
		this.$upload.on('product-gallery', {
			  maxFilesSelect: 20,
			  dropzoneId: 'product-gallery-dropzone',
			  multiple: true,
			  onStart() {
					 this.$toggle.show('product:media:uploads');
			  },
			  onSuccess(res) {
					this.product.gallery.push(res.data.data);
			  },
			  onEnd() {
					this.$msgbag.success('File upload complete.');
			  }
		 });

		 this.$upload.option('product-gallery', {
			  url: '/gallery'
		 });
	},

	beforeDestroy() {
		 this.$upload.off('product-gallery');
	},
}
</script>
