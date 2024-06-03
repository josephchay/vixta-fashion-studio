<template>
  <img
    :src="src"
    :alt="alt || 'Vixta Image'"
    class="site-image__image"
    :class="[{ 'no-ratio': !aRatio }, customClass]"
  />
</template>

<script>
export default {
  props: {
    src: String,
    alt: String,
    aRatio: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<style scoped>
.site-image__image {
  aspect-ratio: 396/432;

  &.no-ratio {
    aspect-ratio: auto;
  }

  object-fit: cover;
}
</style>