<template>
  <transition name="fade">
    <div
      v-if="show"
      class="
        flex flex-row
        items-center
        text-white
        px-3
        sm:px-6
        py-4
        border-0
        fixed
        bottom-0
        left-0
        right-0
        z-50
        m-1
        sm:mb-4 sm:ml-2 sm:mr-2
        rounded
      "
      :class="alertClasses"
    >
      <span class="text-xl inline-block mr-2 sm:mr-5 align-middle">
        <font-awesome-icon icon="bell" />
      </span>
      <span
        class="
          inline-block
          align-middle
          mr-4
          sm:mr-8
          text-sm
          sm:text-base
          overflow-ellipsis overflow-hidden
          flex-1
        "
      >
        <b class="capitalize hidden sm:inline" v-if="showError">Error:</b>
        {{ message }}
      </span>
      <button
        class="
          bg-transparent
          text-2xl
          font-semibold
          leading-none
          mr-1
          sm:mr-3
          p-1
          outline-none
          focus:outline-none
          pointer
          overflow-ellipsis overflow-hidden
        "
        @click="hideAlert"
      >
        <span>×</span>
      </button>
    </div>
  </transition>
</template>

<script lang="ts">
  import { ALERT_TYPES } from '../constants';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Alert',

    data: () => ({
      show: false,
      message: null as null | string,
      timeout: null as any,
      type: ALERT_TYPES.ERROR,
    }),

    computed: {
      showError() {
        return this.type === ALERT_TYPES.ERROR;
      },

      alertClasses() {
        return {
          'bg-red-500': this.type === ALERT_TYPES.ERROR,
          'bg-yellow-500': this.type === ALERT_TYPES.WARNING,
          'bg-green-500': this.type === ALERT_TYPES.SUCCESS,
        };
      },
    },

    methods: {
      showAlert(message: string, type = ALERT_TYPES.ERROR) {
        clearTimeout(this.timeout);
        this.message = message;
        this.type = type;
        this.show = true;
        this.timeout = setTimeout(this.hideAlert, 5000);
      },

      hideAlert() {
        clearTimeout(this.timeout);
        this.show = false;
        this.type = ALERT_TYPES.ERROR;
        this.message = null;
      },
    },
  });
</script>

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
