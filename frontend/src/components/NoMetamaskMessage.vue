<script setup lang="ts">
  function reload() {
    window.location.reload();
  }
</script>

<template>
  <div
    class="
      flex flex-col
      items-center
      text-center text-1xl
      flex-grow
      py-10
      text-gray-600
    "
  >
    <p class="py-2">Our capybara boss is sad :(.</p>
    <p class="py-2">
      You need
      <a
        href="https://metamask.io"
        class="underline text-blue-500 font-semibold"
        >Metamask</a
      >
      to interact with this app.
    </p>
    <p class="py-2">
      Please, install it and
      <button class="underline" @click="reload">refresh</button>
      the page.
    </p>
    <div class="max-w-md rounded-xl border my-4 p-4 shadow bg-white">
      <img src="/sad.jpeg" alt="Sad Capybara" />
    </div>
  </div>
</template>
