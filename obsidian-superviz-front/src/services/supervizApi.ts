import axios from "axios";

// Variáveis de ambiente
const API_BASE_URL = "https://nodeapi.superviz.com";
const EMAIL = import.meta.env.VITE_SUPERVIZ_EMAIL;
const PASSWORD = import.meta.env.VITE_SUPERVIZ_PASSWORD;
const API_KEY = import.meta.env.VITE_SUPERVIZ_DEVELOPER_KEY;

// Cache do Access Token
let cachedAccessToken: string | null = null;
let tokenExpiryTime: number | null = null;

// Função para fazer login e obter o access_token
export const loginAndGetAccessToken = async (): Promise<string> => {
  // Verificar se o token ainda é válido
  if (cachedAccessToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
    return cachedAccessToken;
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      {
        email: EMAIL,
        password: PASSWORD,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const accessToken = response.data.access_token;
    const expiresIn = response.data.expires_in; // Se houver um tempo de expiração fornecido

    // Atualizar o cache do token e o tempo de expiração
    cachedAccessToken = accessToken;
    tokenExpiryTime = Date.now() + expiresIn * 1000; // Definir o tempo de expiração

    return accessToken;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw new Error("Falha ao obter o access token");
  }
};

// Função para obter os headers de autenticação
const getAuthHeaders = async () => {
  const accessToken = await loginAndGetAccessToken();
  return {
    Authorization: `Bearer ${accessToken}`,
    apiKey: API_KEY,
    "Content-Type": "application/json",
  };
};

// Função para criar um participante
export const createParticipant = async (
  name: string,
  participantId: string
) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.post(
      `${API_BASE_URL}/participants`,
      {
        participantId,
        name,
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao criar participante:", error);
    throw new Error("Falha ao criar participante");
  }
};

// Função para listar as salas
export const getRooms = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/groups`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar salas:", error);
    throw new Error("Falha ao listar salas");
  }
};

// Função para criar uma sala
export const createRoom = async (roomName: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.put(
      `${API_BASE_URL}/groups`,
      {
        name: roomName,
      },
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar sala:", error);
    throw new Error("Falha ao criar sala");
  }
};

export const addParticipantToGroup = async (
  groupId: string,
  participantId: string
) => {
  try {
    const accessToken = await loginAndGetAccessToken();
    const response = await axios.post(
      `${API_BASE_URL}/groups/participant/${participantId}`,
      {
        group_id: groupId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          apiKey: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar participante ao grupo:", error);
    throw new Error("Falha ao adicionar participante ao grupo");
  }
};
