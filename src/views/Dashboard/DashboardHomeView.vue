<script lang="ts">
import Title from '@/components/Utils/Title.vue'

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Title },
  data() {
    return {
      bot_data: {
        name: 'IFANOXY BOT TESTER',
        image_url: 'https://pbs.twimg.com/profile_images/1596115537481940992/Ea4pTA2G_400x400.jpg',
        description: 'a discord bot.\nmulti-line\ncheck'
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 text-white font-black">
    <Title name="INFORMATIONS" />
    <div>
      <span class="pl-2">BOT NAME</span>
      <div class="flex items-center w-full mt-2 rounded-xl bg-dark">
        <p class="font-normal grow flex p-4 h-full">{{ bot_data.name }}</p>
        <div class="edit-icon mr-0 px-4 cursor-pointer">
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
              fill="#D9D9D9"
            />
          </svg>
        </div>
      </div>
    </div>
    <div>
      <span class="pl-2">BOT DESCRIPTION</span>
      <div class="flex items-center w-full mt-2 rounded-xl bg-dark">
        <p class="whitespace-pre font-normal grow flex p-4 h-full">{{ bot_data.description }}</p>
        <div class="edit-icon mr-0 px-4 cursor-pointer">
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
              fill="#D9D9D9"
            />
          </svg>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
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
