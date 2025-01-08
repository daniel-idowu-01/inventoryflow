import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import axios from 'axios';
import { Button, Checkbox, Label, TextInput, Spinner } from 'flowbite-react';

function Login() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  // function to update user input
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // function to send user info to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true)
    axios.post("https://localhost:4000/api/login", form, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
        authContext.signin(response.data._id, () => {
          navigate('/')
        })
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("Something went wrong ", error);
        setError(true)
        setErrorMessage('Email or Password Not Correct')
        setTimeout(() => {
          setError(false)
        }, 2000)
        setIsLoading(false)
      });

  };

  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen  items-center place-items-center">
        <article className="relative flex justify-center">
          <img
            className="animate-img w-[80%]"
            src={require("../assets/home.png")}
            alt=""
          />
        </article>

        <article className="w-full max-w-md space-y-8 p-10 rounded-lg">
          <div>
            <img
              className="mx-auto h-12 w-auto rotate-180"
              src={require("../assets/logo.png")}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Login to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <span
                className="font-medium text-[#407BFF] hover:text-indigo-500 ml-1"
              >
                start your 14-day free trial
              </span>
            </p>
          </div>

          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <article>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                onChange={handleInputChange}
                required
              />
            </article>

            <article>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                name="password"
                onChange={handleInputChange}
                required
              />
            </article>

            {error && <p className="text-xs text-red-500 italic">{errorMessage}</p>}

            <article className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>

              <div>
                <Link
                  to=''
                  className="text-sm text-[#407BFF] hover:text-purple-600 underline"
                >
                  Forgot password?
                </Link>
              </div>
            </article>

            <Button
              type="submit"
              className="bg-[#407BFF]"
            >
              {isLoading ? <Spinner aria-label="Default status example" /> : 'Login'}
            </Button>
          </form>

          <p className="text-sm">
            Don't have an account?
            <span className="text-[#407BFF] underline ml-1 hover:text-purple-600">
              <Link to='/register'>Create an account</Link>
            </span>
          </p>
        </article>
      </div>
    </main>
  );
}

export default Login;
