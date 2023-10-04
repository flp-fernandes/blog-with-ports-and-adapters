/* eslint-disable @typescript-eslint/no-explicit-any */

import { DuplicateUserEmail } from '../../../util/error';

export type DataError = {
  code: string;
  errno: number;
  sqlState: string;
  sqlMessage: string;
  sql: string;
}

export const checkAndThrowUserError = (error: DataError) => {
  console.log('error :>> ', error.code);
  const {
    code
  } = error;

  if (code === 'ER_DUP_ENTRY') {
    throw new DuplicateUserEmail('Duplicate user email');
  }
};