import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          email,
          password,
          name,
          lastName,
        }
      );
      if (response.status === 201) {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (err: any) {
      alert(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          First Name
        </label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none mb-4 focus:ring focus:ring-blue-300"
          required
        />
        <br />
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Last Name
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none mb-4 focus:ring focus:ring-blue-300"
          required
        />
        <br />
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none mb-4 focus:ring focus:ring-blue-300"
          required
        />
        <br />
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full p-2 border rounded focus:outline-none mb-4 focus:ring focus:ring-blue-300"
          required
        />
        <br />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            className="text-blue-700 hover:text-gray-700 transition"
            href="/login"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
