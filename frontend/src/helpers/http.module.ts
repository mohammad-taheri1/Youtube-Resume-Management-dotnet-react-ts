import axios from "axios";
import { baseUrl } from "../constants/url.constants";

const httpModule = axios.create({
   baseURL: baseUrl,
});

export default httpModule;