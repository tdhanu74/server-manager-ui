import axios from "axios";

export async function getServers() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/server`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function getServer(id: string) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/server/${id}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function startServer(id: string) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/server/${id}/start`,
      {},
    );
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
}
export async function stopServer(id: string) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/server/${id}/stop`,
      {},
    );
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
}
export async function getLogs(id: string) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/server/${id}/logs`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
