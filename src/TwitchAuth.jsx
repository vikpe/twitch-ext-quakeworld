import { createContext, useEffect, useState } from "react";

function getDefaultContext() {
  return {
    isLoading: true,
    isError: false,
    isSuccess: false,
    auth: {
      channelId: "",
      clientId: "",
      helixToken: "",
      token: "",
      userId: "",
    },
  };
}

export const TwitchAuth = createContext(getDefaultContext());

export const TwitchAuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getDefaultContext());

  useEffect(() => {
    window.Twitch.ext.onAuthorized(async function (auth) {
      const isSuccess = auth !== null;
      setAuth({
        isLoading: false,
        isSuccess,
        isError: !isSuccess,
        auth,
      });
    });
  }, []);

  return <TwitchAuth.Provider value={auth}>{children}</TwitchAuth.Provider>;
};

//const url = `https://api.twitch.tv/helix/channels?broadcaster_id=${auth.channelId}`;
