<template>
  <div>
    <nav class="bg-dark" :class="$route.name === 'home' ? 'cursor-none' : ''">
      <div class="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4 ml-0">
        <a
          @click="$router.push('/')"
          class="sm!w-50 md:w-80 flex items-center space-x-3 rtl:space-x-reverse z-10"
        >
          <img src="@/assets/logo.svg" class="h-12" alt="Discord Bot Maker Logo" />
          <span
              v-if="!isMobile()"
            class="logo-text self-center text-2xl font-black whitespace-nowrap text-white duration-500"
          >
            <span>D</span><span>I</span><span>S</span><span>C</span><span>O</span><span>R</span
            ><span>D</span>&nbsp; <span>B</span><span>O</span><span>T</span>&nbsp; <span>M</span
            ><span>A</span><span>K</span><span>E</span><span>R</span>
          </span>
        </a>
        <div class="md:w-80 justify-center md:justify-end flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div
            class="flex gap-6 duration-300 hover:bg-dark-grey hover:rounded-xl rounded-lg text-lg px-4 py-2 cursor-pointer text-center z-10"
            v-if="user"
            @click="$router.push('/settings')"
          >
            <img
              :src="`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`"
              class="rounded-full"
              width="48"
              height="48"
            />
            <button type="button" class="px-2 text-2xl font-black text-white">
              {{ user.username.toUpperCase() }}
            </button>
          </div>
          <div v-else>
            <button
              @click="$router.push('/login')"
              type="button"
              class="text-dark font-black bg-primary duration-300 hover:bg-white hover:rounded-xl rounded-lg text-lg px-20 py-2 text-center z-10"
            >
              LOGIN
            </button>
          </div>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul
            class="flex gap-4 flex-col items-center font-medium p-4 md:p-0 mt-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
          >
            <li>
              <a
                href="https://github.com/Discord-Bot-Maker-by-ifanoxy"
                target="_blank"
                class="select-none block nav-items px-3 pt-0.5 font-normal text-lg text-white rounded"
                >GITHUB</a
              >
            </li>
            <li>
              <a
                @click="$router.push('discord')"
                class="select-none block nav-items px-3 pt-0.5 font-normal text-lg text-white rounded"
                >SUPPORT</a
              >
            </li>
            <li>
              <a
                @click="$router.push('/dashboard')"
                class="select-none block nav-items px-3 pt-0.5 font-normal text-lg text-white rounded"
                >DASHBOARD</a
              >
            </li>
            <li>
              <a
                @click="$router.push('/')"
                class="select-none block nav-items px-3 pt-0.5 font-normal text-lg text-white rounded"
                >ABOUT</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss">
.logo-text {
  display: inline-block;
  cursor: pointer;

  span {
    display: inline-block;
    transition:
      transform 0.6s,
      color 0.6s;
  }

  &:hover {
    span {
      animation:
        jump 0.6s ease forwards,
        changeColor 0.6s ease forwards;
    }

    @for $i from 1 through 20 {
      span:nth-child(#{$i}) {
        animation-delay: 0.06s * ($i - 0.01);
      }
    }
  }
}

@keyframes jump {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes changeColor {
  0%,
  100% {
    color: white;
  }
  50% {
    color: var(--primary);
  }
}

.nav-items {
  transition-duration: 0.3s;
  border-radius: 5px;
  border-width: 2px;
  border-color: transparent;

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
}
</style>
<script lang="ts">
export default {
  props: ['user'],
  methods: {

    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
  }
}
</script>
