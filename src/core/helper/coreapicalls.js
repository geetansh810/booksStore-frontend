import { API } from "../../backend";

//get all products
export const getAllProducts = () => {
    return fetch(`${API}/products`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  