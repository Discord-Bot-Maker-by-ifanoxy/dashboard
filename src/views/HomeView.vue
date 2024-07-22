<template>
  <div v-if="!isMobile()">
    <div class="cursor" ref="cursor"></div>
    <div class="cursor-follower" ref="follower"></div>
  </div>
  <div class="flex flex-grow flex-row md:flex-col w-full items-center cursor-none justify-center">
    <div
      class="hero flex-col md:flex-row flex text-white items-center justify-center w-full font-black uppercase"
    >
      <div
        class="h-60 gap-3 sm:pt-10 select-none flex-col md:gap-20 flex text-7xl w-full justify-center items-center"
      >
        <div class="h-20 flex box justify-center items-center w-full" ref="box">
          <Transition name="fade">
            <div class="flex w-full items-center justify-center relative" v-show="animationEnd">
              <h3
                v-on:mouseover="startAnimation"
                class="select-none text-center animation-text text-2xl 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-3xl"
              >
                Discord Bot Maker
              </h3>
            </div>
          </Transition>
        </div>
        <div
          v-show="firstAnimation"
          class="flex justify-end md:order-2 space-x-3 relative md:space-x-0 rtl:space-x-reverse"
        >
          <button
            @click="$router.push('/dashboard')"
            type="button"
            class="z-10 text-dark xl:text-2xl md:text-lg md:px-10 md:py-3 font-black bg-primary duration-300 hover:bg-white hover:rounded-xl rounded-lg text-lg px-10 py-2 pt-2.5 lg:px-20 lg:py-5 lg:pt-6 text-center"
          >
            CREATE YOUR BOT
          </button>
        </div>
      </div>
      <div class="flex gap-3 md:gap-6 flex-col justify-center w-full">
        <img class="inset-0 object-contain px-12 md:px-16" src="@/assets/logo.png" />
        <div class="text-center flex flex-col gap-2 max-w-2xl md:px-16">
          <div class="flex gap-2 justify-center">
            <p class="font-normal">Over</p>
            <span>{{ stats.bot_count }}</span>
            <p class="font-normal">bots was created</p>
          </div>
          <div class="flex gap-2 justify-center">
            <p class="font-normal">With</p>
            <span>{{ stats.modules_count }}</span>
            <p class="font-normal">updated modules</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import gsap from 'gsap'
import { API } from '@/script/api'

export default defineComponent({
  async beforeCreate() {
    this.stats = (await API.stats())?.data ?? null
  },
  data() {
    return {
      text: '',
      animationEnd: true,
      firstAnimation: false,
      stats: {
        bot_count: 0,
        modules_count: 0
      }
    }
  },
  mounted() {
    this.startAnimation()
    this.cursor()
  },
  methods: {
    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
    cursor() {
      const { cursor, follower } = this.$refs

      let posX = 0
      let posY = 0
      let mouseX = 0
      let mouseY = 0

      const TM = gsap.timeline()

      TM.to({}, 0.005, {
        repeat: -1,
        onRepeat: function () {
          posX += (mouseX - posX) / 9
          posY += (mouseY - posY) / 9

          if (follower) TM.set(follower, {
            css: {
              left: posX - 12,
              top: posY - 12
            }
          })

          if (cursor) TM.set(cursor, {
            css: {
              left: mouseX,
              top: mouseY
            }
          })
        }
      })

      const animateCursor = () => {
        posX += (mouseX - posX) / 9
        posY += (mouseY - posY) / 9

        if (follower.value) {
          gsap.set(follower.value, {
            css: {
              left: posX - 12,
              top: posY - 12
            }
          })
        }

        if (cursor.value) {
          gsap.set(cursor.value, {
            css: {
              left: mouseX,
              top: mouseY
            }
          })
        }
      }

      requestAnimationFrame(animateCursor)

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
      })

      document.querySelectorAll('.link').forEach((element) => {
        element.addEventListener('mouseenter', () => {
          cursor.value?.classList.add('active')
          follower.value?.classList.add('active')
        })
        element.addEventListener('mouseleave', () => {
          cursor.value?.classList.remove('active')
          follower.value?.classList.remove('active')
        })
      })
    },
    startAnimation() {
      if (!this.animationEnd) return
      this.animationEnd = false
      const { box } = this.$refs
      const words = ['welcome', 'at', 'the', 'best', 'discord', 'bot', 'maker.']
      const timeline = gsap.timeline({
        delay: 0.6,
        onComplete: () => {
          this.animationEnd = true
          this.firstAnimation = true
        }
      })

      let wordCount = words.length,
        time = 0,
        word,
        element,
        duration,
        isSentenceEnd,
        i

      for (i = 0; i < wordCount; i++) {
        word = words[i]
        isSentenceEnd = /(\.|\?|!)$/g.test(word)
        element = document.createElement('h3')
        element.className += 'animation-text select-none text-center animation-text text-2xl 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-3xl'
        element.textContent = word
        box.append(element)
        duration = Math.max(0.55, word.length * 0.08)
        if (isSentenceEnd) {
          duration += 0.6
        }

        gsap.set(element, { autoAlpha: 0, scale: 0, z: 0.01 })

        timeline
          .to(element, duration, { scale: 1.2, ease: 'slow(0.20, 0.9)' }, time)
          .to(element, duration, { autoAlpha: 1, ease: 'slow(0.20, 0.9, true)' }, time)
          .to(element, duration, { autoAlpha: 0, ease: 'slow(0.1, 0.5)' }, time + duration - 0.25)

        time += duration - 0.05
        if (isSentenceEnd) {
          time += 0.6
        }
      }
    }
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.box {
  .animation-text {
    position: absolute;
  }
}

.cursor {
  position: fixed;
  background-color: var(--primary);
  width: 10px;
  height: 10px;
  border-radius: 100%;
  transition:
    0.3s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
    0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity;
  user-select: none;
  pointer-events: none;
  z-index: 2;
  transform: scale(1);

  &.active {
    opacity: 1;
    transform: scale(0);
  }

  &.menu-active {
    opacity: 1;
    transform: scale(0);
  }

  &.hovered {
    opacity: 1;
  }
}

.cursor-follower {
  position: fixed;
  border: 1px solid black;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  transition:
    0.6s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
    0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity,
    0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) background;
  user-select: none;
  pointer-events: none;
  z-index: 2;
  transform: translate(2px, 2px);

  &.active {
    opacity: 1;
    transform: scale(3);
  }

  &.menu-active {
    opacity: 1;
    transform: scale(3);
  }

  &.hovered {
    opacity: 1;
  }
}
</style>
