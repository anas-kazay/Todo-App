import axios from "axios";
import { apiClient } from "./ApiClient";

export function retrieveHelloWorldBean() {
  return apiClient.get("/hello-world-bean");
}

export const retrieveHelloWorldPathVariable = (username, token) => {
  return apiClient.get(
    `/hello-world/path-variable/${username}`
    // , {
    //   headers: {
    //     Authorization: token,
    //   },
    // }
  );
};

export const executeBasicAuthenticationService = (token) => {
  return apiClient.get(`/basicauth`, {
    headers: {
      Authorization: token,
    },
  });
};
