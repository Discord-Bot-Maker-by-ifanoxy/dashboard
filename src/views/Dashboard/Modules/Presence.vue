<script lang="ts">
import { watch } from 'vue'
import Savebar from '@/components/Utils/savebar.vue'
import { API } from '@/script/api'

export default {
  components: { Savebar },
  props: ['module', 'bot'],
  async created() {
    this.value =
      (await API.modules.presence.get(this.$route.params.id, this.$route.meta.module_id))
        ?.data[0] ?? null

    this.resetData()
  },
  data() {
    return {
      value: null,
      new_value: null,
      saved: true
    }
  },
  methods: {
    deepEqual(x, y) {
      return x && y && typeof x === 'object' && typeof y === 'object'
        ? Object.keys(x).length === Object.keys(y).length &&
            Object.keys(x).reduce((isEqual, key) => {
              return isEqual && this.deepEqual(x[key], y[key])
            }, true)
        : x === y
    },
    async saveData() {
      await API.modules.presence.update(
        this.$route.params.id,
        this.$route.meta.module_id,
        this.new_value
      )
      this.saved = true
      this.value = { ...this.new_value }
    },
    resetData() {
      this.new_value = { ...this.value }
      this.saved = true
      watch(this.new_value, () => {
        this.saved = this.deepEqual(this.value, this.new_value)
      })
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 grow" v-if="new_value">
    <div class="flex flex-col gap-4">
      <p class="text-xl font-bold">Name of the presence</p>
      <input
        :value="new_value.description"
        @input="(x) => (new_value.description = x.target.value)"
        class="h-12 w-full bg-dark rounded-md px-4 focus:border-none focus:outline-none"
      />
    </div>
    <div class="flex gap-6">
      <div class="flex flex-col grow gap-4">
        <p class="text-xl font-bold">State</p>
        <select
          @change="(x) => (new_value.status = x.target.selectedOptions[0].value)"
          class="border-none focus:ring-0 h-12 w-full bg-dark rounded-md px-4"
        >
          <option :selected="new_value.status == 'online'" value="online">Online</option>
          <option :selected="new_value.status == 'dnd'" value="dnd">Do not Distribute</option>
          <option :selected="new_value.status == 'idle'" value="idle">AFK</option>
          <option :selected="new_value.status == 'invisible'" value="invisible">Invisible</option>
        </select>
      </div>
      <div class="flex flex-col grow gap-4">
        <p class="text-xl font-bold">Type</p>
        <select
          @change="(x) => (new_value.type = Number(x.target.selectedOptions[0].value))"
          class="border-none focus:ring-0 cursor-pointer h-12 w-full bg-dark rounded-md px-4"
        >
          <option :selected="new_value.type == 0" value="0">Playing</option>
          <option :selected="new_value.type == 1" value="1">Streaming</option>
          <option :selected="new_value.type == 2" value="2">Listening</option>
          <option :selected="new_value.type == 3" value="3">Watching</option>
          <option :selected="new_value.type == 4" value="4">Custom</option>
          <option :selected="new_value.type == 5" value="5">Competing</option>
        </select>
      </div>
    </div>
    <savebar @saved="saveData" @canceled="resetData" v-if="!saved" />
  </div>
</template>

<style scoped></style>
