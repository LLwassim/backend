const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import the User model
const Account = require("../models/Account");
const Transactions = require("../models/Transactions");
const Payees = require("../models/Payees");
const Loans = require("../models/Loans");
const CreditCards = require("../models/CreditCards");
const SecurityLog = require("../models/SecurityLog");
const CreditCardTransactions = require("../models/CreditCardTransactions");
const { v4: uuidv4 } = require("uuid"); // Import the UUID library

// Create a new user and ensure an associated account exists
router.post("/signup", async (req, res) => {
  try {
    const uniqueCustomerId = uuidv4(); // Generate a unique customer ID using UUID
    const uniqueAccountId = uuidv4();
    // Function to check if a card number already exists in the database
    const checkIfCardNumberExistsInDatabase = async (cardNumber) => {
      try {
        // Use Sequelize to check if the card number exists in the CreditCards table
        const existingCard = await CreditCards.findOne({
          where: { card_number: cardNumber },
        });

        // If an existing card is found, return true (it exists); otherwise, return false
        return !!existingCard;
      } catch (error) {
        // Handle any errors that might occur during the database query
        console.error("Error checking card number in the database:", error);
        return false; // You can choose how to handle errors in your application
      }
    };

    // Function to generate a unique card number
    const generateUniqueCardNumber = async () => {
      const cardNumberLength = 16;
      const characters = "0123456789";
      let cardNumber;

      while (true) {
        cardNumber = "";
        for (let i = 0; i < cardNumberLength; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          cardNumber += characters.charAt(randomIndex);
        }

        try {
          const exists = await checkIfCardNumberExistsInDatabase(cardNumber);
          if (!exists) {
            // If it doesn't exist, break the loop and return the card number
            break;
          }
        } catch (error) {
          // Handle any errors that might occur during the database query
          console.error("Error checking card number in the database:", error);
        }
      }
      console.log(cardNumber + " Should be equal to card number");
      return cardNumber;
    };

    // Example usage:
    const uniqueCardNumber = await generateUniqueCardNumber();
    console.log(uniqueCardNumber + " This is the Unique card number");

    function generateUniqueAccountNumber() {
      // You can use a prefix or identifier for your accounts (e.g., "ACC-").
      const prefix = "ACC-";

      // Generate a random number or use a unique ID as the account number.
      // For example, you can use a random number with a specified length.
      const randomPart = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");

      // Combine the prefix and the random part to create the account number.
      const accountNumber = `${prefix}${randomPart}`;

      return accountNumber;
    }

    // Check if the customer_id exists in the accounts table
    // Check if the customer_id exists in the below tables before inserting into users
    const existingAccount = await Account.findOne({
      where: { customer_id: uniqueCustomerId },
    });

    if (existingAccount) {
      // If an account with this customer_id exists, create the user
      const newUser = await User.create({
        ...req.body,
        customer_id: uniqueCustomerId,
      });
      res.json(newUser);
    } else {
      // If the account doesn't exist, create the account first
      const newAccount = await Account.create({
        account_id: uniqueAccountId,
        customer_id: uniqueCustomerId,
        account_number: generateUniqueAccountNumber(),
        balance: 0,
        account_type: "Savings",
        status: "Active",
        date_opened: new Date(),
      });

      // Insert a placeholder transaction with the account_id
      await Transactions.create({
        account_id: newAccount.account_id,
        transaction_type: "Account Created",
        amount: 0,
        date_time: new Date(),
        description: "New account created",
      });

      await Payees.create({
        customer_id: uniqueCustomerId,
        payee_name: "Payee for New User",
        // Set other columns to default values or placeholders
        account_number: "12345",
        bank_name: "Sample Bank",
        branch: "Sample Branch",
        description: "Placeholder for New User",
      });

      await Loans.create({
        customer_id: uniqueCustomerId, // Set the customer_id to associate the loan with a user
        loan_type: "Placeholder Loan", // Use a placeholder loan type
        amount: 0.0, // Set an initial amount (0 as a placeholder)
        interest_rate: 0.0, // Set an initial interest rate (0% as a placeholder)
        term: 0, // Set an initial term (0 months as a placeholder)
        status: "Pending", // Set an initial status (e.g., "Pending" as a placeholder)
        date_applied: new Date(), // Use the current date as a placeholder for the application date
        date_approved: null, // Leave date_approved as null initially
        date_paid: null, // Leave date_paid as null until it's paid
      });

      await SecurityLog.create({
        customer_id: uniqueCustomerId, // Set the customer_id to associate the log with a user
        action: "Placeholder Action", // Use a placeholder action
        date_time: new Date(), // Use the current date and time as a placeholder for the log entry
        IP_address: "0.0.0.0", // Use a placeholder IP address (e.g., "0.0.0.0")
        device_info: "Placeholder Device Info", // Use a placeholder device info
      });

      const newCreditCard = await CreditCards.create({
        customer_id: uniqueCustomerId, // Set the customer_id to associate the card with a user
        card_number: uniqueCardNumber, // Use a placeholder card number
        card_type: "Placeholder Card Type", // Use a placeholder card type
        credit_limit: 1000.0, // Set a placeholder credit limit
        outstanding_balance: 0.0, // Set a placeholder outstanding balance
        available_credit: 1000.0, // Set a placeholder available credit
        due_date: new Date(), // Use the current date as a placeholder due date
      });

      await CreditCardTransactions.create({
        card_id: newCreditCard.card_id,
        transaction_type: "Placeholder Transaction Type", // Use a placeholder transaction type
        amount: 0.0, // Set a placeholder amount
        date_time: new Date(), // Use the current date as a placeholder date and time
        description: "Placeholder Transaction Description", // Use a placeholder description
      });

      // Now, create the user with the generated customer_id
      const newUser = await User.create({
        ...req.body,
        customer_id: uniqueCustomerId,
      });

      res.json(newUser);
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add more routes for CRUD operations
// ...

module.exports = router;
