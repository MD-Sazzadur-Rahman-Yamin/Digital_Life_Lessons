import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Upgrade = () => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleUpgrade = async () => {
    setPaymentLoading(true);
    const paymentInfo = {
      customer_email: user.email,
      metadata: { customer_name: user.displayName },
    };
    const res = await axiosSecure.post(
      "/payments/create-checkout-session/digital-life-lessons-premium",
      paymentInfo
    );
    console.log(res.data);
    setPaymentLoading(false);
    window.location.href = res.data.url;
  };
  return (
    <div className="section">
      <div className="p-4 text-center">
        <h1 className="text-2xl font-semibold mb-2">Upgrade your plan</h1>
        <p className="text-sm opacity-80 mb-4">
          Clear comparison of features — choose what fits you.
        </p>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="text-center">Free</th>
                <th className="text-center">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Number of lessons</td>
                <td className="text-center">
                  <span className="badge badge-success">5</span>
                </td>
                <td className="text-center">
                  <span className="badge badge-primary">Unlimited</span>
                </td>
              </tr>
              <tr>
                <td>Premium lesson creation</td>
                <td className="text-center">
                  <span className="badge badge-ghost">No</span>
                </td>
                <td className="text-center">
                  <span className="badge badge-primary">Yes</span>
                </td>
              </tr>
              <tr>
                <td>Ad-free experience</td>
                <td className="text-center">
                  <span className="badge badge-ghost">No</span>
                </td>
                <td className="text-center">
                  <span className="badge badge-primary">Yes</span>
                </td>
              </tr>
              <tr>
                <td>Priority listing</td>
                <td className="text-center">
                  <span className="badge badge-ghost">No</span>
                </td>
                <td className="text-center">
                  <span className="badge badge-primary">Yes</span>
                </td>
              </tr>
              <tr>
                <td>Downloadable resources</td>
                <td className="text-center">
                  <span className="badge badge-ghost">No</span>
                </td>
                <td className="text-center">
                  <span className="badge badge-primary">Yes</span>
                </td>
              </tr>
              <tr>
                <td>Community support</td>
                <td className="text-center">
                  <span className="badge badge-success">Yes</span>
                </td>
                <td className="text-center">
                  <span className="badge badge-primary">Yes</span>
                </td>
              </tr>
              <tr>
                <td>Access to quizzes & tests</td>
                <td className="text-center">
                  <span className="badge badge-success">Limited</span>
                </td>
                <td className="text-center">
                  <span className="badge badge-primary">Full</span>
                </td>
              </tr>
              <tr>
                <td>Certificate of completion</td>
                <td className="text-center">
                  <span className="badge badge-ghost">No</span>
                </td>
                <td className="text-center">
                  <span className="badge badge-primary">Yes</span>
                </td>
              </tr>

              <tr className="border-t">
                <td className="font-semibold">Price</td>
                <td className="text-center">Free</td>
                <td className="text-center">৳1500 / Lifetime</td>
              </tr>
              <tr>
                <td className="text-center" colSpan="3">
                  <button
                    className="btn w-full bg-[#FFD700] text-black! hover:brightness-90"
                    disabled={paymentLoading}
                    onClick={handleUpgrade}
                  >
                    {paymentLoading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Upgrade"
                    )}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
