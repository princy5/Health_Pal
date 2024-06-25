import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Appointments:", appointments);

  return (
    <div>
      {loading && <Loading />}
      {!loading && error && <Error errMessage={error} />}

      {!loading && !error && appointments.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {appointments.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-center  leading-7 text-[20px] text-primaryColor font-semibold border">
          You did not book any appointments yet!
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
