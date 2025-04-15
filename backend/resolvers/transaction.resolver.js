import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) {
          throw new Error("Unauthorized");
        }
        const userId = context.getUser()._id;

        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.log("Error in transactions resolver:", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    transaction: async (_, { transactionId }, context) => {
      try {
        if (!context.getUser()) {
          throw new Error("Unauthorized");
        }
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (error) {
        console.log("Error in transaction resolver:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const userId = context.getUser()._id;
        const newTransaction = await Transaction.create({ ...input, userId });
        return newTransaction;
      } catch (error) {
        console.log("Error in createTransaction resolver:", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (error) {
        console.log("Error in updateTransaction resolver:", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deletedTransaction;
      } catch (error) {
        console.log("Error in deleteTransaction resolver:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
};

export default transactionResolver;
