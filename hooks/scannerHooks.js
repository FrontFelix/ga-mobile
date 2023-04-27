const username = "admin";
const password = "Garrison";
const encodedCredentials = base64.encode(`${username}:${password}`);
import base64 from "react-native-base64";

export function HandleNewContainer_Scan() {}

export const updateContainerStatus = async ({ containerId, bodyData }) => {
  const url = `http://garrison-planet9.westeurope.cloudapp.azure.com:8080/api/serverscript/axfood/containers?containerID=${containerId}`;

  let response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  let responseJSON = await response.json();
  return responseJSON;
};

export const getContainers = async () => {
  const url = `http://garrison-planet9.westeurope.cloudapp.azure.com:8080/api/serverscript/axfood/containers`;

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

export const getProducts = async () => {
  const url = `http://garrison-planet9.westeurope.cloudapp.azure.com:8080/api/serverscript/axfood//barproducts`;

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
