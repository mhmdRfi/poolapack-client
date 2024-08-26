import axios from "axios";
import React from "react";

function DeleteForever({ id, onSiswaUpdated }) {
  const deleteSiswa = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/siswa/delete-siswa/${id}`);
      alert("data siswa berhasil dihapus");
      onSiswaUpdated();
    } catch (err) {
      alert("Data siswa gagal dihapus");
    }
  };
  console.log("ini delete id", id);
  return (
    <div>
      <p>Are you sure delete this data forever?</p>
      <button className="p-4 bg-slate-700 text-slate-50" onClick={() => deleteSiswa(id)}>
        Yes
      </button>
    </div>
  );
}

export default DeleteForever;
