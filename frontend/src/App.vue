<script setup lang="ts">
  import { defineComponent } from 'vue';

  import { ethers } from 'ethers';

  import detectEthereumProvider from '@metamask/detect-provider';

  import { NETWORKS, TRANSACTION_ERROR_CODES, ERRORS, ALERT_TYPES, MESSAGES } from './constants';

  const isProd = !!import.meta.env.PROD;

  import { address as contractAddress, abi as contractAbi } from '@contract';

  const { ethereum } = window;
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>
