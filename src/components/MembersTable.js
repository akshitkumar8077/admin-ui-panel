import React, { useEffect, useState } from "react";
import MemberRow from "./MembersRow";
import "./MembersTable.css";
import Pagination from "./Pagination";
import noData from "../assets/No_data.png";

const MembersTable = ({
  members,
  onCheck,
  onDelete,
  onDeleteSelected,
  onEdit,
}) => {
  const maxItem = 10;
  const maxPageNumber = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [allCheckOnPage, setAllCheckOnPage] = useState(false);
  const [anyCheck, setAnyCheck] = useState(false);
  const [token, setToken] = useState(null);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(members?.length / maxItem)
  );
  const [data, setData] = useState(
    members.slice(
      (currentPage - 1) * maxItem,
      (currentPage - 1) * maxItem + maxItem
    )
  );

  const currentData = () => {
    const begin = (currentPage - 1) * maxItem;
    const end = begin + maxItem;
    setData(members.slice(begin, end));
  };

  useEffect(() => {
    currentData();
  }, [members, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages !== 0) {
      setCurrentPage(totalPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members?.length, totalPages]);

  useEffect(() => {
    setTotalPages(Math.ceil(members?.length / maxItem));
    setAnyCheck(members.reduce((i, member) => i || member.isChecked, false));
  }, [members]);

  useEffect(() => {
    setAllCheckOnPage(data.reduce((i, member) => i && member.isChecked, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, members, data]);

  const handleAllRowsCheck = (e) => {
    if (e.target.checked) data?.map((row) => !row.isChecked && onCheck(row.id));
    else data?.map((row) => row.isChecked && onCheck(row.id));
  };

  const handleRowCheck = (id) => onCheck(id);

  const handleRowDelete = (id) => onDelete(id);

  const handleDelete = () => onDeleteSelected();

  const handleRowEdit = (row) => onEdit(row);

  const handleEditLock = (id) => setToken(id);

  return (
    <>
      {members?.length > 0 ? (
        <div className="main-container">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={handleAllRowsCheck}
                      checked={
                        anyCheck ? (allCheckOnPage ? "checked" : "") : ""
                      }
                    />
                  </th>
                  <th>
                    <div className="data">NAME</div>
                  </th>
                  <th>
                    <div className="data">EMAIL</div>
                  </th>
                  <th>
                    <div className="data">ROLE</div>
                  </th>
                  <th>
                    <div className="data">ACTIONS</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((member) => (
                  <MemberRow
                    key={member.id}
                    row={member}
                    onRowCheck={handleRowCheck}
                    onRowDelete={handleRowDelete}
                    onRowEdit={handleRowEdit}
                    onClickEdit={handleEditLock}
                    token={token}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="footer">
            <button
              className={`del-btn${!anyCheck ? " disabled" : ""}`}
              disabled={!anyCheck ? "disabled" : ""}
              onClick={handleDelete}>
              Delete Selected Users
            </button>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                limit={maxPageNumber}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="fallback">
          No Data Found, Try Again
          <div className="fallback-img-container">
            <img className="fallback-img" src={noData} />
          </div>
        </div>
      )}
    </>
  );
};

export default MembersTable;
