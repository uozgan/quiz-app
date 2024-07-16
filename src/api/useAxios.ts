import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { baseApiUrl } from "../config/constants";

axios.defaults.baseURL = baseApiUrl;

interface UseAxiosProps {
  url: string;
}

const useAxios = ({ url }: UseAxiosProps) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError | string>("");
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url)
        .then((res) => setResponse(res))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [url]);

  return { response, error, loading };
};

export default useAxios;
