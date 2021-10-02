<script lang="ts">
  import { defineComponent } from 'vue';
  import ButtonWithSpinner from './ButtonWithSpinner.vue';
  import * as network from '../composition/network';

  export default defineComponent({
    components: {
      ButtonWithSpinner,
    },

    setup() {
      return { network };
    },
  });
</script>

<template>
  <div class="flex flex-col items-center">
    <img src="/logo.png" class="w-40 my-5" />
    <p class="">
      You need to switch to the {{ network.expected.name }} network
    </p>
    <ButtonWithSpinner
      class="bg-blue-500 hover:bg-blue-600 mt-5"
      :loading="network.switching.value"
      loadingText="Switching"
      @click="network.switchToValid"
      :text="`Switch to ${network.expected.name}`"
    />
  </div>
</template>
