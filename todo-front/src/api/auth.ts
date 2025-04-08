export const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('authToken');

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers as Record<string, string>,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`http://localhost:8082${url}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
};