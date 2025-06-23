import axios from "axios";

export const callAI = async (message: string) => {
    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: message,
      });
      console.log(response);
    } catch (e) {
      console.log("ERROR");
    }
}