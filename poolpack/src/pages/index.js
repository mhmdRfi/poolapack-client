import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { getSiswa } from "./api/getSiswa";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import EditSiswa from "@/components/EditSiswa";
import DeleteSiswa from "@/components/DeleteSiswa";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [siswa, setSiswa] = useState([]);

  const fetchSiswa = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/siswa/find-siswa`, {});
      setSiswa(response.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  const router = useRouter();

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
    <main
      className={`flex min-h-screen flex-col items-center gap-10 p-24 ${inter.className} bg-slate-50`}
    >
      <div className="flex justify-between w-full items-center">
        <h1 className="font-bold text-2xl text-slate-700">Data Siswa</h1>
        <div className="flex gap-4">
          <Link href={"/input-siswa"}>
            <button className="p-2 bg-slate-700 text-slate-50 rounded-md">Input Siswa</button>
          </Link>
          <Link href={"/trash"}>
            <button className="p-2 bg-slate-700 text-slate-50 rounded-md">Trash</button>
          </Link>
        </div>
      </div>
      <div className="text-slate-700">
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
                      Edit
                    </button>
                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box rounded-lg  bg-slate-50">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <EditSiswa
                          id={siswa.id}
                          nama_siswa={siswa.nama_siswa}
                          kecamatanId={siswa.kecamatanId}
                          cityId={siswa.kecamatan?.cityId}
                          alamat={siswa.alamat}
                          onSiswaUpdated={fetchSiswa}
                        />
                      </div>
                    </dialog>
                    <button
                      className="btn text-slate-50"
                      onClick={() => openModal({ id: siswa.id })}
                    >
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
                        {modalData && <DeleteSiswa id={modalData.id} onSiswaUpdated={fetchSiswa} />}
                      </div>
                    </dialog>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
