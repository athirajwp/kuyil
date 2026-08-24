import React, { useState, useRef } from 'react';
import { X, Camera } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EditProfileModal = () => {
  const { isEditProfileOpen, setIsEditProfileOpen, user, setUser } = useApp();
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const fileInputRef = useRef(null);

  if (!isEditProfileOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      name,
      bio,
      avatar,
      onboarding: {
        ...user.onboarding,
        addedBio: !!bio.trim(),
        addedPhoto: !!avatar.trim()
      }
    });
    setIsEditProfileOpen(false);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--bg-primary)',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setIsEditProfileOpen(false)} style={{ padding: '4px', color: 'var(--text-primary)' }}>
            <X size={22} />
          </button>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>Edit Profile</h3>
          <button 
            onClick={handleSave}
            style={{ fontSize: '15px', fontWeight: '700', color: 'var(--accent-blue)' }}
          >
            Done
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Hidden File Input for Avatar Upload */}
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/*" 
            style={{ display: 'none' }} 
            onChange={handleFileChange} 
          />

          {/* Clickable Profile Avatar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '8px 0', gap: '6px' }}>
            <div 
              onClick={() => fileInputRef.current?.click()}
              style={{ position: 'relative', cursor: 'pointer' }}
              title="Click to upload profile photo"
            >
              <img 
                src={avatar} 
                alt="Profile Avatar" 
                style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--bg-secondary)' }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'var(--accent-blue)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Camera size={15} />
              </div>
            </div>
            <span 
              onClick={() => fileInputRef.current?.click()}
              style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent-blue)', cursor: 'pointer' }}
            >
              Change profile photo
            </span>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '15px',
                marginTop: '4px'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>Bio</label>
            <textarea 
              rows={3}
              value={bio} 
              onChange={(e) => setBio(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '15px',
                marginTop: '4px',
                resize: 'none'
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
