import React, { useEffect, useState } from "react";
import "./MembersTable.css";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MemberRow = ({
  row,
  onRowCheck,
  onRowDelete,
  onRowEdit,
  onClickEdit,
  token,
}) => {
  const initialValues = { ...row };
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState(initialValues);

  useEffect(() => {
    setEditedValues(row);
  }, [row]);

  useEffect(() => {
    token === row.id ? setEditMode(true) : setEditMode(false);
  }, [token, row.id]);

  const handleCheck = () => onRowCheck(row.id);

  const handleDelete = () => onRowDelete(row.id);

  const handleEdit = (e) => {
    if (editMode) {
      const { name, value } = e.target;
      setEditedValues({
        ...editedValues,
        [name]: value,
      });
    }
  };

  const handleCancel = () => {
    setEditedValues(initialValues);
    setEditMode(false);
    onClickEdit(null);
  };

  const handleSave = () => {
    onRowEdit(editedValues);
    setEditMode(false);
    onClickEdit(null);
  };

  const handleEditMode = () => {
    onClickEdit(row.id);
  };

  return (
    <tr className={row.isChecked ? "selected" : ""}>
      <td>
        <input
          type="checkbox"
          onChange={handleCheck}
          checked={row.isChecked ? "checked" : ""}
        />
      </td>
      <td>
        <div className="inp-wrapper">
          <input
            className={`data${row.isChecked ? " selected" : ""}${
              editMode ? " editable" : " view"
            }`}
            name="name"
            value={editedValues.name}
            onChange={handleEdit}
          />
        </div>
      </td>
      <td>
        <div className="inp-wrapper">
          <input
            className={`data${row.isChecked ? " selected" : ""}${
              editMode ? " editable" : " view"
            }`}
            name="email"
            value={editedValues.email}
            onChange={handleEdit}
          />
        </div>
      </td>
      <td>
        <div className="inp-wrapper">
          <input
            className={`data${row.isChecked ? " selected" : ""}${
              editMode ? " editable" : " view"
            }`}
            name="role"
            value={editedValues.role}
            onChange={handleEdit}
          />
        </div>
      </td>
      <td>
        <div className="actions">
          {editMode ? (
            <>
              <span className="material-icons action-icon" onClick={handleSave}>
                Save
              </span>
              <span
                className="material-icons action-icon"
                onClick={handleCancel}>
                Close
              </span>
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faEdit}
                color="blue"
                style={{
                  marginLeft: "3rem",
                  marginRight: "2rem",
                  cursor: "pointer",
                }}
                onClick={handleEditMode}
              />
              <FontAwesomeIcon
                icon={faTrash}
                color="red"
                style={{
                  cursor: "pointer",
                }}
                onClick={handleDelete}
              />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default MemberRow;
