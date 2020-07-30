import axios from 'axios';
export const fetchGlobalData = async () => {
    var url = "https://covid19.mathdro.id/api";
    const response = await axios(url);
    return response.data;
}