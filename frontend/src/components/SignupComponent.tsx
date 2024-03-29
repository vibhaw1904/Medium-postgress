import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SignupInput } from "@vibhaw/medium-common";
import axios from "axios";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
export const Signupcomponent=({type}:{type:"signup"|"signin"})=>{
    const navigate=useNavigate();
    const [postInputs,setPostInputs]=useState <SignupInput>({
        email:"",
        password:"",
        name:""
    })

const signupHandler=async()=>{
    try {
        const response=await axios.post(`${API_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs)
        const jwt=response.data;
        localStorage.setItem('token', jwt)
        console.log(localStorage.getItem('token'))
        navigate('/blogs')
    } catch (error) {
        console.log("error signing up",error)
    }
}

    return <div className="h-screen flex justify-center flex-col">
    <div className="flex justify-center">
      <a
        href="#"
        className=""
      >
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
          </div>
          <div className="text-gray-300 text-sm flex justify-center">
            {type==="signup" ?"Already have an account? " : "Don't have an account"}
            <Link to={type==="signup"?'/signin':'/signup'} className="pl-2 underline">{type==="signin"?"Sign up" :"Sign in"}</Link>
          </div>
          <div className="pt-2">
            {type==="signup" ? <LabelledInput
            type="text"
              label="Username"
              placeholder="Enter your username"
              onChange={(e)=>setPostInputs({
                ...postInputs,
                name:e.target.value
              })}
            />:null}
            <LabelledInput
             type="email"
              label="Email"
              placeholder="ex@gmail.com"
              onChange={(e)=>setPostInputs({
                ...postInputs,
                email:e.target.value
              })}
            />
             <LabelledInput
              label="Password"
              type="password"
              onChange={(e)=>setPostInputs({
                ...postInputs,
                password:e.target.value
              })}
              placeholder="12345"
            />
            <button
              onClick={signupHandler}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
                {type==="signup" ?"sign up" : "sign in"}            </button>
          </div>
        </div>
      </a>
    </div>
  </div>
        
}

interface LabelledInputType{
    label: string;
    placeholder: string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string
  }
  
  function LabelledInput({ label, placeholder, onChange ,type}: LabelledInputType) {
    return (
      <div>
        <label className="block mb-2 text-sm font-semibold pt-4">{label}</label>
        <input
          id="first_name"
          className="bg-gray border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder={placeholder}
          required
          onChange={onChange}
          type={type || "text"}
        />
      </div>
    );
  }