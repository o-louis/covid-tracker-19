import axios from 'axios';


const request = {
    fetchGlobalData: async () => {
        var url = "https://covid19.mathdro.id/api";
        const response = await axios(url);
        return response.data;
    },

    fetchDailyData: async () => {
        var url = "https://covid19.mathdro.id/api/daily";
        const response = await axios(url);
        return response.data;
    },

    fetchCountry: async (country) => {
        var url = "https://covid19.mathdro.id/api/countries/" + country;
        const response = await axios(url);
        return response.data;
    },

    fetchCountriesList: async () => {
        var url = "https://covid19.mathdro.id/api/countries/";
        const response = await axios(url);
        return response.data;
    },
}

export default request;