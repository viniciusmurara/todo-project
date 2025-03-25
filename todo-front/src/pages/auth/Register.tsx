import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            const data = await response.json();

            localStorage.setItem("authToken", data.token);
            navigate("/");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setError("Registration failed (email might be taken)");
        }
    };


    return (
        <form className="flex flex-col justify-center items-center h-svh gap-12" onSubmit={handleSubmit}>
            <h1 className="text-4xl font-semibold">Register</h1>
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
                <div className="px-4 py-3 bg-neutral-600">
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
                <div className="px-4 py-3 bg-neutral-600 rounded-b-lg">
                    <input
                        className="bg-neutral-600 outline-none"
                        type="password"
                        placeholder="Repeat Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        size={42}
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <p className="pt-2 text-sm">
                    Already have an account? <Link to={"/login"} className="hover:underline text-blue-400">Click here!</Link>
                </p>
            </div>
            <button className="px-5 py-2 bg-neutral-600 rounded-lg hover:bg-neutral-500" type="submit">
                Sign Up
            </button>
        </form>
    )
}