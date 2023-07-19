import React, { useContext, useState } from "react";
import { TwitchAuth } from "./TwitchAuth.jsx";

import classNames from "classnames";
import { Server } from "@qwhub/servers/Server.jsx";
import {
  useGetServerQuery,
  useGetStreamsQuery,
} from "@qwhub/services/hub/hub.js";

function VideoOverlayApp() {
  const [isActive, setIsActive] = useState(true);
  const { isLoading, isError, auth } = useContext(TwitchAuth);
  const { data: streams = [] } = useGetStreamsQuery();
  const currentStream = streams.find((s) => s.id === auth.channelId);

  if (isLoading) {
    return <div>loading..</div>;
  } else if (isError) {
    return <div>error..</div>;
  } else if (!auth) {
    return <div>unable to get auth info..</div>;
  } else if (!currentStream) {
    return <div>unable to get stream info..</div>;
  }

  function onMouseOver() {
    setIsActive(true);
  }

  function onMouseOut() {
    setIsActive(false);
  }

  function onMouseMove() {
    if (!isActive) {
      onMouseOver();
    }
  }

  return (
    <div
      className={classNames(
        "h-full flex items-center justify-center animate-opacity duration-500",
        {
          "opacity-100": isActive,
          "opacity-0": !isActive,
        },
      )}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
      onMouseMove={onMouseMove}
    >
      <div className="flex p-2 bg-black w-[480px]">
        <ServerTile
          address={currentStream.server_address}
          isActive={isActive}
        />
      </div>
    </div>
  );
}

export default VideoOverlayApp;

function ServerTile({ address, isActive }) {
  const { data: server, isSuccess } = useGetServerQuery(address, {
    pollingInterval: isActive ? 5 * 1000 : undefined,
  });

  if (!isSuccess) {
    return <></>;
  }

  return <Server server={server} />;
}
