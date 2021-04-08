<template>
  <section>
    <div class="logo">
      <img src="../../assets/images/logo.svg" alt="Travel Afrique Logo" />
    </div>

    <h1>Create Gallery</h1>

    <div class="create-gallery">
      <form
        @submit.prevent="uploadData"
        id="upload-data"
        v-for="(data, index) in imgData"
        :key="index"
      >
        <div>
          <button class="btn outline-btn" @click.prevent="deleteData(index)">
            delete
          </button>
        </div>
        <div>
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            required
            :disabled="loading"
            v-model="data.title"
            class="input"
            placeholder="Mountain Kilimanjaro"
          />
        </div>

        <div>
          <label for="location">Location</label>
          <input
            type="text"
            id="location"
            required
            :disabled="loading"
            v-model="data.location"
            class="input"
            placeholder="Nairobi, Kenya"
          />
        </div>
        <div>
          <label for="image">Photo</label>
          <!-- v-model="data.image" -->
          <input
            @change="onChangeFile(index, $event)"
            type="file"
            ref="file"
            required
            :disabled="loading"
            id="image"
            class="input"
            accept="image/*"
          />
        </div>
      </form>

      <button class="mt-8 btn primary-btn" @click="addNewData">Add new</button>

      <button
        :disabled="loading"
        :data-loading="loading"
        class="mt-8 btn primary-btn"
        type="submit"
        form="upload-data"
      >
        <span v-if="!loading"> Submit </span>
        <span class="loader" v-else> loading </span>
      </button>
    </div>
  </section>
</template>

<script>
import { encodeFileToBase64 } from "../../utils";
export default {
  name: "create-gallery",
  data() {
    return {
      imgData: [
        {
          title: "",
          location: "",
          image: null,
        },
      ],
      loading: false,
    };
  },
  methods: {
    addNewData() {
      this.imgData.push({ title: "", location: "", image: null });
    },
    onChangeFile(index, e) {
      this.imgData[index].image = e.target.files[0];
    },
    deleteData(index) {
      this.imgData.splice(index, 1);
    },
    async uploadData() {
      this.loading = true;
      const images = await Promise.all(
        this.imgData.map(async (image) => {
          const base64Image = await encodeFileToBase64(image.image);
          return {
            ...image,
            image: base64Image,
          };
        })
      );
      const res = await this.$store.dispatch("gallery/createGallery", images);
      this.loading = false;
      this.$notify({
        type: "success",
        title: res.message,
      });
      this.$router.push("/gallery-page");
    },
  },
};
</script>

<style scoped>
section {
  background: #263542;
  height: 100vh;
  overflow: auto;
  color: #fff;
}

h1 {
  text-align: center;
}

.logo {
  padding: 1.2rem;
}

.logo img {
  width: 30rem;
}

.input {
  width: 100%;
  padding: 12px 16px;
  background: #f4f4f49f;
  font-size: 1.6rem;
  border-color: #263542;
}

.create-gallery {
  width: 30%;
  margin: 3rem auto;
}

.mt-8 {
  margin-top: 3.2rem;
}

.outline-btn {
  border-color: #fff;
  color: #fff;
  display: inline;
  width: 20%;
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .create-gallery {
    width: 100%;
    padding: 0 2rem;
  }
}
</style>
