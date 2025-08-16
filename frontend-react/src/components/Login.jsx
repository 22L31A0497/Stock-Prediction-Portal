import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider"; // ✅ correct context

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setIsLoggedIn } = useContext(AuthContext); // ✅ use setIsLoggedIn from AuthProvider
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userData = { username, password };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/token/",
        userData
      );

      // Save tokens to localStorage
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      console.log("Login Successful");
      setIsLoggedIn(true); // ✅ mark as logged in

      navigate("/");
    } catch (err) {
      console.error("Invalid credentials", err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-5 rounded">
          <h3 className="text-light text-center">Login to our portal</h3>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="text"
                className="form-control mt-4"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <div className="text-danger mb-3">{error}</div>}

            {loading ? (
              <button
                type="submit"
                className="btn btn-info d-block mx-auto"
                disabled
              >
                Logging In...
              </button>
            ) : (
              <button type="submit" className="btn btn-info d-block mx-auto">
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
