import { useState } from "react";

export default function useError(initialValue: string) {
    const [error, setError] = useState<string>(initialValue);

    const handleError = (message: string) => {
        setError(message);
        setTimeout(() => setError(""), 5000);
    };

    return { error, handleError };
}