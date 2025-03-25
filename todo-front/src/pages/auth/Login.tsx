import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8082/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();

            localStorage.setItem("authToken", data.token);
            navigate("/");
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <form className="flex flex-col justify-center items-center h-svh gap-12" onSubmit={handleSubmit}>
            <h1 className="text-4xl font-semibold">Login</h1>
            <div className="space-y-1">
                <div className="px-4 py-3 bg-neutral-600 rounded-t-lg">
                    <input
                        className="bg-neutral-600 outline-none"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        size={42}
                    />
                </div>
                <div className="px-4 py-3 bg-neutral-600 rounded-b-lg">
                    <input
                        className="bg-neutral-600 outline-none"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        size={42}
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <p className="pt-2 text-sm">
                    Don't have an account? <Link to={"/register"} className="hover:underline text-blue-400">Click here!</Link>
                </p>
            </div>
            <button type="submit" className="px-5 py-2 bg-neutral-600 rounded-md hover:bg-neutral-500">
                Sign In
            </button>
        </form>
    )
}