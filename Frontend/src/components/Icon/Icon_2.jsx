import React from 'react';

const Icon = ({ id, size = 48 }) => {
    if (id === "logo") {
        return (
            <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="10" fill="black"/>
                <path d="M24 10L14 30H34L24 10Z" fill="white"/>
            </svg>
        );
    }
    return null;
};

export { Icon }; // Named export pentru a menține compatibilitatea cu importurile existente
export default Icon; // Default export pentru utilizare flexibilă