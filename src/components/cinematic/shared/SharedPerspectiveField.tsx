import React from 'react';

export const SharedPerspectiveField: React.FC = () => {
  return (
    <div className="shared-rail-story-rig absolute inset-0 z-6 pointer-events-none overflow-hidden select-none">
      {/* Intentionally transparent container to prevent synthetic starburst lines from polluting the scene */}
    </div>
  );
};
