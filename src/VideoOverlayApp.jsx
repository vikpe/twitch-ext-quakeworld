import { useContext, useEffect, useState } from "react";
import { TwitchAuth } from "./TwitchAuth.jsx";

import ky from "ky";
import classNames from "classnames";

function VideoOverlayApp() {
  const { isLoading, isSuccess, isError, auth } = useContext(TwitchAuth);
  const [server, setServer] = useState(null);
  const [visible, setVisible] = useState(false);

  async function updateServer() {
    const response = await ky.get(
      "https://hubapi.quakeworld.nu/v2/servers/mvdsv?has_client=[streambot]",
    );

    if (!response.ok) {
      return;
    }

    const servers = await response.json();

    if (0 === servers.length) {
      return;
    }

    setServer(servers[0]);
  }

  useEffect(() => {
    async function run() {
      await updateServer();
    }

    if (visible) {
      run();
    }
  }, [visible]);

  useEffect(() => {
    async function run() {
      await updateServer();
    }

    run();
  }, [auth.channelId]);

  if (isLoading) {
    return <div>loading..</div>;
  } else if (isError) {
    return <div>error..</div>;
  }

  return (
    <div
      className={classNames(
        "h-full flex items-center justify-center animate-opacity duration-500",
        {
          "opacity-100": visible,
          "opacity-0": !visible,
        },
      )}
      onMouseOut={() => setVisible(false)}
      onMouseOver={() => setVisible(true)}
    >
      <div className="p-4 bg-black/80 rounded-lg">
        {server && (
          <div className="space-y-4">
            <div className="font-bold">{server.title}</div>
            <div>
              <img
                src={`https://www.quakeworld.nu/images/flags/${server.geo.cc.toLowerCase()}.gif`}
                width={16}
                height={11}
                className="inline"
              />{" "}
              {server.address}
            </div>

            <div className="flex space-x-4 text-sm text-sky-600">
              <a href={`qw://${server.address}/`}>Join server</a>
              <a href={`qw://${server.address}/observe/`}>Spectate</a>
              {server.qtv_stream.url && (
                <a href={`qw://${server.qtv_stream.url}/qtvplay`}>QTV</a>
              )}
              <a
                href={`https://maps.quakeworld.nu/all/${server.settings.map}.bsp`}
              >
                Download map
              </a>
            </div>

            <div>
              <div className="font-bold">
                Spectators ({server.spectator_slots.used}):
              </div>
              {server.spectator_names.join(", ")}
            </div>

            {server.qtv_stream.url && (
              <div>
                <div className="font-bold">
                  QTV Spectators ({server.qtv_stream.spectator_count}):
                </div>
                {server.qtv_stream.spectator_names.join(", ")}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="hidden">
        <div>loading: {isLoading ? "yes" : "no"}</div>
        <div>success: {isSuccess ? "yes" : "no"}</div>
        <div>error: {isError ? "yes" : "no"}</div>
        <div>
          info:
          <div className="flex space-x-6">
            <pre className="text-xs font-mono">moo</pre>
            <pre className="text-xs font-mono">
              {JSON.stringify(server, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoOverlayApp;
