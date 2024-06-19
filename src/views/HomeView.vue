<template>
  <navbar />
  <div class="cursor" ref="cursor"></div>
  <div class="cursor-follower" ref="follower"></div>
  <div class="flex flex-col w-full h-auto">
    <div
      class="hero mt-40 sm:flex-col xl:flex-row flex text-white h-4/5 items-center w-full justify-center font-black uppercase"
    >
      <div class="box h-60 select-none flex text-8xl w-full justify-center items-center" ref="box">
        <Transition name="fade">
          <h3
            v-on:mouseover="startAnimation"
            v-show="animationEnd"
            class="select-none 2xl:text-7xl text-5xl"
          >
            Discord Bot Maker
          </h3>
        </Transition>
      </div>
      <div class="flex justify-center w-full">
        <img class="inset-0 object-contain max-w-2xl" src="@/assets/logo.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import gsap from 'gsap'

export default defineComponent({
  components: { Navbar },
  data() {
    return {
      text: '',
      animationEnd: true
    }
  },
  mounted() {
    this.startAnimation()
    this.cursor()
  },
  methods: {
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

          TM.set(follower, {
            css: {
              left: posX - 12,
              top: posY - 12
            }
          })

          TM.set(cursor, {
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
        onComplete: () => (this.animationEnd = true)
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
  h3 {
    position: absolute;
  }
}

body {
  cursor: none;
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
  z-index: 10000;
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
  z-index: 1;
  transition:
    0.6s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform,
    0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) opacity,
    0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33) background;
  user-select: none;
  pointer-events: none;
  z-index: 10000;
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
