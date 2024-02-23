import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import axios from 'axios';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

function Login() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

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

    axios.post("http://localhost:4000/api/login", form, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
        authContext.signin(response.data._id, () => {
          navigate('/')
        })
      })
      .catch((error) => {
        console.log("Something went wrong ", error);
      });

  };

  /* color: 407BFF */

  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen  items-center place-items-center">
        <article className="flex justify-center">
          <img src={require("../assets/home.png")} alt="" />
        </article>

        <article className="w-full max-w-md space-y-8 p-10 rounded-lg">
          <div>
            <img
              className="mx-auto h-12 w-auto"
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
                onChange={handleInputChange}
                required
              />
            </article>

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
              Submit
            </Button>
          </form>
        </article>
      </div>
    </main>
  );
}

export default Login;
