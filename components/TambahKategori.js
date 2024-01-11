import React, { useState,useEffect } from 'react';
import axios from "axios";

function TambahSantri() {
  const [kategori, setKategori] = useState('');
  
  const handleKategoriChange = (event) => {
    setKategori(event.target.value);
  };


  const handleSubmit = async(event) => {
    event.preventDefault();
    
    try {
      const apiUrl = "http://localhost:8000/api/kategori/store";
      const response = await axios.post(apiUrl, { kategori: kategori });
      console.log(response.data);
      window.location.href = "/kategori";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mt-5 ms-48 me-48'>
      <div class="d-grid gap-2 d-md-flex justify-content-md-center">
        <h1>Tambah Kategori</h1>
      </div>
      <div className=''>
        <label htmlFor="nama">Kategori:</label>
        <input className= "form-control" type="text" id="nama" value={kategori} onChange={handleKategoriChange} />
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-center mt-10">
        <button class="btn btn-primary me-md-2" onClick={handleSubmit}>
          Simpan
        </button>
      </div>
    </form>
  );
};

export default TambahSantri;
