import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      return response.data;
    } catch (err) {
      console.log(err);
      const errorList = (
        <div className="alert alert-danger">
          <h4>！</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}> {err.message} </li>
            ))}
          </ul>
        </div>
      );
      setErrors(err);
    }
  };

  return { doRequest, errors };
};

export default useRequest;
