import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Drawer } from './components/Drawer';
import { EditProfileModal } from './components/EditProfileModal';

import { GlobalAudioEngine } from './components/listen/GlobalAudioEngine';
import { MiniMusicPlayer } from './components/listen/MiniMusicPlayer';
import { ListenTogetherRoom } from './components/listen/ListenTogetherRoom';
import { useRealtimeSession } from './lib/realtime-store';

import { FeedView } from './views/FeedView';
import { MessagesView } from './views/MessagesView';
import { ActivityView } from './views/ActivityView';
import { ProfileView } from './views/ProfileView';
import { SettingsView } from './views/SettingsView';
import { SavedView, LikedView } from './views/SavedLikedView';
import { VoiceRoomsView } from './components/voice/VoiceRoomsView';
import { MiniVoiceSpaceBar } from './components/voice/MiniVoiceSpaceBar';

const MainContent = () => {
  const { activeTab } = useApp();

  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <FeedView />;
      case 'messages':
        return <MessagesView />;
      case 'listen':
        return <ListenTogetherRoom />;
      case 'voice':
        return <VoiceRoomsView />;
      case 'activity':
        return <ActivityView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      case 'saved':
        return <SavedView />;
      case 'liked':
        return <LikedView />;
      default:
        return <FeedView />;
    }
  };

  return (
    <main style={{ flex: 1, minHeight: 'calc(100vh - 120px)' }}>
      {renderView()}
    </main>
  );
};

class GlobalErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Global App Error Caught:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 20px', fontFamily: 'sans-serif', textAlign: 'center', color: '#111', backgroundColor: '#fff', minHeight: '100vh' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: '#ef4444' }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '20px', maxWidth: '480px', margin: '0 auto 20px auto' }}>
            {this.state.error?.toString() || "An unexpected error occurred."}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null });
                window.location.reload();
              }}
              style={{ padding: '10px 24px', borderRadius: '30px', backgroundColor: '#1877f2', color: '#fff', fontWeight: '700', border: 'none', cursor: 'pointer' }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  return (
    <GlobalErrorBoundary>
      <AppProvider>
        <div className="app-container">
          <Navbar />
          <MainContent />
          <BottomNav />

          {/* Global Persistent Audio Engine */}
          <GlobalAudioEngine />
          <AppConsumerAudioPlayer />

          {/* Global Overlays & Mini Players */}
          <MiniVoiceSpaceBar />
          <Drawer />
          <EditProfileModal />
        </div>
      </AppProvider>
    </GlobalErrorBoundary>
  );
}

const AppConsumerAudioPlayer = () => {
  const { activeTab, setActiveTab } = useApp();
  const { pauseAudio } = useRealtimeSession();

  useEffect(() => {
    if (activeTab === 'voice') {
      if (typeof pauseAudio === 'function') pauseAudio();
    }
  }, [activeTab]);

  // Hide mini player on listen room and voice spaces pages
  if (activeTab === 'listen' || activeTab === 'voice') return null;
  return <MiniMusicPlayer onOpenFullRoom={() => setActiveTab('listen')} />;
};

export default App;
