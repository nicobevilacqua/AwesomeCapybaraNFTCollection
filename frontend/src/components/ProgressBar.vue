<template>
  <div
    id="progress-bar"
    class="overflow-hidden h-1 text-xs flex bg-red-200 animate-pulse"
    v-if="progress > 0 && progress < 100"
  >
    <div
      id="current-progress"
      :style="{
        width: `${progress}%`,
      }"
      class="
        shadow-none
        flex flex-col
        text-center
        whitespace-nowrap
        text-white
        justify-center
        bg-red-500
        transition-all transition-slowest
        ease
      "
    ></div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ProgressBar',

    props: {
      running: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      progress: 0,
      interval: null,
    }),

    watch: {
      running() {
        if (!this.running) {
          clearInterval(this.interval);
          this.progress = 0;
          return;
        }

        this.progress = 10;

        this.interval = setInterval(() => {
          if (this.progress + 10 >= 100) {
            return;
          }
          this.progress = this.progress + 10;
        }, 1500);
      },
    },
  });
</script>
