<template>
  <!-- <div> -->
  <div class="lightbox">
    <div class="container">
      <div class="flex">
        <!-- <div class="meta-box"> -->
        <div class="info">
          <div class="info-btn">
            <button class="close-btn" @click.stop="hide">Close</button>
            <button @click.stop="showMultiple" class="photo-btn">
              <img src="../../assets/images/button_icon.svg" alt="image icon" />
              <span>Show all photos </span>
            </button>
          </div>
          <p>{{ index + 1 }} of {{ images.length }}</p>
        </div>
        <!-- </div> -->

        <div class="main-content">
          <div
            class="control controlFirst"
            @click.stop="prev"
            :class="{ invisible: !hasPrev }"
          >
            <svg
              class="pointer-events-none"
              fill="#1C2832"
              height="48"
              viewBox="0 0 24 24"
              width="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
              <path d="M0-.5h24v24H0z" fill="none" />
            </svg>
          </div>
          <div class="lightbox-image" @click.stop="">
            <img :src="images[index]" />
          </div>
          <div
            class="control controlSecond"
            @click.stop="next"
            :class="{ invisible: !hasNext }"
          >
            <svg
              class="pointer-events-none"
              fill="#1C2832"
              height="48"
              viewBox="0 0 24 24"
              width="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
              <path d="M0-.25h24v24H0z" fill="none" />
            </svg>
          </div>
        </div>

        <div class="image-meta">
          <h2>{{ image.title }}</h2>
          <p>{{ image.location }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    thumbnail: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    hasNext() {
      return this.index + 1 < this.images.length;
    },
    hasPrev() {
      return this.index - 1 >= 0;
    },
  },
  methods: {
    show() {
      this.$emit("show");
    },
    hide() {
      this.$emit("hide");
    },
    next() {
      this.hasNext && this.index++;
    },
    prev() {
      this.hasPrev && this.index--;
    },
    onKeydown(e) {
      if (this.visible) {
        switch (e.key) {
          case "ArrowRight":
            this.next();
            break;
          case "ArrowLeft":
            this.prev();
            break;
          case "ArrowDown":
          case "ArrowUp":
          case " ":
            e.preventDefault();
            break;
          case "Escape":
            this.hide();
            break;
        }
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.onKeydown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.onKeydown);
  },
};
</script>

<style scoped>
.lightbox {
  background: #263542;
  position: fixed;
  z-index: 99999;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 53px;
  overflow: auto;
}

.lightbox-image {
  flex: 1;
  width: 100%;
  max-width: 1098.67px;
  overflow: hidden;
  min-height: 618px;
}

.lightbox-image img {
  width: 100%;
  height: 100%;
  background-size: cover;
  max-width: 100%;
  object-fit: cover;
  max-height: 80%;
  border: 2px solid white;
}

.image-meta {
  margin: 44px 0 107px;
  text-align: center;
}
.image-meta h2 {
  font-size: 24px;
  line-height: 29px;
}
.image-meta p {
  font-size: 16px;
  line-height: 19px;
  color: #7d868e;
}

.container {
  max-width: 1324px;
  margin: 0 auto;
}

.main-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex {
  display: flex;
  flex-direction: column;
  position: relative;
}

.control {
  cursor: pointer;
  align-self: center;
}

.pointer-events-none {
  pointer-events: none;
}

.invisible {
  display: none !important;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10.7rem;
  color: #fff;
}

.info-btn {
  display: flex;
}

.close-btn {
  display: block;
  padding: 0.6rem 1.6rem;
  margin-right: 1.6rem;
  background: none;
  color: #fff;
  border-radius: 0.4rem;
  cursor: pointer;
}

.photo-btn {
  display: flex;
  align-items: center;
  padding: 0.6rem 1rem;
  margin-right: 0.8rem;
  border: 0;
  background: #fff;
  color: #263542;
  border-radius: 0.4rem;
  cursor: pointer;
}

.photo-btn img {
  margin-right: 0.6rem;
}

.control {
  position: absolute;
  width: 60px;
  height: 60px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.controlSecond {
  right: 0;
}

.controlFirst {
  left: 0;
}

@media (max-width: 768px) {
  .lightbox-image img {
    width: 100%;
    height: 100%;
    background-position: bottom;
    background-size: cover;
    max-width: 100%;
    border: 2px solid white;
  }

  .info-btn {
    display: block;
  }
}
</style>
