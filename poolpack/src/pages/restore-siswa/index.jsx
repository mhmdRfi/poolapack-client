import axios from "axios";
import React from "react";

function RestoreSiswa({ id, onSiswaUpdated }) {
  const deleteSiswa = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/siswa/restore-soft-deleted-siswa/${id}`);
      onSiswaUpdated(); 
      alert("data siswa berhasil dihapus");
    } catch (err) {
      alert("Data siswa gagal dihapus");
    }
  };
  console.log("ini delete id", id);
  return (
    <div>
      <p>Are you sure restore this data?</p>
      <button className="p-4 bg-slate-700 text-slate-50" onClick={() => deleteSiswa(id)}>
        Yes
      </button>
    </div>
  );
}

export default RestoreSiswa;
