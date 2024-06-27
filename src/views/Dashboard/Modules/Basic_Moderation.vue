<script lang="ts">
import { API } from '@/script/api'
import SlashCommands from '@/components/Module/SlashCommands.vue'

export default {
  components: { SlashCommands },
  props: ['module', 'bot'],
  async created() {
    this.commandsData =
      (await API.modules.slash_commands.get(this.$route.params.id, this.$route.meta.module_id))
        ?.data || []
    this.commandsName = [...new Set(this.commandsData.map((x) => x.command_name))]
  },
  data() {
    return {
      commandsData: null,
      commandsName: null
    }
  }
}
</script>

<template>
  <SlashCommands
    v-if="commandsData && commandsName"
    :commands-name="commandsName"
    :commands-data="commandsData"
  />
</template>

<style scoped></style>
