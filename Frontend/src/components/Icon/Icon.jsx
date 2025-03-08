import React from "react";
import { ReactComponent as LightningIcon } from "../../assets/icon.svg"; // Importăm SVG-ul

const Icon = ({ size = 48 }) => {
  return (
    <div style={{ width: size, height: size }}>
      <LightningIcon width="100%" height="100%" />
    </div>
  );
};

export { Icon }; // Named export pentru a menține compatibilitatea cu importurile existente
export default Icon; // Default export pentru utilizare flexibilă
