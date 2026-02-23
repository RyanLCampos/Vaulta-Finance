import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (error) {
            alert("Email ou senha inválidos");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-[90%] max-w-md">
                <div className="cards rounded-lg shadow-lg p-6">
                    <h2 className="text-primary text-xl font-semibold mb-1">
                        Seja Bem-vindo!
                    </h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Acesse sua conta para continuar
                    </p>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div>
                            <label className="text-gray-500 text-xs">Email</label>
                            <input
                                type="email"
                                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-gray-500 text-xs">Senha</label>
                            <input
                                type="password"
                                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-primary text-white py-2 rounded-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                        >
                            Entrar
                        </button>
                    </form>

                    <p className="text-xs text-gray-500 mt-6 text-center">
                        Não possui conta?{" "}
                        <Link to="/register" className="text-primary font-medium">
                            Criar conta
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}