import { useState } from "react"
import api from "../../api/api"
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()

    try {
      await api.post("/users", {
        name,
        email,
        password
      })

      navigate("/")
    } catch (error) {
      alert("Erro ao cadastrar")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[90%] max-w-md">
        <div className="cards rounded-lg shadow-lg p-6">
          <h2 className="text-primary text-xl font-semibold mb-1">
            Cadastre-se Agora!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Comece a organizar suas finanças hoje
          </p>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="text-gray-500 text-xs">Nome</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              Criar conta
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-6 text-center">
            Já possui conta?{" "}
            <Link to="/" className="text-primary font-medium">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}