<script setup lang="ts">
  import { defineComponent, ref } from 'vue';

  import { ethers } from 'ethers';

  import detectEthereumProvider from '@metamask/detect-provider';

  import {
    NETWORKS,
    TRANSACTION_ERROR_CODES,
    ERRORS,
    ALERT_TYPES,
    MESSAGES,
  } from './constants';

  const isProd = !!import.meta.env.PROD;

  import { address as contractAddress, abi as contractAbi } from '@contract';

  const { ethereum } = window;

  const validNetwork = ref(false);
  const address = ref(false);
</script>

<template>
  <div id="app" class="flex flex-col h-screen">
    <nav class="w-full py-4 px-4 shadow flex justify-between text-sm">
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
        Rinkeby
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
      >
        Change To Rinkeby
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
        0xa78252c65344e34b098308fc62fe77cba9eb1927
      </div>

      <button
        v-else
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
      >
        Connect Wallet
      </button>
    </nav>
    <main class="container mx-auto flex flex-col py-12 flex-grow items-center">
      <h1 class="text-3xl font-semibold mb-6">
        Awesome Capybara NFT Collection
      </h1>
      <p class="text-md">Claim your own Capybara NFT today!</p>
      <button
        class="
          my-6
          px-12
          bg-blue-700
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
        Claim NFT
      </button>
      <button
        type="button"
        class="
          inline-flex
          items-center
          px-4
          py-2
          border border-transparent
          text-base
          leading-6
          font-medium
          rounded-md
          text-white
          bg-blue-600
          hover:bg-rose-500
          focus:border-rose-700
          active:bg-rose-700
          transition
          ease-in-out
          duration-150
          cursor-not-allowed
        "
        disabled=""
      >
        Claiming...
      </button>
      <div
        class="
          bg-red-100
          border border-red-400
          text-red-700
          px-4
          py-3
          my-6
          rounded
          relative
          full-w
        "
        role="alert"
      >
        <strong class="font-bold">Holy smokes!</strong>
        <span class="block sm:inline">Something seriously bad happened.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            class="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
          </svg>
        </span>
      </div>
    </main>
    <footer class="w-full border-t bg-white flex justify-center py-4">
      You can find the source code&nbsp;
      <a
        class="underline block"
        href="https://github.com/nicobevilacqua/AwesomeCapybaraNFTCollection"
        >here</a
      >
    </footer>
  </div>
</template>
