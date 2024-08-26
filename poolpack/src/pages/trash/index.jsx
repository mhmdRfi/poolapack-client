import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DeleteForever from '../delete-forever';
import Link from 'next/link';
import RestoreSiswa from '../restore-siswa';

function index() {
    const [siswa, setSiswa] = useState([]);
      const fetchSiswa = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/siswa/soft-deleted-siswa-records`,
            {}
          );
          setSiswa(response.data?.data);
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        fetchSiswa();
      }, []);

      console.log(siswa)
        const [modalData, setModalData] = useState(null);

        const openModal = (data) => {
          setModalData(data);
          document.getElementById("my_modal_1").showModal();
        };

        const closeModal = () => {
          setModalData(null);
          document.getElementById("my_modal_1").close();
        };
  return (
    <div className="text-slate-700 bg-white h-screen p-20">
      <div className="flex justify-between w-full items-center">
        <h1 className="font-bold text-2xl text-slate-700">Trash</h1>
        <Link href={"/"}>
          <button className="p-2 bg-slate-700 text-slate-50 rounded-md">Home</button>
        </Link>
      </div>
      <table className="">
        <thead>
          <tr className="border bg-slate-200">
            <th className="w-44 border border-slate-400 p-2">Id Siswa</th>
            <th className="w-72 border border-slate-400 p-2">Nama Siswa</th>
            <th className="w-72 border border-slate-400 p-2">Kota/Kabupaten</th>
            <th className="w-72 border border-slate-400 p-2">Kecamatan</th>
            <th className="w-72 border border-slate-400 p-2">Alamat Siswa</th>
            <th className="w-72 border border-slate-400 p-2">Action</th>
          </tr>
        </thead>
        <tbody className="border">
          {siswa &&
            Array.isArray(siswa) &&
            siswa?.map((siswa) => (
              <tr className="text-center" key={siswa.id}>
                <td className="w-44 border border-slate-400 p-2">{siswa.id}</td>
                <td className="w-72 border border-slate-400 p-2">{siswa.nama_siswa}</td>
                <td className="w-72 border border-slate-400 p-2">{siswa.kecamatan?.city.name}</td>
                <td className="w-72 border  border-slate-400 p-2">{siswa.kecamatan?.name}</td>
                <td className="w-72 border border-slate-400 p-2">{siswa.alamat}</td>
                <td className="w-72 border border-slate-400 p-2 flex gap-2 justify-center">
                  <button
                    className="btn text-slate-50"
                    onClick={() => document.getElementById("my_modal_3").showModal()}
                  >
                    Restore
                  </button>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box rounded-lg  bg-slate-50">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <RestoreSiswa
                        id={siswa.id}
                        onSiswaUpdated={fetchSiswa}
                      />
                    </div>
                  </dialog>
                  <button className="btn text-slate-50" onClick={() => openModal({ id: siswa.id })}>
                    Delete
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box rounded-lg bg-slate-50">
                      <form method="dialog">
                        <button
                          type="button"
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                          onClick={closeModal}
                        >
                          ✕
                        </button>
                      </form>
                      {modalData && <DeleteForever id={modalData.id} onSiswaUpdated={fetchSiswa} />}
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default index