"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import LaporanKehadiran from "../../components/LaporanKehadiran.js";

export default function Laporan() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/santri/report")
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
          {users.length > 0 && (
            <LaporanKehadiran data={users} />
          )}
        </>
      )}
    </div>
  );
}
