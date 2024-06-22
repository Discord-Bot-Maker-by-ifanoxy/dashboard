<script setup lang="ts">
import Sidbar from '@/components/Sidbar/Sidbar.vue'
</script>

<template>
  <div class="flex flex-grow">
    <Sidbar />
    <div class="flex m-12 justify-center flex-grow">
      <div
        class="bg-dark-grey flex items-center text-lg p-10 gap-6 flex flex-col rounded-xl text-white"
      >
        <h1 class="text-center text-4xl font-black">CREATE A BOT</h1>
        <h1
          :class="{ shake: disabled && !name, ['text-red-500']: disabled && !name }"
          class="duration-700"
        >
          Bot Name
        </h1>
        <input
          class="bg-dark rounded-md p-3 text-xl border-none focus:border-0 focus:ring-primary outline-none w-full"
          type="text"
          maxlength="64"
          :value="name"
          @input="(x) => (name = x.target.value)"
        />
        <h1
          :class="{ shake: disabled && !previewImage, ['text-red-500']: disabled && !previewImage }"
          class="duration-700"
        >
          Bot Avatar
        </h1>
        <label
          for="avatar"
          class="flex aspect-square max-w-32 sm:max-w-48 lg:max-w-64 2xl:max-w-80"
        >
          <img v-if="previewImage" :src="previewImage" class="w-full object-cover rounded-full" />
          <img
            v-else
            src="@/assets/plus.png"
            class="w-full p-10 rounded-full cursor-pointer border-[10px] border-dark border-dashed hover:border-primary duration-700"
          />
        </label>
        <input
          id="avatar"
          name="avatar"
          type="file"
          maxlength="16000000"
          class="invisible"
          accept="image/png"
          @change="uploadImage"
        />
        <div
          @click="createBot"
          :class="disabled ? 'bg-red-500 hover:bg-red-500 shake' : ''"
          class="bg-grey rounded-md p-5 mt-auto w-full text-center font-black cursor-pointer hover:bg-primary hover:text-dark duration-500"
        >
          CREATE
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { API } from '@/script/api'

export default {
  data() {
    return {
      disabled: false,
      name: null,
      previewImage: null
    }
  },
  methods: {
    uploadImage(e) {
      const image = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        this.previewImage = e.target.result
      }
    },
    async createBot() {
      if (!this.name || !this.previewImage) {
        this.warnDisabled()
        return
      }

      const result = await API.bot.create(this.name, this.previewImage)

      if (result.status === 500) return alert('You already have a bot with this name !')

      this.$router.push(`/dashboard/${this.name}`)
    },
    warnDisabled() {
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 1500)
    }
  }
}
</script>

<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
