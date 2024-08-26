export const getSiswa = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/siswa/find-siswa`);
    console.log("ini siswa", response);
    return response?.data?.data;
  } catch (err) {
    // const errorMessage =
    //   err.response && err.response.data && err.response.data.message
    //     ? err.response.data.message
    //     : "An unexpected error occurred";
    // toast.error(errorMessage);
    console.log(err);
  }
};
