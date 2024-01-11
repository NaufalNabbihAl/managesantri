import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = ({ data }) => {
  const [selectedAttendance, setSelectedAttendance] = useState([]);
  const handleAttendanceChange = (event) => {
    const { name, value } = event.target;
    const id = event.target.name.split("_")[1];
    setSelectedAttendance({ ...selectedAttendance, [name]: { id, value } });
  };


  async function handleDelete(id) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/kategori/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Kategori deleted successfully!");
        window.location.href = "/kategori";
      } else {
        const errorData = await response.json();
        console.error("Error deleting Kategori", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }




  const handleSubmit = async () => {
    try {
      selectedAttendance.map((attendance) => {
        const apiUrl = "http://localhost:8000/api/kehadiran/store";
        const response = axios.post(apiUrl, attendance);
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }

    console.log(selectedAttendance);
  };
  return (
    <div>
      
      <table className="table" border={1}>
        <thead>
          <tr>
            <th>No</th>
            <th>Kategori</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.kategori}</td>
              <td>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    className="btn btn-warning me-md-2"
                    onClick={() =>
                      (window.location.href = `/editKategori/${user.id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={e => handleDelete(user.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
