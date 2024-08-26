import axios from "axios";
import React from "react";

function DeleteSiswa({ id, onSiswaUpdated }) {
  const deleteSiswa = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/siswa/soft-delete-siswa/${id}`);
      onSiswaUpdated();
      alert("data siswa berhasil dihapus");

    } catch (err) {
      alert("Data siswa gagal dihapus");
      console.log(err);
    }
  };
  console.log("ini delete id", id);
  return (
    <div>
      <p>Are you sure delete this data?</p>
      <button className="p-4 bg-slate-700 rounded-md text-slate-50" onClick={() => deleteSiswa(id)}>
        Yes
      </button>
    </div>
  );
}

export default DeleteSiswa;
