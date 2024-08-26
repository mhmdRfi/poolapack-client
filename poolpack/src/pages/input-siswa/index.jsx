import Image from "next/image";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

function InputSiswa() {

     const [siswa, setSiswa] = useState([]);
     const [city, setCity] = useState([]);
     const [kecamatan, setKecamatan] = useState([]);
     const [selectedCity, setSelectedCity] = useState();
     const [selectedKecamatan, setSelectedKecamatan] = useState();

    const fetchCity = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/city/find-city`, {});
        setCity(response.data?.data);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      fetchCity();
    }, []);
    console.log(city);

    useEffect(() => {
      if (selectedCity) {
        const fetchKecamatan = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8080/kecamatan/find-kecamatan/${selectedCity}`
            );
            setKecamatan(response.data?.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchKecamatan();
      }
    }, [selectedCity]);


    const InputScheme = Yup.object().shape({
      name: Yup.string().required("Masukkan nama murid"),
    });

    const formik = useFormik({
      initialValues: {
        name: "",
        alamat: "",
        kecamatanId: "",
      },

      validationSchema: InputScheme,
      onSubmit: async (values, { resetForm }) => {
        try {
          await axios.post("http://localhost:8080/siswa/input-siswa/", values);
          resetForm({
            values: {
              name: "",
              alamat: "",
              kecamatanId: "",
            },
          });
          alert("Input Siswa Berhasil")
        } catch (error) {
          alert("An error occurred. Please try again.");
        }
      },
    });
  return (
    <div className="bg-slate-50 p-20">
      <h1 className="font-bold text-lg text-slate-700 text-center">Input Data Siswa</h1>
      <div className="bg-slate-50 flex justify-center h-screen p-16">
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4 text-slate-600 w-1/2 "
        >
          <div>
            <label className="input input-bordered bg-slate-100 border-slate-300 rounded-md flex items-center gap-2">
              <input
                type="text"
                className="grow bg-slate-100 p-2 rounded-md"
                name="name"
                placeholder="Nama Siswa"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="select select-bordered w-full  bg-slate-100 grow p-2 rounded-md"
            >
              <option disabled selected>
                Select City
              </option>
              {city &&
                city?.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <select
              className="select select-bordered w-full  bg-slate-100 grow p-2 rounded-md"
              name="kecamatanId"
              value={formik.values.kecamatanId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option disabled value="">
                Select Kecamatan
              </option>
              {kecamatan &&
                kecamatan.map((kecamatan) => (
                  <option key={kecamatan.id} value={kecamatan.id}>
                    {kecamatan.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <textarea
              className="w-full  bg-slate-100 grow p-2 rounded-md"
              name="alamat"
              placeholder="Masukkan alamat lengkap"
              value={formik.values.alamat}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.confirmationPassword && formik.errors.confirmationPassword ? (
              <div className="text-red-500 text-sm">{formik.errors.confirmationPassword}</div>
            ) : null}
          </div>
          <div className="">
            <button
              type="submit"
              className="w-full text-white bg-slate-800 hover:bg-teal-600 p-3 rounded-md font-medium mt-4 mb-2"
            >
              Input
            </button>
          </div>
          <Link href={'/'} className="text-blue-500 font-bold text-center"> Kembali ke Home
          </Link>
        </form>
      </div>
    </div>
  );
}

export default InputSiswa