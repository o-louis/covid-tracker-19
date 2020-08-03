import axios from 'axios';
import * as query from "../utils/requests"

const request = {
    fetchGlobalData: async () => {
        const url = query.BASE_URL;
        const response = await axios(url);
        return response.data;
    },

    fetchDailyData: async () => {
        const url = query.BASE_URL+query.DAILY;
        const response = await axios(url);
        return response.data;
    },

    fetchCountryData: async (country) => {
        const url = query.BASE_URL+query.COUNTRIES+"/"+country;
        const response = await axios(url);
        return response.data;
    },

    fetchCountriesList: async () => {
        const url = query.BASE_URL+query.COUNTRIES;
        const response = await axios(url);
        return response.data;
    },
}

export default request;