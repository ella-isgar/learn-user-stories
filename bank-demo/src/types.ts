// types.ts

/**
 * This type defines the structure of an account.
 * The account_owner is the name of the username of the account holder.
 * The id is a ten-digit unique number.
 * The balance is the amount of money in the account. Upon initialization, the balance is zero.
 */
export type AccountType = {
  account_owner: string;
  id: number;
  balance: number;
};

export interface BankType {
  createAccount(
    username: string,
    age: number,
    accountNumber: number
  ): AccountType;

  depositMoney(
    username: string,
    accountNumber: number,
    to_deposit: number
  ): number;

  checkBalance(username: string, accountNumber: number): number;
}
