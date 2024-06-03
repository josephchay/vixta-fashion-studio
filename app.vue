<template>
  <div class="app-wrapper">
    <site-header v-show="assetsLoaded" />
    <Transition name="preloader">
      <site-preloader
        v-if="!assetsLoaded"
        @assets-loaded="assetsLoaded = true"
      />
    </Transition>
    <Nuxt-Page
      :transition="{
        name: 'page-transition',
        mode: 'out-in',
        onLeave: pageTransitionLeave,
      }"
      :transitioning="transitioning"
      :transitioned="transitioned"
      :class="{ 'fouc-fix': !transitioned, hidden: !assetsLoaded }"
    />
    <Transition @leave="footerLeave">
      <site-footer
        v-show="!['Contact', 'Archive'].includes($route.name) && assetsLoaded"
      />
    </Transition>
  </div>
  <page-transition ref="pageTrans" />
  <scroll-bar />
</template>

<script>
import { appAnimations } from "~/animations/app";
export default {
  provide() {
    return {
      getTransitioned: () => this.transitioned,
      getAssetsLoaded: () => this.assetsLoaded,
    };
  },
  data() {
    return {
      assetsLoaded: false,
    };
  },
  computed: {},
  setup() {
    const transitioning = ref(false);
    const transitioned = ref(false);
    if (process.client) {
      lockScroll(transitioning, "app", true);
      const unwatch = watch(transitioning, (value) => {
        if (value) {
          transitioned.value = true;
        }
      });
    }
    useSeoMeta({
      description:
        "Vixta is a fashion photography studio based in Kuala Lumpur, Malaysia. We are dedicated to capturing the essence of style and beauty through our lens. Our passion lies in creating captivating visual stories that elevate fashion to an art form.",
      ogTitle: "Vixta",
      ogDescription:
        "Vixta is a fashion photography studio based in Kuala Lumpur, Malaysia. We are dedicated to capturing the essence of style and beauty through our lens. Our passion lies in creating captivating visual stories that elevate fashion to an art form.",
      ogImage:
        "https://github.com/josephchay/vixta-fashion-studio/assets/136827046/a5bb021c-1ae0-4d90-9098-dfda1e6cee0d",
      ogUrl: "vixta.netlify.com",
      twitterTitle: "Vixta",
      twitterDescription:
        "Vixta is a fashion photography studio based in Kuala Lumpur, Malaysia. We are dedicated to capturing the essence of style and beauty through our lens. Our passion lies in creating captivating visual stories that elevate fashion to an art form.",
      twitterImage:
        "https://github.com/josephchay/vixta-fashion-studio/assets/136827046/a5bb021c-1ae0-4d90-9098-dfda1e6cee0d",
      twitterCard: "A fashion studio",
    });

    useHead({
      title: "Vixta",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: true,
        },
        {
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap",
          rel: "stylesheet",
        },
        {
          href: "/favicon.ico",
          type: "image/x-icon",
          rel: "icon",
        },
      ],
      script: [],
    });
    return {
      transitioning,
      transitioned,
    };
  },
  methods: {
    async pageTransitionLeave(el, done) {
      this.transitioning = true;
      await appAnimations.leave(el, done, this.$route.meta.mitt);
      this.transitioning = false;
    },
    scrollToTop() {
      this.$lenis.setScroll(0);
    },
    footerLeave(el, done) {
      if (this.transitioned) {
        this.$eventBus.on("footer-leave", done);
      } else {
        done();
      }
    },
  },
  mounted() {
    appAnimations.init(this.$refs.pageTrans.$refs.pageTransition, {
      scrollToTop: this.scrollToTop,
    });
    function vhSetter() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    vhSetter();
    window.addEventListener("resize", vhSetter);
  },
};
</script>

<style scoped>
@import url("./styles/app.pcss");
</style>