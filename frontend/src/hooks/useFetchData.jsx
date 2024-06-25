import { useEffect, useState } from "react";
import { token } from "../config";

const useFetchData = (url) => {
  //   console.log("auth", authToken);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
           headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();
        // console.log("result", result);

        if (!res.ok) {
          throw new Error(result.message);
        }
        setData(result.data);
        setLoading(false);
      } 
      catch (err) {
        setLoading(false);
        setError(err.message);
        // console.log(error.message);
      }
    };
    fetchData();
  }, [url]);

  //   console.log("SetData", setData);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
