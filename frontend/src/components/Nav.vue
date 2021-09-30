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
      v-if="validNetwork"
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
      {{ network.name }}
    </div>
    <button
      v-else
      type="button"
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
        shadow-inner
      "
      @click="$emit('switch-chain')"
    >
      Change To {{ expectedNetwork.name }}
    </button>
    <div
      v-if="address"
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
      {{ address }}
    </div>

    <button
      v-else-if="appReady"
      type="button"
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
      @click="$emit('connect-wallet')"
    >
      Connect Wallet
    </button>
  </nav>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Nav',

    props: {
      network: {
        type: Object,
        default: () => ({}),
      },

      address: {
        type: String,
        default: undefined,
      },

      appReady: {
        type: Boolean,
        default: false,
      },

      validNetwork: {
        type: Boolean,
        default: false,
      },

      expectedNetwork: {
        type: Object,
        required: true,
      },
    },
  });
</script>
