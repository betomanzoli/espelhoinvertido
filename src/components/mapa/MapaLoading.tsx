
import React from "react";

const MapaLoading: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    </div>
  );
};

export default MapaLoading;
