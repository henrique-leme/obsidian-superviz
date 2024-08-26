import React, { useEffect, useState } from "react";
import {
  getRecordings,
  postGenerateTranscript,
  getActionItems,
  getFollowUps,
  getQuestions,
  getTopics,
  getSummary,
} from "../services/supervizApi";
import moment from "moment";

const RecordingOptionsPopup: React.FC<{
  roomId: string;
  onClose: () => void;
}> = ({ roomId, onClose }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recordings, setRecordings] = useState<any[]>([]);
  const [selectedRecordingId, setSelectedRecordingId] = useState<string | null>(
    null
  );
  const [transcriptionGenerated, setTranscriptionGenerated] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const data = await getRecordings(roomId);
        console.log("Recordings fetched: ", data); // Log for debugging
        setRecordings(data.data || []);
      } catch (error) {
        console.error("Error fetching recordings:", error);
      }
    };

    fetchRecordings();
  }, [roomId]);

  const handleGenerateTranscript = async () => {
    if (!selectedRecordingId) {
      alert("Please select a recording first!");
      return;
    }

    try {
      setLoading(true);
      const transcriptResponse = await postGenerateTranscript(
        selectedRecordingId
      );
      console.log("Transcript generated: ", transcriptResponse);
      setTranscriptionGenerated(true);
      setDescription("Transcription successfully generated.");
      setLoading(false);
    } catch (error) {
      console.error("Error generating transcript:", error);
      setDescription("Failed to generate transcription.");
      setLoading(false);
    }
  };

  const handleOptionSelect = async (option: string) => {
    if (!selectedRecordingId) {
      alert("Please select a recording first!");
      return;
    }

    setLoading(true);
    setDescription("Fetching data...");

    try {
      let result;
      switch (option) {
        case "Action Items":
          result = await getActionItems(selectedRecordingId);
          console.log("Action Items: ", result); // Log for debugging
          setDescription(
            JSON.stringify(result.items, null, 2) ||
              "No action items available."
          );
          break;
        case "Follow-Ups":
          result = await getFollowUps(selectedRecordingId);
          console.log("Follow-Ups: ", result); // Log for debugging
          setDescription(
            JSON.stringify(result.items, null, 2) || "No follow-ups available."
          );
          break;
        case "Questions":
          result = await getQuestions(selectedRecordingId);
          console.log("Questions: ", result); // Log for debugging
          setDescription(
            JSON.stringify(result.items, null, 2) || "No questions available."
          );
          break;
        case "Topics":
          result = await getTopics(selectedRecordingId);
          console.log("Topics: ", result); // Log for debugging
          setDescription(
            JSON.stringify(result.items, null, 2) || "No topics available."
          );
          break;
        case "Summary":
          result = await getSummary(selectedRecordingId);
          console.log("Summary: ", result); // Log for debugging
          setDescription(
            JSON.stringify(result.items, null, 2) || "No summary available."
          );
          break;
        default:
          console.error("Unknown option");
          setDescription("Unknown option.");
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${option}:`, error);
      setDescription(`Failed to fetch ${option}.`);
    }

    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-4xl h-[500px] flex">
        {/* Left Column - Options and recordings */}
        <div className="w-1/3 h-full pr-4 flex flex-col space-y-3">
          <h2 className="text-2xl font-semibold text-center">
            Recording Options
          </h2>
          {recordings.length > 0 ? (
            <select
              value={selectedRecordingId || ""}
              onChange={(e) => setSelectedRecordingId(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none"
            >
              <option value="" disabled>
                Select a recording
              </option>
              {recordings.map((rec) => (
                <option key={rec.uuid} value={rec.uuid}>
                  {moment(rec.createdAt).format("YYYY-MM-DD HH:mm:ss")} -{" "}
                  {rec.uuid}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-center text-gray-400">
              No recordings available.
            </p>
          )}

          <div className="flex flex-col space-y-3">
            <button
              onClick={handleGenerateTranscript}
              disabled={!selectedRecordingId || loading}
              className={`w-full p-3 rounded-lg text-white focus:outline-none ${
                selectedRecordingId
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Generating..." : "Generate Transcript"}
            </button>

            {[
              "Action Items",
              "Follow-Ups",
              "Questions",
              "Topics",
              "Summary",
            ].map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                disabled={!selectedRecordingId || loading}
                className={`w-full p-3 rounded-lg text-white focus:outline-none ${
                  selectedRecordingId
                    ? "bg-gray-500 hover:bg-gray-600"
                    : "bg-gray-700 cursor-not-allowed"
                }`}
              >
                {loading ? "Fetching..." : `Get ${option}`}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Transcription text or description */}
        <div className="w-2/3 h-full pl-4 flex flex-col justify-between">
          <h2 className="text-2xl font-semibold text-center">
            {transcriptionGenerated ? "Transcription" : "Details"}
          </h2>
          <div className="bg-gray-700 p-4 rounded-lg flex-grow overflow-auto text-center">
            {description ? (
              <div>
                <pre>{description}</pre>
                {transcriptionGenerated && (
                  <button
                    onClick={() => copyToClipboard(description)}
                    className="mt-4 p-2 bg-yellow-500 rounded-lg text-white hover:bg-yellow-600 focus:outline-none"
                  >
                    Copy to Clipboard
                  </button>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-400">
                No information available yet...
              </p>
            )}
          </div>
        </div>

        {/* Close Button - Round */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-red-500 rounded-full text-white hover:bg-red-600 focus:outline-none"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default RecordingOptionsPopup;
