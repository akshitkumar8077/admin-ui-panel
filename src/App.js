import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MembersTable from "./components/MembersTable";
import noData from "./assets/No_data.png";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [members, setMembers] = useState(null);
  const [filteredMembers, setFilteredMembers] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);
    return await axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((response) => {
        setLoading(false);
        setIsError(false);
        setMembers(response.data.map((row) => ({ ...row, isChecked: false })));
      })
      .catch((error) => {
        setLoading(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (searchString?.length > 0) {
      setFilteredMembers(
        members?.filter((member) => {
          if (
            member.name?.toLowerCase().includes(searchString.toLowerCase()) ||
            member.email?.toLowerCase().includes(searchString.toLowerCase()) ||
            member.role?.toLowerCase().includes(searchString.toLowerCase())
          ) {
            return member;
          }
        })
      );
    } else {
      setFilteredMembers(members);
    }
  }, [searchString, members]);

  const handleCheck = (id) => {
    let tempMembers = [...members];
    tempMembers.forEach((member) => {
      if (member.id === id) {
        member.isChecked = !member.isChecked;
      }
    });
    setMembers(tempMembers);
  };

  const handleDelete = (id) => {
    let tempMembers = [...members];
    tempMembers = tempMembers.filter((member) => member.id !== id);
    setMembers(tempMembers);
  };

  const handleDeleteSelected = () => {
    let tempMembers = [...members];
    tempMembers = tempMembers.filter((member) => !member.isChecked);
    setMembers(tempMembers);
  };

  const handleEdit = (row) => {
    let tempMembers = [...members];
    tempMembers = tempMembers.map((member) => {
      if (member.id === row.id) {
        return Object.assign(member, row);
      }
      return member;
    });
    setMembers(tempMembers);
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          className="search-box"
          name="search"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search User By Name, Email or Role"
          style={{
            fontWeight: "800",
            borderRadius: "10px",
            backgroundColor: "whitesmoke",
          }}
        />
      </div>
      {isLoading ? (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
      ) : isError ? (
        <div className="fallback">
          Unable to fetch the data, try again later...
          <div className="fallback-img-container">
            <img className="fallback-img" src={noData} />
          </div>
        </div>
      ) : (
        filteredMembers && (
          <MembersTable
            members={filteredMembers}
            onCheck={handleCheck}
            onDelete={handleDelete}
            onDeleteSelected={handleDeleteSelected}
            onEdit={handleEdit}
          />
        )
      )}
    </div>
  );
}

export default App;
