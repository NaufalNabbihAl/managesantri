"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Table from "../../components/Table.js";

export default function kehadiranHarian() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/santri/")
      .then((response) => response.json())
      .then((json) => setUsers(json.data))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="text-center">Absensi Santri</h1>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-success me-md-2"
              onClick={() => (window.location.href = "/tambahSantri")}
            >
              Tambah
            </button>
          </div>
          {users.length > 0 && <Table data={users} />}
        </>
      )}
    </div>
  );
}
