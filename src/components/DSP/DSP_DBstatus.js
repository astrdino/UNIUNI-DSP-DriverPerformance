import DBstatus from "../utility/DBStatus";

export const DSP_DBstatus = () => {
  return (
    <div className="DSP-DBstatus-DLR">
      <h3>Last Data Refreshed</h3>
      <DBstatus />
    </div>
  );
};
