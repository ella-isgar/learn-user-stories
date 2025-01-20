import { BankType, AccountType } from "./types";

/**
 * This class implements a bank that can maintain accounts
 * and create new accounts
 */
export class Bank implements BankType {
  private accounts: AccountType[] = [];
  private usernames: string[] = [];

  /**
   * The construcotr initialized the bank with accounts and usernames
   * @param accounts - arrary of accounts
   * @param usernames - arrary of usernames
   */
  public constructor(accounts: AccountType[], usernames: string[]) {
    this.accounts = accounts;
    this.usernames = usernames;
  }

  /**
   * Create a new account for the given user and add to list of bank's accounts.
   * @param username - the username of the owner of the account
   * @param age - the age of the user
   * @param accountNumber - the ten-digit unique id of the new account
   * @returns a new account with a ten-digit unique id and zero balance
   */
  createAccount(
    username: string,
    age: number,
    accountNumber: number
  ): AccountType {
    if (this.isAccountNumberInvalid(accountNumber)) {
      throw new Error("Invalid account number");
    }
    if (!this.doesUsernameExist(username)) {
      throw new Error("User not found");
    }
    if (age < 18) {
      throw new Error("User is under 18");
    }
    if (this.findAccountById(accountNumber)) {
      throw new Error("Account already exists");
    }
    const account: AccountType = {
      account_owner: username,
      id: accountNumber,
      balance: 0,
    };

    this.accounts.push(account);
    return account;
  }

  /**
   * Deposit the provided funds into the given account of the user.
   * @param username - the username of the owner of the account
   * @param accountNumber - the account number of the target account
   * @param to_deposit - the amount of $ to deposit that is >= 0
   * @returns the updated balance
   */
  depositMoney(
    username: string,
    accountNumber: number,
    to_deposit: number
  ): number {
    // 1. Verify username
    if (!this.doesUsernameExist(username)) {
      throw new Error("User not found");
    }

    // 2. Verify account (confirm account exists and given username is registered owner)
    const target_acc = this.findAccountById(accountNumber);

    if (!target_acc) {
      throw new Error("Account not found");
    } else if (target_acc.account_owner !== username) {
      throw new Error("Provided user is not the owner of given account.");
    }

    // 3. Valid funds to deposit
    if (to_deposit < 0) {
      throw new Error("Invalid funds to deposit");
    }

    // 4. Update balance
    target_acc.balance += to_deposit;

    return target_acc.balance;
  }

  /**
   * Grabs the balance of the given account of the user.
   * @param username - the username of the owner of the account
   * @param accountNumber - the account number of the target account
   * @returns the balance of the account
   */
  checkBalance(username: string, accountNumber: number): number {
    // 1. Verify username
    if (!this.doesUsernameExist(username)) {
      throw new Error("User not found");
    }

    // 2. Verify account (confirm account exists and given username is registered owner)
    const target_acc = this.findAccountById(accountNumber);

    if (!target_acc) {
      throw new Error("Account not found");
    } else if (target_acc.account_owner !== username) {
      throw new Error("Provided user is not the owner of given account.");
    }

    // 3. Return balance
    return target_acc.balance;
  }

  private findAccountById(id: number): AccountType | undefined {
    return this.accounts.find((account) => account.id === id);
  }

  private isAccountNumberInvalid(accountNumber: number): boolean {
    return accountNumber.toString().length !== 10;
  }

  private doesUsernameExist(username: string): boolean {
    return this.usernames.includes(username);
  }
}
