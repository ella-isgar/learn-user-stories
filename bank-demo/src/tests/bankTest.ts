import { Bank } from "../bank";

// to test: npx ts-node tests.bankTest.ts

const accounts = [
  { account_owner: "user1", id: 1234567890, balance: 5000 },
  { account_owner: "user2", id: 1234567891, balance: 10000 },
];

const usernames = ["user1", "user2"];

const bank = new Bank(accounts, usernames);

// ISSUE #1
console.log("Issue #1");

// Senario 1:
var issue1_1_passed = true;
const acc1 = bank.createAccount("user1", 20, 1234567892);
if (
  acc1.id !== 1234567892 ||
  acc1.balance !== 0 ||
  acc1.id.toString().length !== 10
) {
  issue1_1_passed = false;
}

try {
  bank.createAccount("user1", 20, 1234567892);
  issue1_1_passed = false;
} catch (e) {}

if (issue1_1_passed) {
  console.log("Issue #1's Scenario 1 test passed.");
} else {
  console.log("Issue #1's Scenario 1 test failed.");
}

// Scenario 2:
var issue1_2_passed = true;
try {
  bank.createAccount("user1", 17, 1234567899);
  issue1_2_passed = false;
} catch (e) {}

if (issue1_2_passed) {
  console.log("Issue #1's Scenario 2 test passed.");
} else {
  console.log("Issue #1's Scenario 2 test failed.");
}

// Scenario 3:
var issue1_3_passed = true;
try {
  bank.createAccount("user3", 20, 1234567888);
  issue1_3_passed = false;
} catch (e) {}

if (issue1_3_passed) {
  console.log("Issue #1's Scenario 3 test passed.");
} else {
  console.log("Issue #1's Scenario 3 test failed.");
}

// ISSUE #2 - Deposit money into an existing customer’s account.
console.log("\nIssue #2");
/**
 * Scenario 1: successful deposit
 *      Given the user has a verified username and provides a valid account
 *      When they attempt to deposit funds
 *      The user’s account balance is updated with the given funds.
 */
var issue2_1_passed = true;
if (bank.checkBalance("user2", 1234567891) !== 10000) {
  issue2_1_passed = false;
}

if (bank.depositMoney("user2", 1234567891, 1000) !== 11000) {
  issue2_1_passed = false;
}

if (issue2_1_passed) {
  console.log("Issue #2's Scenario 1 test passed.");
} else {
  console.log("Issue #2's Scenario 1 test failed.");
}

/**
 * Scenario 2: unsuccessful deposit due to invalid account
 *      Given the user has a verified username but does not provide a valid account
 *      When they attempt to deposit funds
 *      Then no funds are deposited and an error message is displayed
 */
var issue2_2_passed = true;

try {
  bank.depositMoney("user2", 1111111111, 1000);
  issue2_2_passed = false;
} catch (e) {}

if (issue2_2_passed) {
  console.log("Issue #2's Scenario 2 test passed.");
} else {
  console.log("Issue #2's Scenario 2 test failed.");
}

/**
 * Scenario 3: unsuccessful deposit due to invalid username
 *      Given the user does not have a verified username
 *      When they attempt to deposit funds
 *      Then no funds are deposited and an error message is displayed
 */
var issue2_3_passed = true;

try {
  bank.depositMoney("user3", 1234567890, 1000);
  issue2_3_passed = false;
} catch (e) {}

if (issue2_3_passed) {
  console.log("Issue #2's Scenario 3 test passed.");
} else {
  console.log("Issue #2's Scenario 3 test failed.");
}

/**
 * Scenario 4: unsuccessful deposit due to invalid funds
 *      Given the user has a verified username and a valid account but is depositing invalid funds
 *      When they attempt to deposit negative funds
 *      Then no funds are deposited and an error message is displayed
 */
var issue2_4_passed = true;

try {
  bank.depositMoney("user2", 1234567891, -1000);
  issue2_4_passed = false;
} catch (e) {}

if (issue2_4_passed) {
  console.log("Issue #2's Scenario 4 test passed.");
} else {
  console.log("Issue #2's Scenario 4 test failed.");
}

// ISSUE #4 - Check the balance of an existing customer’s account.

/**
 * Scenario 1: successful check
 * Given the user has a verified username and a valid account
 * When they attempt to check the account’s balance
 * The user’s current account balance is displayed.
 */

/**
 * Scenario 2: unsuccessful check due to invalid account
 * Given the user has a verified username but does not provide a valid account
 * When they attempt to check the account’s balance
 * Then no account balance is displayed and an error message is displayed
 */

/**
 * Scenario 3: unsuccessful check due to invalid username
 * Given the user does not have a verified username
 * When they attempt to check the account’s balance
 * Then no account balance is displayed and an error message is displayed
 */
