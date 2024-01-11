import React, { useState,useEffect } from 'react';
import axios from "axios";

function TambahSantri() {
  const [nama, setNama] = useState('');
  const [kategori, setKategori] = useState([]);
  const [kategoriInput, setKategoriInput] = useState('');
  //get kategori from table kategori
  useEffect(() => {
    axios.get("http://localhost:8000/api/kategori")
      .then((response) => {
        setKategori(response.data.data);
        setKategoriInput(response.data.data[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };

  const handleKategoriChange = (event) => {
    setKategoriInput(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Handle form submission logic here, e.g., send data to an API
    try {
      const apiUrl = "http://localhost:8000/api/santri/store";
      const response = await axios.post(apiUrl, { nama: nama, kategori_id: kategoriInput });
      console.log(response.data);
      window.location.href = "/santri";
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className='mt-5 ms-48 me-48'>
      <div class="d-grid gap-2 d-md-flex justify-content-md-center">
        <h1>Tambah Santri</h1>
      </div>
      <div className=''>
        <label htmlFor="nama">Nama:</label>
        <input className= "form-control" type="text" id="nama" value={nama} onChange={handleNamaChange} />
      </div>
      <div>
        <label htmlFor="program">Kategori:</label>
        <select className='form-select' id="program" value={kategoriInput} onChange={handleKategoriChange}>
          {kategori.map((kategori) => (
            <option key={kategori.id} value={kategori.id}>
              {kategori.kategori}
            </option>
          ))}
        </select>
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
