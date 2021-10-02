<template>
  <nav
    class="
      w-full
      py-3
      md:py-4
      px-3
      md:px-4
      shadow-md
      border
      flex
      justify-between
      text-sm
    "
  >
    <div
      v-if="network.valid.value && network.current.value"
      class="
        bg-blue-500
        hover:bg-blue-600
        px-4
        py-2
        rounded
        shadow
        hover:shadow-md
        font-semibold
        max-w-xs
        mr-1
        capitalize
        text-white
      "
    >
      {{ network.current.value.name }}
    </div>
    <ButtonWithSpinner
      v-else
      class="bg-blue-500 hover:bg-blue-600"
      :loading="network.switching.value"
      loadingText="Switching"
      @click="network.switchToValid"
      :text="`Switch to ${network.expected.name}`"
    />
    <div
      v-if="wallet.address.value"
      class="
        bg-green-500
        hover:bg-green-600
        px-4
        py-2
        rounded
        shadow
        hover:shadow-md
        font-semibold
        overflow-ellipsis overflow-hidden
        max-w-xs
        ml-1
        text-white
        shadow-inner
      "
    >
      {{ wallet.address.value }}
    </div>

    <ButtonWithSpinner
      v-else-if="appReady"
      class="bg-green-500 hover:bg-green-600"
      :loading="wallet.connecting.value"
      loadingText="Connecting"
      @click="wallet.connect"
      text="Connect Wallet"
    />
  </nav>
</template>

<script lang="ts">
  import ButtonWithSpinner from './ButtonWithSpinner.vue';
  import { defineComponent } from 'vue';

  import * as network from '../composition/network';
  import * as wallet from '../composition/wallet';

  export default defineComponent({
    name: 'Nav',

    components: {
      ButtonWithSpinner,
    },

    setup() {
      return { network, wallet };
    },

    props: {
      appReady: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>
