import {initialProduct} from "../models/Product";
import axios from "axios/index";

const { REACT_APP_API_LOCATION } = process.env;
export const getListOfProduct = async () => {
    try {
        const res = await axios.get(`${REACT_APP_API_LOCATION}`)

        return res.data.products;
    } catch (error: any) {
        console.debug("error", error.response.data)
    }
}