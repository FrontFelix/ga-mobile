const username = "admin";
const password = "Garrison";
const encodedCredentials = base64.encode(`${username}:${password}`);
import base64 from "react-native-base64";

export const getProducts = async () => {
  const url = `http://garrison-planet9.westeurope.cloudapp.azure.com:8080/api/serverscript/axfood/barproducts`;

  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      "Content-Type": "application/json",
    },
  });

  let responseJSON = await response.json();
  return responseJSON;
};
