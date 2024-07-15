<script lang="ts">
import EmbedViewer from '@/components/Utils/EmbedViewer.vue'
import ColorPicker from '@/components/Utils/ColorPicker.vue'

export default {
  components: { EmbedViewer, ColorPicker },
  emits: ['save_data', 'close'],
  props: ['data', 'bot'],
  data() {
    return {
      new_data: { ...this.$props.data },
      showColor: false
    }
  },
  methods: {
    formatDiscordDate(date) {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const yesterday = new Date(today)
      yesterday.setDate(today.getDate() - 1)
      const dateToFormat = new Date(date)

      const options = { hour: '2-digit', minute: '2-digit' }
      const timeString = dateToFormat.toLocaleTimeString([], options)

      if (dateToFormat >= today) {
        return `Today at ${timeString}`
      } else if (dateToFormat >= yesterday) {
        return `Yesterday at ${timeString}`
      } else {
        const day = dateToFormat.getDate()
        const month = dateToFormat.toLocaleString('default', { month: 'short' })
        const year = dateToFormat.getFullYear()
        return `${day} ${month} ${year} at ${timeString}`
      }
    },
    auto_grow(element) {
      element.target.style.height = '2.5rem'
      element.target.style.height = element.target.scrollHeight + 'px'
    }
  }
}
</script>

<template>
  <div class="absolute backdrop-blur-md z-10 w-full h-full top-0 left-0 flex-grow"></div>
  <div class="absolute z-20 w-full max-h-full top-0 left-0 flex-grow flex">
    <div class="flex-grow overflow-y-auto max-h-full">
      <div
        class="m-10 xl:mx-32 xl:my-20 bg-grey flex grow border-primary border-2 flex-col p-6 gap-6 rounded-md"
      >
        <div class="flex font-black justify-center text-xl gap-6">
          <p class="">EDIT EMBED</p>
          <pre>{{ data.name }}</pre>
        </div>
        <div class="flex grow gap-6">
          <div class="flex flex-col gap-5 w-full flex-1">
            <div class="w-full flex flex-col gap-1">
              <div class="flex gap-3">
                <p>AUTHOR</p>
                <div class="add-link ml-auto gap-3 flex cursor-pointer">
                  <div class="">Add link</div>
                  <span class="material-symbols-outlined duration-500">link</span>
                </div>
              </div>
              <textarea
                maxlength="256"
                class="w-full"
                :value="new_data?.author?.name"
                :oninput="(x) => auto_grow(x)"
                @click="(x) => auto_grow(x)"
                @input="
                  (x) =>
                    new_data.author
                      ? (new_data.author.name = x.target.value)
                      : (new_data.author = { name: x.target.value })
                "
              />
            </div>

            <div class="w-full flex flex-col gap-1">
              <div class="flex gap-3">
                <p>TITLE</p>
                <div class="add-link ml-auto gap-3 flex cursor-pointer">
                  <div class="">Add link</div>
                  <span class="material-symbols-outlined duration-500">link</span>
                </div>
              </div>
              <textarea
                maxlength="256"
                class="w-full"
                :value="new_data.title"
                :oninput="(x) => auto_grow(x)"
                @click="(x) => auto_grow(x)"
                @input="(x) => (new_data.title = x.target.value)"
              />
            </div>

            <div class="w-full flex flex-col gap-1">
              <div class="flex gap-3">
                <p>DESCRIPTION</p>
              </div>
              <textarea
                maxlength="2048"
                class="w-full"
                :value="new_data.description"
                :oninput="(x) => auto_grow(x)"
                @click="(x) => auto_grow(x)"
                @input="(x) => (new_data.description = x.target.value)"
              />
            </div>

            <div class="w-full flex flex-col gap-1">
              <div class="flex gap-3">
                <p>COLOR</p>
                <span class="material-symbols-outlined cursor-pointer">palette</span>
                <ColorPicker
                  @setColor="(x) => (new_data.color = parseInt(x.slice(1), 16))"
                  :define-color="'#' + new_data.color.toString(16)"
                />
              </div>
            </div>

            <div class="w-full flex flex-col gap-1">
              <div class="flex gap-3">
                <p>FOOTER</p>
                <div class="add-link ml-auto gap-3 flex cursor-pointer">
                  <div class="">Add link</div>
                  <span class="material-symbols-outlined duration-500">link</span>
                </div>
              </div>
              <textarea
                maxlength="512"
                class="w-full"
                :value="new_data?.footer?.text"
                :oninput="(x) => auto_grow(x)"
                @click="(x) => auto_grow(x)"
                @input="
                  (x) =>
                    new_data.footer
                      ? (new_data.footer.text = x.target.value)
                      : (new_data.footer = { text: x.target.value })
                "
              />
            </div>

            <div class="w-full flex flex-col gap-1">
              <div class="flex gap-3">
                <p>TIMESTAMP</p>
                <div
                  @click="
                    new_data.timestamp
                      ? (new_data.timestamp = null)
                      : (new_data.timestamp = Date.now())
                  "
                  class="h-full aspect-square bg-dark-grey rounded-md select-none"
                  :class="new_data.timestamp ? 'border-2 border-primary' : ''"
                >
                  <span v-if="new_data.timestamp" class="material-symbols-outlined flex">
                    check
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-dark flex-1 flex gap-2.5 p-5 rounded-md">
            <img :src="bot.image" class="h-10 aspect-square rounded-full" />
            <div class="flex gap-2 flex-col">
              <div class="flex gap-2 mt-2 items-center">
                <p class="">{{ bot.name }}</p>
                <span class="text-[11px] pt-1 text-white">{{ formatDiscordDate(new Date()) }}</span>
              </div>
              <EmbedViewer :data="new_data" />
            </div>
          </div>
        </div>
        <div class="flex gap-6 mt-auto font-black">
          <button
            @click="$emit('close')"
            class="mr-auto bg-red-500 px-12 py-3 rounded-md duration-300 hover:text-dark hover:bg-white"
          >
            CANCEL
          </button>
          <button
            @click="$emit('save_data', this.new_data)"
            class="ml-auto bg-primary px-12 py-3 rounded-md text-dark duration-300 hover:bg-white"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
textarea,
input {
  background-color: var(--dark-grey);
  padding: 0.5rem;
  border-radius: 5px;
  width: 100%;
  overflow-y: hidden;
  resize: none;
  display: flex;
  height: 2.5rem;

  border: none !important;
  &:focus {
    box-shadow: none;
  }
}

.add-link:hover {
  span {
    transform: rotate(90deg);
  }
}
</style>
