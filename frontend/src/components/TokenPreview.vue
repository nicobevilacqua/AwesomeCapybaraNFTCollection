<script setup lang="ts">
  import { Token } from '../composition/token';

  const props = defineProps<{
    token: Token;
  }>();
</script>

<template>
  <div class="max-w-sm rounded-xl border px-4 py-6 md:p-10 shadow bg-white">
    <div class="text-center pb-5 uppercase font-semibold">
      {{ token.name }}
    </div>
    <img class="w-full rounded" :src="token.image" />
    <div class="pt-5 pb-1 font-semibold">Description:</div>
    <div class="pb-5 pt-1">{{ token.description }}</div>
    <a :href="token.openSeaUrl" class="text-blue-400 underline"
      >See at OpenSea</a
    >
  </div>
</template>
