<script lang="ts">
import Title from '@/components/Utils/Title.vue'

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Title },
  created() {
    this.filteredModules = [...this.modules]
  },
  data() {
    return {
      searchValue: '',
      filteredModules: [],
      modules: [
        {
          name: 'MODULE NAME',
          image_url: 'https://pbs.twimg.com/media/E1RnbS_VcAg4B5C.jpg',
          tags: ['FAVORITES', 'MODERATION'],
          description:
            'Ipsum elit excepteur aliqua nostrud. Laboris sint nostrud mollit veniam dolor esse mollit mollit proident deserunt sunt incididunt ullamco.',
          download: 1000,
          stars: 10,
          commands_count: 20
        },
        {
          name: 'MODULE NAME',
          image_url: 'https://pbs.twimg.com/media/E1RnbS_VcAg4B5C.jpg',
          tags: ['INSTALLED', 'MODERATION'],
          description:
            'Ipsum elit excepteur aliqua nostrud. Laboris sint nostrud mollit veniam dolor esse mollit mollit proident deserunt sunt incididunt ullamco.',
          download: 929,
          stars: 129,
          commands_count: 27
        },
        {
          name: 'MODULE NAME',
          image_url: 'https://pbs.twimg.com/media/E1RnbS_VcAg4B5C.jpg',
          tags: ['INSTALLED', 'ADMINISTRATION'],
          description:
            'Ipsum elit excepteur aliqua nostrud. Laboris sint nostrud mollit veniam dolor esse mollit mollit proident deserunt sunt incididunt ullamco.',
          download: 2819,
          stars: 12,
          commands_count: 1
        }
      ],
      tags: ['INSTALLED', 'FAVORITES', 'MODERATION', 'ADMINISTRATION', 'CUSTOMIZATION', 'GAMES'],
      selected_tags: []
    }
  },
  methods: {
    search(s) {
      this.searchValue = s.target.value
      this.filteredModules = this.modules.filter(
        (x) =>
          x.description.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          x.name.toLowerCase().includes(this.searchValue.toLowerCase())
      )
    },
    changeTag() {
      this.filteredModules = this.modules.filter((x) =>
        this.selected_tags.every((y) => x.tags.includes(y))
      )
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 text-white font-black">
    <Title name="MODULES" />
    <div class="navigation flex w-full flex-col gap-3">
      <div class="flex w-full bg-dark p-3 rounded-lg">
        <svg
          width="28"
          height="28"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.3023 17.9111L19.2526 16.8397L17.0796 18.908L18.1293 19.9795L20.3023 17.9111ZM31.2465 33.3677C31.8262 33.9594 32.7827 33.9761 33.3827 33.405C33.9828 32.8338 33.9992 31.8911 33.4195 31.2993L31.2465 33.3677ZM18.1293 19.9795L31.2465 33.3677L33.4195 31.2993L20.3023 17.9111L18.1293 19.9795Z"
            fill="white"
          />
          <path
            d="M20.5488 11.0353C20.5488 16.0969 16.3797 20.2371 11.1911 20.2371C6.00254 20.2371 1.8335 16.0969 1.8335 11.0353C1.8335 5.97365 6.00254 1.8335 11.1911 1.8335C16.3797 1.8335 20.5488 5.97365 20.5488 11.0353Z"
            stroke="white"
            stroke-width="3"
          />
        </svg>

        <input
          v-on:input="search"
          :value="searchValue"
          class="ml-4 bg-transparent w-full focus:outline-0"
        />
      </div>
      <div class="flex flex-row flex-wrap gap-3 text-sm justify-between items-stretch font-bold">
        <div class="flex justify-between flex-1" v-for="tag of selected_tags" :key="tag">
          <div
            class="select-none bg-primary w-full cursor-pointer text-dark flex space-b items-center justify-center px-3 pt-1.5 pb-1 rounded-lg"
            @click="
              selected_tags.includes(tag)
                ? (selected_tags = selected_tags.filter((x) => x != tag))
                : selected_tags.push(tag),
                changeTag()
            "
          >
            {{ tag }}
          </div>
        </div>
        <div
          class="flex justify-between flex-1"
          v-for="tag of tags.filter((x) => !selected_tags.includes(x))"
          :key="tag"
        >
          <div
            class="select-none bg-dark w-full cursor-pointer flex space-b items-center justify-center px-3 pt-1.5 pb-1 rounded-lg"
            @click="
              selected_tags.includes(tag)
                ? (selected_tags = selected_tags.filter((x) => x != tag))
                : selected_tags.push(tag),
                changeTag()
            "
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
    <div class="modules flex-shrink h-3/4 overflow-y-auto rounded-lg">
      <div class="flex flex-col w-full h-96 gap-4">
        <div v-for="index of Array(Math.ceil(filteredModules.length / 3)).keys()" :key="index">
          <div class="flex w-full gap-4">
            <div v-for="mod of filteredModules.slice(index * 3, 3 + index * 3)" :key="mod">
              <div class="px-10 flex gap-2 flex-col items-stretch max-w-xl bg-dark p-4 rounded-lg">
                <p class="text-xl text-center">{{ mod.name }}</p>
                <img :src="mod.image_url" class="rounded-lg" alt="Module image" />
                <div class="flex gap-3 text-xs w-full">
                  <div v-for="tag of mod.tags" :key="tag">
                    <div
                      class="select-none bg-primary w-full text-dark flex items-center justify-center px-3 pt-1.5 pb-1 rounded-md"
                    >
                      {{ tag }}
                    </div>
                  </div>
                </div>
                <p class="font-normal">{{ mod.description }}</p>
                <div class="w-full text-lg flex gap-2">
                  <p class="font-bold">Commands count:</p>
                  <span>{{ mod.commands_count }}</span>
                </div>
                <div class="flex justify-between w-full">
                  <div class="flex gap-3">
                    <svg
                      width="21"
                      height="25"
                      viewBox="0 0 21 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.1346 9.11625L17.9904 10.8837L10.5 18.0175L3.00952 10.8837L4.8654 9.11625L9.1875 13.2325V0H11.8125V13.2325L16.1346 9.11625ZM18.375 22.5V20H21V22.5C21 23.8775 19.824 25 18.375 25H2.625C1.176 25 0 23.8775 0 22.5V20H2.625V22.5H18.375Z"
                        fill="#3BA565"
                      />
                    </svg>
                    <span class="pt-1">{{ mod.download }}</span>
                  </div>
                  <div class="flex gap-3">
                    <svg
                      width="26"
                      height="25"
                      viewBox="0 0 26 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.5125 8.35017L18.1228 7.74289C17.5142 7.74289 17.0578 7.28742 16.9057 6.83196L14.4715 0.910928C14.0151 -0.303643 12.1894 -0.303643 11.733 0.910928L8.99456 6.98378C8.84242 7.43925 8.38601 7.74289 7.77747 7.89471L1.38772 8.35017C0.0184932 8.50199 -0.437917 10.172 0.474903 11.083L5.34328 15.334C5.79969 15.6376 5.95183 16.2449 5.79969 16.8522L4.27832 23.0768C3.97405 24.4432 5.34328 25.3542 6.56037 24.7469L12.0373 21.4068C12.4937 21.1032 13.1023 21.1032 13.5587 21.4068L19.0356 24.7469C20.2527 25.506 21.6219 24.4432 21.3176 23.0768L19.7963 16.8522C19.6441 16.2449 19.7963 15.7894 20.2527 15.334L25.1211 11.083C26.4903 10.172 25.8817 8.50199 24.5125 8.35017ZM12.9501 18.0667L7.16892 21.5586L8.69029 15.0303L3.66977 10.6275L10.3638 10.0202L12.9501 3.94735L15.5364 10.0202L22.2305 10.6275L17.2099 15.0303L18.7313 21.5586L12.9501 18.0667Z"
                        fill="#F7A530"
                      />
                      <path
                        d="M12.9501 18.0667L7.16892 21.5586L8.69029 15.0303L3.66977 10.6275L10.3638 10.0202L12.9501 3.94735L15.5364 10.0202L22.2305 10.6275L17.2099 15.0303L18.7313 21.5586L12.9501 18.0667Z"
                        fill="#F7A530"
                      />
                    </svg>
                    <span class="pt-1">{{ mod.stars }}</span>
                  </div>
                </div>

                <div class="w-full pt-6">
                  <div
                    v-if="mod.tags.includes('INSTALLED')"
                    class="p-3 mb-4 pt-4 cursor-pointer bg-red-400 text-dark rounded-md flex justify-center w-full hover:bg-red-600 duration-300 hover:text-white hover:font-normal"
                  >
                    REMOVE MODULE
                  </div>
                  <div
                    v-else
                    class="add-module mb-4 p-3 pt-4 cursor-pointer bg-primary text-dark rounded-md flex justify-center w-full"
                  >
                    ADD MODULE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modules {
  padding-right: 10px;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10rem;
    background-color: var(--dark);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--grey);
    border-radius: 10rem;
  }
}
.edit-icon {
  &:hover {
    svg {
      path {
        fill: var(--primary);
      }
    }
  }
}

.add-module {
  position: relative;
  overflow: hidden;
  transition: background-color 0.5s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -150%;
    width: 200%;
    height: 200%;
    background: rgba(255, 255, 255, 0.6);
    transform: rotate(45deg);
    transition:
      transform 0.5s ease-in-out,
      left 0.5s ease-in-out;
  }

  &:hover::before {
    left: 50%;
    transform: translateX(-50%) translateY(-320%) rotate(45deg);
  }
}
</style>
