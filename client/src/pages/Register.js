import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import axios from "axios";
import { Button, Checkbox, Label, TextInput, Spinner } from "flowbite-react";

function Register() {
  const navigate = useNavigate();
  const preset_key = process.env.REACT_APP_CLOUDINARY_PRESET_KEY;
  const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    imageUrl: "",
  });

  // function to update user input
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // function to upload image to cloudinary
  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", preset_key);

    setImageLoading(true);
    await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({ ...form, imageUrl: data.url });
        setImageLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setImageLoading(false);
      });
  };

  // function to register user
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    axios
      .post("https://inventoryflow.onrender.com/api/auth", form, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error?.response.data.message);
        setTimeout(() => {
          setError(false);
        }, 4000);
        setIsLoading(false);
      });
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen  items-center place-items-center">
        <article className="relative flex justify-center">
          <img
            className="animate-img w-[80%]"
            src={require("../assets/home.png")}
            alt=""
          />
        </article>

        <article className="w-full max-w-md space-y-8  p-10 rounded-lg">
          <div>
            <img
              className="mx-auto h-12 w-auto rotate-180"
              src={require("../assets/logo.png")}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register your account
            </h2>
          </div>

          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={handleSubmit}
          >
            {/* first name and last name */}
            <div className="flex gap-2">
              <article>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="First Name" />
                </div>
                <TextInput
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  onChange={handleInputChange}
                  required
                />
              </article>

              <article>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Last Name" />
                </div>
                <TextInput
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  onChange={handleInputChange}
                  required
                />
              </article>
            </div>

            {/* email */}
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

            {/* password */}
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

            {/* phone number */}
            <article>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Phone Number" />
              </div>
              <TextInput
                id="phoneNumber"
                type="number"
                name="phoneNumber"
                onChange={handleInputChange}
                required
              />
            </article>

            {/* upload image component */}
            <div>
              <UploadImage uploadImage={uploadImage} />
              <p className="text-green-500 text-sm">
                {imageLoading ? (
                  <Spinner aria-label="Default status example" />
                ) : (
                  ""
                )}
              </p>
            </div>

            {error && (
              <p className="text-xs text-red-500 italic">{errorMessage}</p>
            )}

            <article className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
            </article>

            <Button type="submit" className="bg-[#407BFF]">
              {isLoading ? (
                <Spinner aria-label="Default status example" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="text-sm">
            Already have an account?
            <span className="text-[#407BFF] underline ml-1 hover:text-purple-600">
              <Link to="/login">Login here</Link>
            </span>
          </p>
        </article>
      </div>
    </>
  );
}

export default Register;
