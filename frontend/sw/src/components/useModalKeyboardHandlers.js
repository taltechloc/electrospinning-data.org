import { useEffect } from "react";

export function useModalKeyboardHandlers({ onClose, onSave, dependencies = [] }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
            } else if (e.key === "Enter") {
                if (e.target.tagName !== "TEXTAREA") {
                    e.preventDefault();
                    onSave();
                    onClose();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose, onSave, ...dependencies]);
}
