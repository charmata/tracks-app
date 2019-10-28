import axios from "axios";
import { AsyncStorage } from "react-native";
import { API_URL } from "react-native-dotenv";

const instance = axios.create({
  baseURL: API_URL
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;
