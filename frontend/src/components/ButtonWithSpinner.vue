<template>
  <button
    type="button"
    class="
      inline-flex
      items-center
      justify-center
      py-2
      px-10
      w-full
      md:w-auto
      text-center
      border border-transparent
      text-base
      leading-6
      font-xs
      rounded-md
      text-white
      hover:shadow-md
      transition
      ease-in-out
      duration-150
      max-w-xs
    "
    :class="{ 'cursor-not-allowed': loading || disabled }"
    :disabled="loading || disabled"
  >
    <Spinner v-if="loading" class="text-white h-5 w-5" />
    {{ loading ? loadingText : text }}
  </button>
</template>

<script lang="ts">
  import Spinner from './Spinner.vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ButtonWithSpinner',

    components: {
      Spinner,
    },

    props: {
      disabled: {
        type: Boolean,
        default: false,
      },

      loading: {
        type: Boolean,
        default: false,
      },

      loadingText: {
        type: String,
        default: 'Loading',
      },

      text: {
        type: String,
      },
    },
  });
</script>
