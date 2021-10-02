<script lang="ts">
  import { defineComponent } from 'vue';
  import ButtonWithSpinner from './ButtonWithSpinner.vue';
  import * as wallet from '../composition/wallet';

  export default defineComponent({
    name: 'AddressNotConnected',

    components: {
      ButtonWithSpinner,
    },

    setup() {
      return { wallet };
    },
  });
</script>

<template>
  <div class="flex flex-col items-center">
    <img src="/logo.png" class="w-40 my-5" />
    <p class="">You need to connect your address to the app</p>
    <ButtonWithSpinner
      class="bg-green-500 hover:bg-green-600 mt-5"
      :loading="wallet.connecting.value"
      loadingText="Connecting"
      @click="wallet.connect"
      text="Connect Wallet"
    />
  </div>
</template>
