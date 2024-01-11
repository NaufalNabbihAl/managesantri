import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = ({ data }) => {
  const [selectedAttendance, setSelectedAttendance] = useState([]);
  const handleAttendanceChange = (event) => {
    const { name, value } = event.target;
    const id = event.target.name.split("_")[1];
    setSelectedAttendance({ ...selectedAttendance, [name]: { id, value } });
  };

  return (
    <div>
      <table className="table" border={1}>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Izin</th>
            <th>Alfa</th>
            <th>Sakit</th>
            <th>Hadir</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nama}</td>
              <td>{user.izin_count}</td>
              <td>{user.alfa_count}</td>
              <td>{user.sakit_count}</td>
              <td>{user.hadir_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
