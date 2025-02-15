<template>
  <footer class="site-footer container">
    <div class="site-footer__links">
      <ul
        class="site-footer__link-group"
        :class="links.header"
        v-for="(links, i) in footerLinks"
        :key="links.header + i"
      >
        <h5 class="link-group__header">{{ links.header }}</h5>
        <li
          class="link-group__link"
          v-for="(link, i) in links.links"
          :key="link.text + i"
        >
          <site-link
            v-if="link?.type != 'button' && link?.type != 'share'"
            color="rgba(255,255,255,0.88)"
            :text="link.text"
            size="sm"
            :to="link.path"
            :prefetch="link.prefetch"
          />
          <share-link v-else-if="link?.type == 'share'" />
          <action-button
            v-else
            :text="link.text"
            size="sm"
            color="rgba(255,255,255,0.88)"
            @click="link.action"
          />
        </li>
      </ul>
    </div>
    <div class="site-footer__creators">
      <p class="creators__credit">
        Design by
        <site-link
          to="https://x.com/josephchay"
          text="Joseph"
          size="sm"
          class="creator__twitter"
          color="rgba(255,255,255,0.88)"
          :newTab="true"
        />
      </p>
      <p class="creators__credit">
        Development by
        <site-link
          to="https://x.com/josephchay"
          text="Joseph"
          size="sm"
          class="creator__twitter"
          color="rgba(255,255,255,0.88)"
          :newTab="true"
        />
      </p>
    </div>
    <div class="site-footer__logo">
      <h2 class="logo__word">
        <span
          class="logo__char"
          v-for="(char, i) in 'Vixta'.split('')"
          :key="char + i"
        >
          {{ char }}
        </span>
      </h2>
      <p class="creators__credit">
        Design by
        <site-link
          to="https://x.com/josephchay"
          text="Joseph"
          size="sm"
          class="creator__twitter"
          color="rgba(255,255,255,0.88)"
          :newTab="true"
        />
      </p>
      <p class="creators__credit">
        Development by
        <site-link
          to="https://x.com/josephchay"
          text="Joseph"
          size="sm"
          class="creator__twitter"
          color="rgba(255,255,255,0.88)"
          :newTab="true"
        />
      </p>
    </div>

    <transition @enter="creditsEnter" @leave="creditsLeave">
      <site-credits
        v-show="creditsOpen"
        @close-creds="() => toggleCredits(false)"
        :credits-open="creditsOpen"
      />
    </transition>
  </footer>
</template>

<script>

import { gsap } from "gsap";
import { CustomEase } from "gsap/all";
import { SplitText } from "~/assets/gsap-premium/SplitText";
gsap.registerPlugin(CustomEase, SplitText);

import { animations } from "~/animations/footer/SiteCredits";
import { footerAnimations } from "~/animations/footer/SiteFooter";
import useVixtaEnter from "../../composables/useVixtaEnter";

const creditsAnimations = new animations();

export default {
  setup() {
    function callback1() {
      creditsAnimations.init();
      footerAnimations.logoIn();
    }

    useVixtaEnter(callback1, callback1);
  },
  data() {
    return {
      creditsOpen: false,
      footerLinks: [
        {
          header: "sitemap",
          links: [
            {
              text: "Home",
              path: "/",
              prefetch: true,
            },
            {
              text: "Studio",
              path: "/studio",
              prefetch: true,
            },
            {
              text: "Lookbook",
              path: "/lookbook",
              prefetch: true,
            },
            {
              text: "Contact",
              path: "/contact",
              prefetch: true
            },
          ],
        },
        {
          header: "support",
          links: [
            {
              text: "Credits",
              type: "button",
              action: () => {
                this.toggleCredits(true);
              },
            },
            {
              text: "Share link",
              path: "/share-link",
              type: "share",
            },
          ],
        },
        {
          header: "bonus",
          links: [
            {
              text: "Request content removal",
              type: "button",
              action: () => {
                window.location.href =
                  "mailto:codebulous@gmail.com?subject=Request Content Removal";
              },
            },
            {
              text: "Archive",
              path: "/archive",
              prefetch: false,
            },
          ],
        },
      ],
    };
  },
  methods: {
    async creditsEnter(el, done) {
      await creditsAnimations.enter(el, done);
      this.animating = false;
    },
    async creditsLeave(el, done) {
      await creditsAnimations.leave(el, done);
      this.animating = false;
    },
    toggleCredits(value) {
      if (!this.animating) {
        this.creditsOpen = value;
        this.animating = true;
      }
    },
  },
};
</script>

<style scoped>
.site-footer {
  background-color: var(--vixta-dark-brown);
  color: rgba(255, 255, 255, 0.88);
  padding-top: 40px;
  position: relative;
}

.site-footer__links {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  gap: 50px;
}

.bonus {
  display: none !important;
}

.site-footer__link-group {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.link-group__header {
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  margin-bottom: 4px;
  color: white;
}

.link-group__link {
  line-height: 1;
}

.site-footer__creators {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.creators__credit {
  line-height: 1;
  font-size: 14px;
  will-change: opacity visibility;
}

.creator__twitter.site-link {
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
}

.site-footer__logo {
  /* position: absolute; */
  left: 20px;
  right: 20px;
  bottom: 18px;
  font-family: var(--vixta-nohemi);
  padding-top: 20px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "logo";
  line-height: 1;
  overflow: hidden;
  margin-top: 186px;

  .creators__credit {
    font-size: 16px;
    display: none;

    .creator__twitter.site-link {
      font-size: 16px;
      line-height: 1;
      font-weight: 400;
    }
  }

  .creators__credit:nth-child(2) {
    grid-area: credit1;
    position: relative;
    left: 0.8vw;
  }

  .creators__credit:nth-child(3) {
    grid-area: credit2;
    position: relative;
    right: 0.8vw;
  }

  &.fake {
    line-height: 1;
    visibility: hidden;

    .logo-word {
      line-height: 1 !important;
    }
  }
}

.logo__word {
  display: flex;
  justify-content: space-between;
  width: 100%;
  grid-area: logo;
  font-size: 34vw;
  line-height: 0.66;
  padding-top: 50px;
  letter-spacing: -1px;
}

.logo__char {
  display: inline-block;
  will-change: transform;
}

.false-text {
  visibility: hidden;
}

.logo-space-filler {
  margin-top: 186px;
  height: 40px;
}

@media screen and (width >= 500px) {
  .logo__word {
    font-size: 35vw;
  }
}

@media screen and (width >= 724px) {
  .site-footer {
    padding-top: 100px;
    min-height: clamp(
      684px,
      calc((var(--vh, 1vh) * 100)),
      calc((var(--vh, 1vh) * 100))
    );
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .bonus {
    display: flex !important;
  }

  .link-group__header {
    font-size: 24px;
  }

  .site-footer__links {
    grid-template-columns: auto auto auto;
  }
  .site-footer__creators {
    display: none;
  }
  .site-footer__logo {
    position: absolute;
    margin: 0;
    order: 1;
    justify-self: end;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "logo logo logo" "credit1 ... credit2";
    .creators__credit {
      display: block;
    }
    .logo__word {
      font-size: 37vw;
    }
  }
}

@media screen and (width >= 1100px) {
  .site-footer__logo {
    .creators__credit:nth-child(2) {
      left: 0.8vw;
    }

    .creators__credit:nth-child(3) {
      right: 0.65vw;
    }

    .logo__word {
      font-size: 38vw;
    }
  }
}
</style>
