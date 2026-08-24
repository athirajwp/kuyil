import React, { useRef, useEffect } from "react";
import { useRealtimeSession } from "../../lib/realtime-store";

export const GlobalAudioEngine = () => {
  const iframeRef = useRef(null);
  const { session } = useRealtimeSession();
  const playback = session.playbackState;
  const currentTrack = playback.currentTrack;
  const isPlaying = playback.isPlaying;
  const currentPosition = playback.currentPosition;
  const videoId = currentTrack?.id || "GqlGdhjEXNg";
  
  const isYouTubeTrack =
    Boolean(currentTrack) &&
    (currentTrack?.audioUrl?.includes("youtube") ||
      currentTrack?.audioUrl?.includes("youtu.be") ||
      currentTrack?.id?.length === 11 ||
      !currentTrack?.audioUrl?.endsWith(".mp3"));

  useEffect(() => {
    if ("mediaSession" in navigator && currentTrack) {
      try {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: currentTrack.title || "Vibespace Music",
          artist: currentTrack.artist || "Vibespace",
          album: "Listen Together",
          artwork: [
            { src: currentTrack.coverArt || currentTrack.cover || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`, sizes: "512x512", type: "image/jpeg" }
          ]
        });
        navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
      } catch (e) {}
    }
  }, [currentTrack, isPlaying, videoId]);

  useEffect(() => {
    if (!iframeRef.current || !isYouTubeTrack) return;
    const command = isPlaying ? "playVideo" : "pauseVideo";
    const sendMsg = () => {
      try {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: command, args: [] }),
          "*"
        );
      } catch (e) {}
    };
    sendMsg();
    const timer = setTimeout(sendMsg, 500);
    return () => clearTimeout(timer);
  }, [isPlaying, videoId, isYouTubeTrack]);

  const prevPositionRef = useRef(undefined);
  useEffect(() => {
    if (!iframeRef.current || currentPosition === undefined || !isYouTubeTrack) return;
    const delta = Math.abs(currentPosition - (prevPositionRef.current ?? currentPosition));
    if (prevPositionRef.current === undefined || delta > 2.0) {
      try {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "seekTo", args: [currentPosition, true] }),
          "*"
        );
      } catch (e) {}
    }
    prevPositionRef.current = currentPosition;
  }, [currentPosition, isYouTubeTrack]);

  if (!isYouTubeTrack) return null;

  return (
    <iframe
      ref={iframeRef}
      key={videoId}
      src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1&playsinline=1`}
      title="Global Persistent YouTube Music Engine"
      width="1"
      height="1"
      allow="autoplay; encrypted-media; picture-in-picture"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '1px',
        height: '1px',
        opacity: 0.01,
        pointerEvents: 'none',
        zIndex: -9999
      }}
    />
  );
};
