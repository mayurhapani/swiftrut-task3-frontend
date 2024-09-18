import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import Cookies from "universal-cookie";
import { AuthContext } from "../context/AuthProvider";

// const cookies = new Cookies();

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const notify1 = (msg) => toast.error(msg);
  const notify2 = (msg) => toast.success(msg);

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  const loginData = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      notify1("Invalid email format");
      return;
    }
    if (!passwordRegex.test(password)) {
      notify1(
        "Invalid password format,  must contain a number, must contain one lowercase, must contain one uppercase, must contain one special character, password must be 8-16 characters long"
      );
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const token = response.data.data.token;

        localStorage.setItem("token", token);
        localStorage.setItem("id", response.data.data.user._id);
        setIsLoggedIn(true);

        notify2(response.data.message);
        navigate("/");
      } else {
        notify1(response.data.message);
        navigate("/signin");
      }
    } catch (error) {
      if (error.response) {
        notify1(error.response.data.message);
      } else {
        notify1(error.message);
      }
      navigate("/signin");
    }
  };

  return (
    <div className=" bg-[url(./assets/images/main_bg.jfif)] bg-no-repeat bg-cover h-screen">
      <div className="container mx-auto ">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-red-100 p-10 rounded-md text-center">
            <h1 className="mb-10 text-2xl md:text-5xl font-bold text-gray-600">
              Sundaram Enterprise
            </h1>

            <form className="flex flex-col gap-2" action="" onSubmit={loginData}>
              <input
                className="mb-3 p-2 rounded-sm"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
              />
              <input
                className="mb-3 p-2 rounded-sm"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
              />
              <button className=" bg-blue-500 text-white rounded-md py-1 my-4" type="submit">
                Sign in
              </button>
              <p>
                Already have not an account?{" "}
                <Link className="text-blue-600" to="/signup">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
