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

  const loadedVideoIdRef = useRef(null);

  useEffect(() => {
    if ("mediaSession" in navigator && currentTrack) {
      try {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: currentTrack.title || "Kuyil Music",
          artist: currentTrack.artist || "Kuyil",
          album: "Listen Together",
          artwork: [
            { src: currentTrack.coverArt || currentTrack.cover || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`, sizes: "512x512", type: "image/jpeg" }
          ]
        });
        navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
      } catch (e) {}
    }
  }, [currentTrack, isPlaying, videoId]);

  // Handle Play / Pause commands via postMessage without re-rendering or reloading iframe
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
    const timer = setTimeout(sendMsg, 300);
    return () => clearTimeout(timer);
  }, [isPlaying, isYouTubeTrack]);

  // Track change handler via JS API
  useEffect(() => {
    if (!iframeRef.current || !isYouTubeTrack) return;
    if (loadedVideoIdRef.current && loadedVideoIdRef.current !== videoId) {
      try {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "loadVideoById", args: [videoId] }),
          "*"
        );
      } catch (e) {}
    }
    loadedVideoIdRef.current = videoId;
  }, [videoId, isYouTubeTrack]);

  if (!isYouTubeTrack) return null;

  return (
    <iframe
      ref={iframeRef}
      src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&playsinline=1&autoplay=0`}
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
