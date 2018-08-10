<template>
  <PageArticle>
    <h4 slot="title">About</h4>
    <div slot="content">
      <section>
        <h5></h5>
        <div>

        </div>
      </section>
    </div>
  </PageArticle>
</template>

<script>
export default {
  head: {
    title: 'About'
  },
<<<<<<< HEAD
  created() {
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
	},

	mounted() {
		 this.$upload.option('product-gallery', {
			  url: '/gallery'
		 });
	},
=======
  data() {
    return {
>>>>>>> 60876e5a625cb5cf8816aee7faa108c2ba75fa95

    }
  }
}
</script>
