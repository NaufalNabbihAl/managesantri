import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = ({ data }) => {
  const [selectedAttendance, setSelectedAttendance] = useState({});

  const handleAttendanceChange = (event) => {
    const { name, value } = event.target;
    const id = event.target.name.split("_")[1];
    setSelectedAttendance((prevAttendance) => ({
      ...prevAttendance,
      [name]: { id, value },
    }));
  };

  const handleSubmit = async () => {
    const dataToSend = Object.values(selectedAttendance).map(
      ({ id, value }) => ({
        id,
        kehadiran: value,
      })
    );

    console.log(dataToSend);
    try {
      const apiUrl = "http://localhost:8000/api/absen/store";
      const response = await axios.post(
        apiUrl,
        {
          data: dataToSend,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
        
      );

      console.log(response.data);
      if (response.data.status === "success") {
        alert("Data berhasil disimpan");
        window.location.href = "/santri";
      } else {
        alert("Data gagal disimpan");
      }
      
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  async function handleDelete(id) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/santri/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Santri deleted successfully!");
        window.location.href = "/santri";
      } else {
        const errorData = await response.json();
        console.error("Error deleting Santri:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  return (
    <div>
      
      <table className="table" border={1}>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Kategori</th>
            <th>Kehadiran</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nama}</td>
              <td>{user.kategori}</td>
              <td>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`kehadiran_${user.id}`}
                    id={`radio_${user.id}`}
                    value={`izin`}
                    onChange={handleAttendanceChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`izin_${user.id}`}
                  >
                    Izin
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`kehadiran_${user.id}`}
                    id={`radio_${user.id}`}
                    value={`alfa`}
                    onChange={handleAttendanceChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`alfa_${user.id}`}
                  >
                    Alfa
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`kehadiran_${user.id}`}
                    id={`radio_${user.id}`}
                    value={`sakit`}
                    onChange={handleAttendanceChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`sakit_${user.id}`}
                  >
                    Sakit
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`kehadiran_${user.id}`}
                    id={`radio_${user.id}`}
                    value={`hadir`}
                    onChange={handleAttendanceChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`hadir_${user.id}`}
                  >
                    Hadir
                  </label>
                </div>
              </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => (window.location.href = "/editSantri")}
                >
                  Edit
                </button>
                <button className="btn btn-danger ms-2" onClick={e => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-primary me-md-2" onClick={handleSubmit}>
          Simpan
        </button>
      </div>

      {/* <button className="btn btn-primary " onClick={handleSubmit}>
        Submit
      </button> */}
    </div>
  );
};

export default Table;
