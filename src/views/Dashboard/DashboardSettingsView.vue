<script lang="ts">
import Title from '@/components/Utils/Title.vue'
import { API } from '@/script/api'

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Title },
  data() {
    return {
      database: {
        host: '',
        port: '3306',
        username: '',
        password: '',
        name: 'Discord-Bot-Maker'
      },
      token: null,
      edit: null
    }
  },
  methods: {
    async exportBot() {
      const file = await API.exportBot(this.$route.params.id, this.database, this.token)
      const blob = new Blob([file.data], { type: file.data.type })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = this.$route.params.id + '.zip'
      link.click()
      URL.revokeObjectURL(link.href)
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 p-5 scroll-bar text-white font-black">
    <Title name="EXPORT" />
    <div class="flex flex-col gap-4">
      <p class="font-normal">
        The information you enter here will not be saved, it will just be sent when exporting your
        bot to configure it. You do not have to fill in this information to download it!
      </p>
      <span class="pl-2 underline text-xl">DATABASE</span>
      <div class="flex gap-6 w-full items-stretch">
        <div class="flex flex-col w-full">
          <span class="pl-2">HOST</span>
          <div class="flex gap-6">
            <div
              class="flex items-center w-full mt-2 rounded-xl bg-dark"
              :class="edit == 'host' ? 'border-primary border-2' : 'border-transparent border-2'"
            >
              <p
                @input="(x) => (database.host = x.target.textContent.trim())"
                :contenteditable="edit == 'host' ? 'plaintext-only' : 'false'"
                class="font-normal border-none focus:border-none focus:outline-none h-14 bg-dark rounded-xl grow flex p-4"
              />
              <div
                @click="edit === 'host' ? (edit = null) : (edit = 'host')"
                class="edit-icon mr-0 px-4 cursor-pointer"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="duration-300"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.2434 7.96976L18.9574 7.21466C20.5134 5.56689 20.5134 2.88466 18.9574 1.23583C17.4014 -0.411943 14.8676 -0.411943 13.3115 1.23583L12.5985 1.99198L18.2434 7.96976ZM11.195 3.47382L2.6978 12.4747L8.34365 18.4518L16.8409 9.45086L11.195 3.47382ZM1.523 20.9692L6.63634 19.6166L1.59838 14.2814L0.320035 19.6964C0.235741 20.0534 0.334911 20.4325 0.580862 20.693C0.826803 20.9534 1.18482 21.0574 1.523 20.9692Z"
                    :fill="edit === 'host' ? 'var(--primary)' : '#D9D9D9'"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <span class="pl-2">PORT</span>
          <div class="flex gap-6">
            <div
              class="flex items-center w-full mt-2 rounded-xl bg-dark"
              :class="edit == 'port' ? 'border-primary border-2' : 'border-transparent border-2'"
            >
              <p
                @input="(x) => (database.port = x.target.textContent.trim())"
                :contenteditable="edit == 'port' ? 'plaintext-only' : 'false'"
                class="font-normal border-none focus:border-none focus:outline-none h-14 bg-dark rounded-xl grow flex p-4"
              >
                3306
              </p>
              <div
                @click="edit === 'port' ? (edit = null) : (edit = 'port')"
                class="edit-icon mr-0 px-4 cursor-pointer"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="duration-300"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.2434 7.96976L18.9574 7.21466C20.5134 5.56689 20.5134 2.88466 18.9574 1.23583C17.4014 -0.411943 14.8676 -0.411943 13.3115 1.23583L12.5985 1.99198L18.2434 7.96976ZM11.195 3.47382L2.6978 12.4747L8.34365 18.4518L16.8409 9.45086L11.195 3.47382ZM1.523 20.9692L6.63634 19.6166L1.59838 14.2814L0.320035 19.6964C0.235741 20.0534 0.334911 20.4325 0.580862 20.693C0.826803 20.9534 1.18482 21.0574 1.523 20.9692Z"
                    :fill="edit === 'port' ? 'var(--primary)' : '#D9D9D9'"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-6 w-full items-stretch">
        <div class="flex flex-col w-full">
          <span class="pl-2">USERNAME</span>
          <div class="flex gap-6">
            <div
              class="flex items-center w-full mt-2 rounded-xl bg-dark"
              :class="
                edit == 'username' ? 'border-primary border-2' : 'border-transparent border-2'
              "
            >
              <p
                @input="(x) => (database.username = x.target.textContent.trim())"
                :contenteditable="edit == 'username' ? 'plaintext-only' : 'false'"
                class="font-normal border-none focus:border-none focus:outline-none h-14 bg-dark rounded-xl grow flex p-4"
              />
              <div
                @click="edit === 'username' ? (edit = null) : (edit = 'username')"
                class="edit-icon mr-0 px-4 cursor-pointer"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="duration-300"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.2434 7.96976L18.9574 7.21466C20.5134 5.56689 20.5134 2.88466 18.9574 1.23583C17.4014 -0.411943 14.8676 -0.411943 13.3115 1.23583L12.5985 1.99198L18.2434 7.96976ZM11.195 3.47382L2.6978 12.4747L8.34365 18.4518L16.8409 9.45086L11.195 3.47382ZM1.523 20.9692L6.63634 19.6166L1.59838 14.2814L0.320035 19.6964C0.235741 20.0534 0.334911 20.4325 0.580862 20.693C0.826803 20.9534 1.18482 21.0574 1.523 20.9692Z"
                    :fill="edit === 'username' ? 'var(--primary)' : '#D9D9D9'"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <span class="pl-2">PASSWORD</span>
          <div class="flex gap-6">
            <div
              class="flex items-center w-full mt-2 rounded-xl bg-dark"
              :class="
                edit == 'password' ? 'border-primary border-2' : 'border-transparent border-2'
              "
            >
              <p
                :contenteditable="edit == 'password' ? 'plaintext-only' : 'false'"
                @input="(x) => (database.password = x.target.textContent.trim())"
                class="font-normal border-none focus:border-none focus:outline-none h-14 bg-dark rounded-xl grow flex p-4"
              />
              <div
                @click="edit === 'password' ? (edit = null) : (edit = 'password')"
                class="edit-icon mr-0 px-4 cursor-pointer"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="duration-300"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.2434 7.96976L18.9574 7.21466C20.5134 5.56689 20.5134 2.88466 18.9574 1.23583C17.4014 -0.411943 14.8676 -0.411943 13.3115 1.23583L12.5985 1.99198L18.2434 7.96976ZM11.195 3.47382L2.6978 12.4747L8.34365 18.4518L16.8409 9.45086L11.195 3.47382ZM1.523 20.9692L6.63634 19.6166L1.59838 14.2814L0.320035 19.6964C0.235741 20.0534 0.334911 20.4325 0.580862 20.693C0.826803 20.9534 1.18482 21.0574 1.523 20.9692Z"
                    :fill="edit === 'password' ? 'var(--primary)' : '#D9D9D9'"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-6 w-full items-stretch">
        <div class="flex flex-col w-full">
          <span class="pl-2">DATABASE NAME</span>
          <div class="flex gap-6">
            <div
              class="flex items-center w-full mt-2 rounded-xl bg-dark"
              :class="edit == 'name' ? 'border-primary border-2' : 'border-transparent border-2'"
            >
              <p
                :contenteditable="edit == 'name' ? 'plaintext-only' : 'false'"
                @input="(x) => (database.name = x.target.textContent.trim())"
                class="font-normal border-none focus:border-none focus:outline-none h-14 bg-dark rounded-xl grow flex p-4"
              >
                Discord-Bot-Maker
              </p>
              <div
                @click="edit === 'name' ? (edit = null) : (edit = 'name')"
                class="edit-icon mr-0 px-4 cursor-pointer"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="duration-300"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.2434 7.96976L18.9574 7.21466C20.5134 5.56689 20.5134 2.88466 18.9574 1.23583C17.4014 -0.411943 14.8676 -0.411943 13.3115 1.23583L12.5985 1.99198L18.2434 7.96976ZM11.195 3.47382L2.6978 12.4747L8.34365 18.4518L16.8409 9.45086L11.195 3.47382ZM1.523 20.9692L6.63634 19.6166L1.59838 14.2814L0.320035 19.6964C0.235741 20.0534 0.334911 20.4325 0.580862 20.693C0.826803 20.9534 1.18482 21.0574 1.523 20.9692Z"
                    :fill="edit === 'name' ? 'var(--primary)' : '#D9D9D9'"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="pl-2 underline text-xl">DISCORD CLIENT</span>
      <div class="flex gap-6 w-full items-stretch">
        <div class="flex flex-col w-full">
          <span class="pl-2">BOT TOKEN</span>
          <div class="flex gap-6">
            <div
              class="flex items-center w-full mt-2 rounded-xl bg-dark"
              :class="edit == 'token' ? 'border-primary border-2' : 'border-transparent border-2'"
            >
              <p
                @input="
                  (x) => {
                    token = x.target.textContent.trim()
                  }
                "
                :contenteditable="edit == 'token' ? 'plaintext-only' : 'false'"
                class="font-normal border-none focus:border-none focus:outline-none h-14 rounded-xl grow flex p-4"
              />
              <div
                @click="edit === 'token' ? (edit = null) : (edit = 'token')"
                class="edit-icon mr-0 px-4 cursor-pointer"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="duration-300"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.2434 7.96976L18.9574 7.21466C20.5134 5.56689 20.5134 2.88466 18.9574 1.23583C17.4014 -0.411943 14.8676 -0.411943 13.3115 1.23583L12.5985 1.99198L18.2434 7.96976ZM11.195 3.47382L2.6978 12.4747L8.34365 18.4518L16.8409 9.45086L11.195 3.47382ZM1.523 20.9692L6.63634 19.6166L1.59838 14.2814L0.320035 19.6964C0.235741 20.0534 0.334911 20.4325 0.580862 20.693C0.826803 20.9534 1.18482 21.0574 1.523 20.9692Z"
                    :fill="edit === 'token' ? 'var(--primary)' : '#D9D9D9'"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <button @click="exportBot" class="py-4 px-8 m-5 rounded-md text-dark hover: bg-primary">
          EXPORT MY BOT
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-bar {
  padding-right: 10px;
  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--dark);
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
</style>
