import { useState, useEffect } from "react";
import { MOCK_TRACKS } from "./music-provider";

export const CURRENT_USER = {
  id: "user-1",
  name: "Athi Raj",
  username: "athiraj.kp",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
};

export const INITIAL_SESSION = {
  id: "session-1",
  title: "Listen Together Room 🎧",
  host: CURRENT_USER,
  coHosts: [],
  participants: [
    CURRENT_USER,
    { id: "u2", name: "Priyanka S", username: "priyanka.s_p_", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
    { id: "u3", name: "Luna Trader", username: "lunaxtrader", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" }
  ],
  isPublic: true,
  roomCode: "VIBE-9999",
  playbackState: {
    sessionId: "session-1",
    currentTrack: MOCK_TRACKS[0],
    isPlaying: false,
    currentPosition: 0,
    playbackRate: 1.0,
    updatedAt: Date.now(),
    hostId: CURRENT_USER.id,
  },
  queue: [],
  controlMode: "everyone",
  liveChat: [
    { id: "sys-1", author: CURRENT_USER, text: 'Room created! Let\'s vibe together 🎵', time: '10:00 AM', system: true }
  ],
  currentReactions: [],
  syncStatus: "synced",
  driftMs: 0,
};

class RealtimeSessionStore {
  session = { ...INITIAL_SESSION };
  listeners = new Set();
  audioEl = null;
  syncTimer = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.initAudioEngine();
      this.hydrateFromStorage();
      this.startSyncLoop();
    }
  }

  hydrateFromStorage() {
    if (typeof window === "undefined") return;
    try {
      const savedTrack = localStorage.getItem("music_last_track");
      if (savedTrack) {
        this.session.playbackState.currentTrack = JSON.parse(savedTrack);
      }
      const savedQueue = localStorage.getItem("music_last_queue");
      if (savedQueue) {
        this.session.queue = JSON.parse(savedQueue);
      }
      const savedPos = localStorage.getItem("music_last_position");
      if (savedPos) {
        this.session.playbackState.currentPosition = parseFloat(savedPos);
      }
      this.session.playbackState.isPlaying = false;
    } catch (e) {}
  }

  saveStateToStorage() {
    if (typeof window === "undefined") return;
    try {
      if (this.session.playbackState.currentTrack) {
        localStorage.setItem("music_last_track", JSON.stringify(this.session.playbackState.currentTrack));
      }
      localStorage.setItem("music_last_queue", JSON.stringify(this.session.queue));
      localStorage.setItem("music_last_position", String(this.session.playbackState.currentPosition || 0));
    } catch (e) {}
  }

  initAudioEngine() {
    if (!this.audioEl && typeof Audio !== "undefined") {
      this.audioEl = new Audio();
      this.audioEl.preload = "auto";
      this.audioEl.addEventListener("ended", () => {
        this.nextTrack();
      });
      this.audioEl.addEventListener("timeupdate", () => {
        if (this.session.playbackState.isPlaying && this.session.host.id === CURRENT_USER.id) {
          this.session.playbackState.currentPosition = this.audioEl?.currentTime || 0;
          this.session.playbackState.updatedAt = Date.now();
        }
      });
    }
  }

  startSyncLoop() {
    this.syncTimer = setInterval(() => {
      if (this.session.playbackState.isPlaying) {
        const maxDuration = this.session.playbackState.currentTrack?.duration || 215;
        if (this.session.playbackState.currentPosition >= maxDuration) {
          this.session.playbackState.currentPosition = 0;
        } else {
          if (this.audioEl && this.audioEl.src && !this.audioEl.paused && !this.audioEl.ended) {
            this.session.playbackState.currentPosition = this.audioEl.currentTime;
          } else {
            this.session.playbackState.currentPosition += 1;
          }
        }
        this.session.playbackState.updatedAt = Date.now();
      }
      this.calculateSyncDrift();
      this.notify();
    }, 1000);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    this.listeners.forEach((fn) => fn());
  }

  getSession() {
    return this.session;
  }

  calculateSyncDrift() {
    const state = this.session.playbackState;
    if (!state.isPlaying || !state.currentTrack) {
      this.session.syncStatus = "synced";
      this.session.driftMs = 0;
      return;
    }
    if (state.hostId === CURRENT_USER.id) {
      if (this.audioEl && this.audioEl.playbackRate !== 1.0) {
        this.audioEl.playbackRate = 1.0;
      }
      this.session.syncStatus = "synced";
      this.session.driftMs = 0;
      return;
    }
    const now = Date.now();
    const elapsedTime = (now - state.updatedAt) / 1000;
    const expectedPosition = state.currentPosition + elapsedTime * state.playbackRate;
    if (this.audioEl && this.audioEl.src && !this.audioEl.paused && !this.audioEl.error) {
      const currentPos = this.audioEl.currentTime;
      const driftSec = Math.abs(currentPos - expectedPosition);
      this.session.driftMs = Math.round(driftSec * 1000);
      if (driftSec > 3.0) {
        this.audioEl.currentTime = expectedPosition;
        this.session.syncStatus = "syncing";
        setTimeout(() => {
          this.session.syncStatus = "synced";
        }, 800);
      } else if (driftSec > 1.0) {
        this.audioEl.playbackRate = currentPos < expectedPosition ? 1.05 : 0.95;
        this.session.syncStatus = "syncing";
      } else {
        this.audioEl.playbackRate = 1.0;
        this.session.syncStatus = "synced";
      }
    }
  }

  playTrack(track, hostUserId = CURRENT_USER.id) {
    const now = Date.now();
    this.session.playbackState = {
      sessionId: this.session.id,
      currentTrack: track,
      isPlaying: true,
      currentPosition: 0,
      playbackRate: 1.0,
      updatedAt: now,
      hostId: hostUserId,
    };
    if (this.audioEl) {
      const isYouTubeTrack =
        track.audioUrl?.includes("youtube") ||
        track.audioUrl?.includes("youtu.be") ||
        track.id?.length === 11 ||
        !track.audioUrl?.endsWith(".mp3");
      if (!isYouTubeTrack && track.audioUrl) {
        this.audioEl.src = track.audioUrl;
        this.audioEl.currentTime = 0;
        this.audioEl.play().catch(() => {});
      } else {
        this.audioEl.pause();
        this.audioEl.removeAttribute("src");
        this.audioEl.load();
      }
    }
    this.addSystemChatMessage(`${CURRENT_USER.name} played "${track.title}" 🎵`);
    this.saveStateToStorage();
    this.notify();
  }

  togglePlayPause() {
    const state = this.session.playbackState;
    if (!state.currentTrack) return;
    if (state.currentPosition >= (state.currentTrack.duration || 215) - 1) {
      state.currentPosition = 0;
      if (this.audioEl) this.audioEl.currentTime = 0;
    }
    const newIsPlaying = !state.isPlaying;
    state.isPlaying = newIsPlaying;
    state.updatedAt = Date.now();
    if (this.audioEl) {
      state.currentPosition = this.audioEl.currentTime;
      if (newIsPlaying) {
        this.audioEl.play().catch(() => {});
      } else {
        this.audioEl.pause();
      }
    }
    const action = newIsPlaying ? "resumed playback" : "paused playback";
    this.addSystemChatMessage(`${CURRENT_USER.name} ${action} ⏯️`);
    this.saveStateToStorage();
    this.notify();
  }

  pauseAudio() {
    const state = this.session.playbackState;
    if (!state.isPlaying) return;
    state.isPlaying = false;
    state.updatedAt = Date.now();
    if (this.audioEl) {
      state.currentPosition = this.audioEl.currentTime;
      this.audioEl.pause();
    }
    this.saveStateToStorage();
    this.notify();
  }

  seek(positionInSeconds) {
    const state = this.session.playbackState;
    state.currentPosition = positionInSeconds;
    state.updatedAt = Date.now();
    if (this.audioEl) {
      this.audioEl.currentTime = positionInSeconds;
    }
    this.saveStateToStorage();
    this.notify();
  }

  nextTrack() {
    if (this.session.queue.length > 0) {
      const nextQueueItem = this.session.queue[0];
      this.session.queue = this.session.queue.slice(1);
      this.playTrack(nextQueueItem.track);
    } else {
      this.seek(0);
    }
  }

  prevTrack() {
    this.seek(0);
  }

  addToQueue(track, user = CURRENT_USER) {
    const exists = this.session.queue.some(
      (item) => item.track.id === track.id || item.track.title.trim().toLowerCase() === track.title.trim().toLowerCase()
    );
    if (exists) return;
    const newItem = {
      id: `q-${Date.now()}`,
      track,
      addedBy: user,
      votes: 1,
      votedBy: [user.id],
    };
    this.session.queue.push(newItem);
    this.addSystemChatMessage(`${user.name} added "${track.title}" to queue 🎶`);
    this.saveStateToStorage();
    this.notify();
  }

  removeFromQueue(queueItemId) {
    const item = this.session.queue.find((i) => i.id === queueItemId);
    this.session.queue = this.session.queue.filter((i) => i.id !== queueItemId);
    if (item) {
      this.addSystemChatMessage(`${CURRENT_USER.name} removed "${item.track.title}" from queue 🗑️`);
    }
    this.saveStateToStorage();
    this.notify();
  }

  sendReaction(emoji, user = CURRENT_USER) {
    const newReaction = {
      id: `r-${Date.now()}-${Math.random()}`,
      emoji,
      userId: user.id,
      userName: user.name,
      timestamp: Date.now(),
    };
    this.session.currentReactions = [...this.session.currentReactions, newReaction];
    this.notify();
    setTimeout(() => {
      this.session.currentReactions = this.session.currentReactions.filter((r) => r.id !== newReaction.id);
      this.notify();
    }, 3500);
  }

  sendChatMessage(text, user = CURRENT_USER) {
    if (!text.trim()) return;
    const msg = {
      id: `lc-${Date.now()}`,
      author: user,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    this.session.liveChat.push(msg);
    this.notify();
  }

  addParticipant(user) {
    const exists = this.session.participants.some(
      (p) => p.id === user.id || p.username === user.username
    );
    if (!exists) {
      this.session.participants.push(user);
      this.addSystemChatMessage(`${user.name} joined as Listen Together partner 🎧`);
      this.notify();
    }
  }

  removeParticipant(userId) {
    const removedUser = this.session.participants.find((p) => p.id === userId);
    if (removedUser && removedUser.id !== CURRENT_USER.id) {
      this.session.participants = this.session.participants.filter((p) => p.id !== userId);
      this.addSystemChatMessage(`${removedUser.name} left the room 👋`);
      this.notify();
    }
  }

  addSystemChatMessage(text) {
    this.session.liveChat.push({
      id: `sys-${Date.now()}`,
      author: CURRENT_USER,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      system: true,
    });
  }
}

export const realtimeStore = new RealtimeSessionStore();

export function useRealtimeSession() {
  const [session, setSession] = useState(realtimeStore.getSession());
  useEffect(() => {
    const unsubscribe = realtimeStore.subscribe(() => {
      setSession({ ...realtimeStore.getSession() });
    });
    return unsubscribe;
  }, []);
  return {
    session,
    playTrack: (t) => realtimeStore.playTrack(t),
    togglePlayPause: () => realtimeStore.togglePlayPause(),
    pauseAudio: () => realtimeStore.pauseAudio(),
    seek: (pos) => realtimeStore.seek(pos),
    nextTrack: () => realtimeStore.nextTrack(),
    prevTrack: () => realtimeStore.prevTrack(),
    addToQueue: (t) => realtimeStore.addToQueue(t),
    removeFromQueue: (id) => realtimeStore.removeFromQueue(id),
    sendReaction: (emoji) => realtimeStore.sendReaction(emoji),
    sendChatMessage: (txt) => realtimeStore.sendChatMessage(txt),
    addParticipant: (u) => realtimeStore.addParticipant(u),
    removeParticipant: (id) => realtimeStore.removeParticipant(id),
  };
}
