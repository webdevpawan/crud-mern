import axios from 'axios'

export const upload = async (data) => {
    const user = await axios.post("http://localhost:4000/add-user", data);
    // console.log(user);
}
