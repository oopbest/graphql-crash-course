import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import Card from "./Card";
import { GET_USER_AND_TRANSACTIONS } from "../graphql/queries/user.query";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";

const Cards = () => {
  const { data, loading } = useQuery(GET_TRANSACTIONS);

  const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);
  const { data: userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
    variables: {
      userId: authUserData.authUser._id,
    },
  });
  console.log("userAndTransactions:", userAndTransactions);

  return (
    <div className="w-full px-10 min-h-[40vh] text-white">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20 ">
        {!loading &&
          data.transactions.map((transaction) => (
            <Card
              key={transaction._id}
              transaction={transaction}
              authUser={authUserData.authUser}
            />
          ))}
      </div>
      {!loading && data.transactions.length === 0 && (
        <p className="text-2xl font-bold text-center">No transactions found</p>
      )}
    </div>
  );
};
export default Cards;
