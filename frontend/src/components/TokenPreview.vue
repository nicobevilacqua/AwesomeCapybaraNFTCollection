<script lang="ts">
  import { defineComponent } from 'vue';
  import Spinner from './Spinner.vue';

  export default defineComponent({
    name: 'TokenPreview',

    components: {
      Spinner,
    },

    props: {
      token: {
        type: Object,
        required: true,
      },
    },

    data: () => ({
      loading: true,
      loaded: false,
    }),
  });
</script>

<template>
  <div
    class="w-full max-w-sm rounded-xl border px-4 py-6 md:p-10 shadow bg-white"
  >
    <div class="text-center pb-5 uppercase font-semibold">
      {{ token.name }}
    </div>
    <div class="w-full rounded bg-gray-100">
      <img
        v-show="loaded"
        class="w-full rounded relative"
        @load="
          loading = false;
          loaded = true;
        "
        :src="token.image"
      />
      <div
        v-if="loading"
        class="
          relative
          top-0
          left-0
          right-0
          bottom-0
          w-full
          p-24
          rounded
          bg-gray-100
          flex
          items-center
          justify-center
        "
      >
        <Spinner class="w-8" />
      </div>
    </div>
    <p class="pt-1 text-gray-500" v-if="loading">
      This can take a while. Please, wait.
    </p>
    <div class="pt-5 pb-1 font-semibold">Description:</div>
    <div class="pb-5 pt-1">{{ token.description }}</div>
    <a :href="token.openSeaUrl" class="text-blue-400 underline"
      >See at OpenSea</a
    >
  </div>
</template>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
