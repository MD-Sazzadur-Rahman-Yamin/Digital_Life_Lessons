import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UpgradeSuccessful = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [transactionId, setTransactionId] = useState(null);
  useEffect(() => {
    //varify payment
    if (sessionId) {
      axiosSecure
        .patch(`/payments/payment-success?session_id=${sessionId}`)
        .then((res) => {
          if (res.data.modifiedCount) {
            toast("Payment Verifyed");
          }
          setTransactionId(res.data.transactionId);
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen">
      <h2>Upgrade Successful</h2>
      <p>Transaction ID:{transactionId}</p>
      <Link to="/">
        <button className="btn btn-primary">Go Home</button>
      </Link>
    </div>
  );
};

export default UpgradeSuccessful;
