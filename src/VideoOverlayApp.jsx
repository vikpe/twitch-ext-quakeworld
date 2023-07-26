import React, { useState } from "react";

import classNames from "classnames";
import { Server } from "@qwhub/servers/Server.jsx";
import {
  useGetServerQuery,
  useGetStreamsQuery,
} from "@qwhub/services/hub/hub.js";

function VideoOverlayApp({ channelId }) {
  const [isActive, setIsActive] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const { data: streams = [], isLoading, isError } = useGetStreamsQuery();
  const currentStream = streams.find((s) => s.id === channelId);

  if (isLoading) {
    return <div>loading..</div>;
  } else if (isError) {
    return <div>error..</div>;
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

  function toggleMinimized() {
    setIsMinimized(!isMinimized);
  }

  const isMaximized = !isMinimized;

  return (
    <div
      className={classNames("h-full flex justify-center py-20 px-28", {
        "opacity-100": isActive,
        "opacity-0": !isActive,
        "items-center": isMaximized,
        "items-end": isMinimized,
      })}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
      onMouseMove={onMouseMove}
    >
      <div
        className={classNames({
          "border border-black": isMaximized,
        })}
      >
        <div
          className={classNames(
            "flex items-center justify-between space-x-4 py-2 px-3 cursor-pointer bg-black hover:bg-gray-900 text-gray-300 hover:text-white",
            {
              "border-2 border-sky-600 rounded-lg": isMinimized,
            },
          )}
          onClick={toggleMinimized}
        >
          {isMaximized && <div>Server info</div>}
          {isMinimized && <div className="text-lg">Show server info</div>}
          <div className={classNames({ "rotate-180": isMaximized })}>
            <ChevronUpIcon />
          </div>
        </div>
        {isActive && isMaximized && (
          <div className="flex w-[480px]">
            <ServerTile
              address={currentStream.server_address}
              isActive={isActive}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoOverlayApp;

function ServerTile({ address }) {
  const { data: server, isSuccess } = useGetServerQuery(address, {
    pollingInterval: 5 * 1000,
    refetchOnMountOrArgChange: true,
  });

  if (!isSuccess) {
    return <></>;
  }

  return <Server server={server} />;
}

const ChevronUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height="24"
    width="24"
  >
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" fill="white" />
  </svg>
);
