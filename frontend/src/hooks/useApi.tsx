import { useContext } from "react";
import { ApiContext } from "../context/apiProvider";
import satherApiClient from "../satherClient";

export const UseApi = () => {
    return useContext(ApiContext) as satherApiClient;

}

export default UseApi;