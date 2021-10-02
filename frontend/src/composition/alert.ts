import { Ref, ref } from 'vue';

import { ALERT_TYPES, ERRORS } from '../constants';
import { TransactionError } from '../types/TransactionError';
import { getTransactionErrorMessage } from '../utils/transactionError';

export const shown = ref(false);

export const message: Ref<null | string> = ref(null);

export const type = ref(ALERT_TYPES.ERROR);

let timeout: any = null;

export function show(
  _message: string = ERRORS.DEFAULT,
  _type = ALERT_TYPES.ERROR
) {
  clearTimeout(timeout);
  message.value = _message;
  type.value = _type;
  shown.value = true;
  timeout = setTimeout(hide, 5000);
}

export function hide() {
  clearTimeout(timeout);
  shown.value = false;
  type.value = ALERT_TYPES.ERROR;
  message.value = null;
}

export function showTransactionError(error: TransactionError) {
  const errorMessage = getTransactionErrorMessage(error);
  show(errorMessage, ALERT_TYPES.ERROR);
}
