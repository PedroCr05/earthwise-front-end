import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const signup = async (body) => {
  try {
    const res = await axios.post(BASE_URL + "/signup", body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const signin = async (body) => {
  try {
    const res = await axios.post(BASE_URL + "/signin", body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const signout = async()=>{
    
}
export default { signup, signin, signout };
