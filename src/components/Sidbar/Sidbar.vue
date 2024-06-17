<script lang="ts">
import BotRaw from '@/components/Sidbar/BotRaw.vue'
import Opener from '@/components/Sidbar/Opener.vue'
import BotIcon from '@/components/Sidbar/BotIcon.vue'
import { computed } from 'vue'

export default {
  components: { BotIcon, Opener, BotRaw },
  created() {
    this.opened = localStorage.getItem('sidebar-opened') == 'true'
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 1280) this.opened = false
    })
  },
  data() {
    return {
      bots: [
        {
          name: 'MEE6',
          bot_id: 123456789,
          image_url: 'https://pbs.twimg.com/profile_images/1596115537481940992/Ea4pTA2G_400x400.jpg'
        },
        {
          name: 'IFANOXY BOT TESTER',
          bot_id: 987654321,
          image_url: 'https://pbs.twimg.com/profile_images/1596115537481940992/Ea4pTA2G_400x400.jpg'
        }
      ],
      opened: localStorage.getItem('sidebar-opened') == 'true'
    }
  },
  methods: {
    computed,
    changeOpened: function () {
      this.opened = !this.opened
      localStorage.setItem('sidebar-opened', this.opened)
    }
  }
}
</script>

<template>
  <div class="sidebar p-5 bg-dark-grey duration-300" :class="opened ? 'w-96' : 'w-28'">
    <div v-if="opened">
      <div class="open flex flex-col gap-6">
        <div v-for="bot of bots">
          <BotRaw
            @click="$router.push(`/dashboard/${bot.bot_id}`)"
            :name="bot.name"
            :id="bot.bot_id"
            :image_url="bot.image_url"
          />
        </div>
        <div
          class="add-bot flex h-16 gap-6 p-4 w-full border-4 border-dark rounded-xl items-center hover:border-primary hover:cursor-pointer text-white duration-300"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 27L15 3" stroke="white" stroke-width="5" stroke-linecap="round" />
            <path d="M3 15H27" stroke="white" stroke-width="5" stroke-linecap="round" />
          </svg>
          <p class="pl-1">CREATE A BOT</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="open flex flex-col gap-6">
        <div v-for="bot of bots">
          <div class="flex justify-center items-center">
            <BotIcon
              @click="$router.push(`/dashboard/${bot.bot_id}`)"
              :id="bot.bot_id"
              :image_url="bot.image_url"
            />
          </div>
        </div>
        <div class="flex justify-center items-center">
          <div
            class="add-bot justify-center gap-6 p-4 h-16 w-16 border-4 border-dark rounded-full flex items-center hover:border-primary hover:cursor-pointer text-white duration-300"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 27L15 3" stroke="white" stroke-width="5" stroke-linecap="round" />
              <path d="M3 15H27" stroke="white" stroke-width="5" stroke-linecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <Opener class="invisible xl:visible" :opened="opened" @onClick="changeOpened" />
  </div>
</template>

<style scoped>
.add-bot svg {
  transition-duration: 0.4s;
}
.add-bot:hover {
  svg {
    transform: rotate(180deg);
    path {
      stroke: var(--primary);
    }
  }
}
</style>
