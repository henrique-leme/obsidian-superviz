import axios from "axios";

// Environment Variables
const API_BASE_URL = "https://nodeapi.superviz.com";
const EMAIL = import.meta.env.VITE_SUPERVIZ_EMAIL;
const PASSWORD = import.meta.env.VITE_SUPERVIZ_PASSWORD;
const API_KEY = import.meta.env.VITE_SUPERVIZ_DEVELOPER_KEY;

// Cache for Access Token
let cachedAccessToken: string | null = null;
let tokenExpiryTime: number | null = null;

// Function to log in and obtain access_token
export const loginAndGetAccessToken = async (): Promise<string> => {
  // Check if the token is still valid
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

    const { access_token: accessToken, expires_in: expiresIn } = response.data;

    // Update token cache and expiry time
    cachedAccessToken = accessToken;
    tokenExpiryTime = Date.now() + expiresIn * 1000;

    return accessToken;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Failed to obtain access token");
  }
};

// Function to get authentication headers
const getAuthHeaders = async () => {
  const accessToken = await loginAndGetAccessToken();
  return {
    Authorization: `Bearer ${accessToken}`,
    apiKey: API_KEY,
    "Content-Type": "application/json",
  };
};

// Function to create a participant
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
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating participant:", error);
    throw new Error("Failed to create participant");
  }
};

// Function to list rooms
export const getRooms = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/groups`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error listing rooms:", error);
    throw new Error("Failed to list rooms");
  }
};

// Function to create a room
export const createRoom = async (roomName: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.put(
      `${API_BASE_URL}/groups`,
      { name: roomName },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw new Error("Failed to create room");
  }
};

// Function to add a participant to a group
export const addParticipantToGroup = async (
  groupId: string,
  participantId: string
) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.post(
      `${API_BASE_URL}/groups/participant/${participantId}`,
      { group_id: groupId },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding participant to group:", error);
    throw new Error("Failed to add participant to group");
  }
};

// Function to generate a transcript
export const postGenerateTranscript = async (recordingId: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.post(
      `${API_BASE_URL}/recordings/transcripts`,
      {
        recordingId,
        language: "en-US", // Set language for the transcript
      },
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error("Error generating transcript:", error);
    throw new Error("Failed to generate transcript");
  }
};

// Function to get recording transcriptions
export const getRecordingWithTranscriptions = async (recordingId: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(
      `${API_BASE_URL}/recordings/transcripts/${recordingId}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting transcriptions:", error);
    throw new Error("Failed to get transcriptions");
  }
};

// Function to get a transcription
export const getTranscription = async (recordingId: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(
      `${API_BASE_URL}/recordings/transcripts/${recordingId}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting transcription:", error);
    throw new Error("Failed to get transcription");
  }
};

// Function to get action items
export const getActionItems = async (recordingId: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(
      `${API_BASE_URL}/recordings/transcripts/${recordingId}/action-items`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting action items:", error);
    throw new Error("Failed to get action items");
  }
};

// Function to get follow-ups
export const getFollowUps = async (recordingId: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(
      `${API_BASE_URL}/recordings/transcripts/${recordingId}/follow-ups`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting follow-ups:", error);
    throw new Error("Failed to get follow-ups");
  }
};

// Function to get questions
export const getQuestions = async (recordingId: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(
      `${API_BASE_URL}/recordings/transcripts/${recordingId}/questions`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting questions:", error);
    throw new Error("Failed to get questions");
  }
};

// Function to get topics
export const getTopics = async (recordingId: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(
      `${API_BASE_URL}/recordings/transcripts/${recordingId}/topics`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting topics:", error);
    throw new Error("Failed to get topics");
  }
};

// Function to get summary
export const getSummary = async (recordingId: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(
      `${API_BASE_URL}/recordings/transcripts/${recordingId}/summary`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting summary:", error);
    throw new Error("Failed to get summary");
  }
};

// Function to get recordings
export const getRecordings = async (roomId?: string) => {
  try {
    const headers = await getAuthHeaders();
    const url = `${API_BASE_URL}/recording`;

    const response = await axios.get(url, {
      headers,
      params: {
        roomId: roomId || undefined, // Filter by roomId if provided
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting recordings:", error);
    throw new Error("Failed to get recordings");
  }
};
