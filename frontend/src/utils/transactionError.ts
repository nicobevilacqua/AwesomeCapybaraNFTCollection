import { TransactionError } from '../types/TransactionError';
import { ERRORS, TRANSACTION_ERROR_CODES } from '../constants';

export function getTransactionErrorMessage(response: TransactionError) {
  const { code, error, data } = response;
  if (code === TRANSACTION_ERROR_CODES.REJECTED_BY_USER) {
    return ERRORS.TRANSACTION_REJECTED_BY_USER;
  }

  if (code === TRANSACTION_ERROR_CODES.PENDING) {
    return ERRORS.TRANSACTION_WAITING_FOR_APPOVAL;
  }

  if (error) {
    return error.message;
  }

  if (data) {
    return data.message;
  }

  console.error(response);
  return ERRORS.TRANSACTION_FAILED;
}
