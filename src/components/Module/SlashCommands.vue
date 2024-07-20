<script lang="ts">
import EmbedViewer from '@/components/Utils/EmbedViewer.vue'
import EmbedPopup from '@/components/Utils/EmbedPopup.vue'
import { API } from '@/script/api'

export default {
  components: { EmbedPopup, EmbedViewer },
  props: ['commandsName', 'commandsData', 'bot'],
  data() {
    return {
      active: null,
      activeData: null,
      openPopup: null
    }
  },
  methods: {
    getCommand(name) {
      return this.commandsData.filter((x) => x.command_name === name)
    },
    async saveData(new_data) {
      const index2 = this.activeData.findIndex(
        (x) => x.module_id === new_data.module_id && x.name === new_data.name
      )
      this.activeData[index2] = new_data

      await API.modules.slash_commands.update(
        this.$route.params.id,
        this.$route.meta.module_id,
        replaceEmptyStringsWithNull(new_data)
      )
      this.openPopup = false

      function replaceEmptyStringsWithNull(obj) {
        if (typeof obj !== 'object' || obj === null) return obj
        for (let key in obj) {
          if (obj[key] === '') {
            obj[key] = null
          } else {
            replaceEmptyStringsWithNull(obj[key])
          }
        }
        return obj
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-6" v-for="commandName of commandsName" :key="commandName">
    <div class="p-2 text-xl flex gap-2 bg-dark items-center rounded-md border-l-primary border-l-8"

         @click="
          () =>
            active === commandName
              ? ((active = null), (activeData = null))
              : ((active = commandName), (activeData = getCommand(commandName)))
        "
    >
      <span
        :class="active === commandName ? 'rotate-90' : ''"
        class="select-none material-symbols-outlined w-10 text-center text-[48px] cursor-pointer hover:rotate-90 duration-300"
        >chevron_right</span
      >
      <p>/{{ commandName }}</p>
    </div>
    <Transition name="fading">
      <div v-if="active === commandName" class="p-2 flex flex-col gap-6">
        <div v-for="data in activeData" :key="data">
          <div class="p-5 flex flex-col gap-3 bg-light-grey rounded-md">
            <div class="flex gap-2">
              <p>Embed :</p>
              <pre>{{ data.name }}</pre>
              <span
                @click="openPopup = data.name"
                class="material-symbols-outlined ml-auto cursor-pointer hover:text-primary"
                >edit</span
              >
            </div>
            <EmbedViewer :data="data" />
          </div>
          <EmbedPopup
            @save_data="saveData"
            @close="openPopup = null"
            v-if="openPopup == data.name"
            :data="data"
            :bot="bot"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>
