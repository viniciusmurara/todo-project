import { Link } from "react-router-dom"

export default function Register() {
    return (
        <div className="flex flex-col justify-center items-center h-svh gap-12">
            <h1 className="text-4xl font-semibold">Register</h1>
            <div className="space-y-1">
                <div className="px-4 py-3 bg-neutral-600 rounded-t-lg">
                    <input
                        className="bg-neutral-600 outline-none"
                        type="email"
                        placeholder="Email"
                        size={42}
                    />
                </div>
                <div className="px-4 py-3 bg-neutral-600">
                    <input
                        className="bg-neutral-600 outline-none"
                        type="password"
                        placeholder="Password"
                        size={42}
                    />
                </div>
                <div className="px-4 py-3 bg-neutral-600 rounded-b-lg">
                    <input
                        className="bg-neutral-600 outline-none"
                        type="password"
                        placeholder="Repeat Password"
                        size={42}
                    />
                </div>
                <p className="pt-2 text-sm">
                    Already have an account? <Link to={"/login"} className="hover:underline text-blue-400">Click here!</Link>
                </p>
            </div>
            <Link to={"/"}>
                <button className="px-5 py-2 bg-neutral-600 rounded-lg hover:bg-neutral-500">
                    Sign Up
                </button>
            </Link>
        </div>
    )
}