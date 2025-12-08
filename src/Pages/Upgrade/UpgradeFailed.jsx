import React from "react";
import { Link } from "react-router";

const UpgradeFailed = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen">
      <h2>Upgrade Failed</h2>
      <Link to="/upgrade">
        <button className="btn btn-primary">Go Upgrade</button>
      </Link>
      <Link to="/">
        <button className="btn btn-neutral">Go Home</button>
      </Link>
    </div>
  );
};

export default UpgradeFailed;
