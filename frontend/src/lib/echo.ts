import Pusher from "pusher-js";
import Echo from "laravel-echo";
import apiClient from "@/lib/axios.ts";

window.Pusher = Pusher;

const reverbScheme = import.meta.env.VITE_REVERB_SCHEME ?? "http";
const reverbPort = Number(
  import.meta.env.VITE_REVERB_PORT ?? (reverbScheme === "https" ? 443 : 80),
);
const isSecure = reverbScheme === "https";

export const echo = new Echo({
  broadcaster: "reverb",
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: reverbPort,
  wssPort: reverbPort,
  forceTLS: isSecure,
  enabledTransports: isSecure ? ["wss"] : ["ws"],
  authorizer: (channel: { name: string }) => {
    return {
      authorize: (socketId: string, callback: Function) => {
        apiClient
          .post("/api/broadcasting/auth", {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => callback(false, response.data))
          .catch((error) => callback(true, error));
      },
    };
  },
});
