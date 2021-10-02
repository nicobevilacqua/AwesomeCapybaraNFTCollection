import { ref } from 'vue';
import * as alert from './alert';

import { ERRORS, ALERT_TYPES, MESSAGES } from '../constants';

export const waiting = ref(false);
export const running = ref(false);

async function _doTransaction(transactionPromise: Promise<any>) {
  alert.hide();

  try {
    const tx = await transactionPromise;

    waiting.value = true;

    const receipt = await tx.wait();

    if (receipt.status === 0) {
      alert.show(ERRORS.TRANSACTION_FAILED, ALERT_TYPES.ERROR);
    } else {
      alert.show(MESSAGES.TRANSACTION_COMPLETED, ALERT_TYPES.SUCCESS);
    }

    return receipt;
  } catch (error: any) {
    alert.showTransactionError(error);
  } finally {
    waiting.value = false;
  }
}

export async function doTransaction(transactionPromise: Promise<any>) {
  if (running.value) {
    return;
  }

  running.value = true;
  const receipt = await _doTransaction(transactionPromise);
  running.value = false;

  return receipt;
}
