<template>
  <div class="mobile-header">
    <div class="mobile-header__controls">
      <Transition name="menu-controls" mode="default">
        <action-button
          v-show="!menuOpen"
          color="#1c1816"
          text="Menu"
          key="open-menu"
          class="open-menu"
          @click="() => toggleMenu(true)"
        />
      </Transition>

      <Transition name="menu-controls" mode="default">
        <action-button
          v-show="menuOpen"
          color="#faf7f0"
          text="Close"
          key="close-menu"
          class="close-menu"
          @click="() => toggleMenu(false)"
        />
      </Transition>
    </div>

    <Transition name="menu-container" @enter="menuEnter" @leave="menuLeave">
      <nav class="menu-container" v-show="menuOpen" ref="menuContainer">
        <div class="menu-container__bg"></div>
        <ul class="menu-options">
          <li
            class="menu-option"
            v-for="link in menuLinks"
            :key="link.text + link.path"
            @click="menuOpen = false"
          >
            <site-link
              class="site-link"
              :text="link.text"
              :to="link.path"
              color="#FAF7F0"
              :prefetch="link.prefetch"
            />
          </li>
        </ul>
        <div class="menu__logo">
          <span
            class="logo__char"
            v-for="(char, i) in logoSplitText"
            :key="char + i"
          >
            {{ char }}
          </span>
        </div>
      </nav>
    </Transition>
  </div>
</template>

<script>
import { menuAnimations } from "~/animations/header/SiteHeaderMobile";

export default {
  props: {
    menuLinks: Array,
  },
  setup() {
    const menuOpen = ref(false);
    if (process.client) {
      lockScroll(menuOpen, "mobile-menu");
    }
    return {
      menuOpen,
    };
  },
  data() {
    return {
      animating: false,
    };
  },
  computed: {
    logoSplitText() {
      return "Vixta".split("");
    },
  },
  mounted() {
    menuAnimations.init(this.$refs.menuContainer);
  },
  methods: {
    toggleMenu(value) {
      if (!this.animating) {
        this.menuOpen = value;
        this.animating = true;
      }
    },
    async menuEnter(el, done) {
      await menuAnimations.enter(el, done);
      this.animating = false;
    },
    async menuLeave(el, done) {
      await menuAnimations.leave(el, done);
      this.animating = false;
    },
  },
};
</script>

<style scoped>
@import url("~/styles/components/header/SiteHeaderMobile.pcss");
:global(.site-header) {
  position: fixed !important;
}
</style>