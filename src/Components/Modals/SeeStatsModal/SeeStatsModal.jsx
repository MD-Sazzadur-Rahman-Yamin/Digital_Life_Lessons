import React from "react";

import { format } from "date-fns";
const SeeStatsModal = ({ modalRef, modalData }) => {
    
  const createdAt = modalData?.createdAt
    ? format(new Date(modalData.createdAt), "dd/MM/yyyy")
    : "N/A";

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h2 className="text-center">Stats</h2>
        <div className="flex justify-center items-center">
          <div className="stats stats-vertical sm:stats-horizontal">
            <div className="stat">
              <div className="stat-title">Created Date</div>
              <div className="stat-value">{createdAt}</div>
              {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
            </div>

            <div className="stat">
              <div className="stat-title">Likes count</div>
              <div className="stat-value">{modalData?.likesCount}</div>
              {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
            </div>

            <div className="stat">
              <div className="stat-title">Favorites</div>
              <div className="stat-value">{modalData?.favoritesCount}</div>
              {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
            </div>
          </div>
        </div>
        <div className="modal-action justify-center sm:justify-end">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-secondary">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SeeStatsModal;
