"use client"
import React, {useState} from "react";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <main className="flex flex-1 h-screen w-full mx-0 flex-row bg-gradient-to-b from-purple-500 to-yellow-300">
            <div className="relative z-20 flex flex-col pl-0 w-[60%]">
                <img 
                    src={process.env.PUBLIC_URL + "/logo1.svg"}
                    alt="logo"
                    width={150}
                    className="py-5"
                />
                <img 
                    src={process.env.PUBLIC_URL + "/building.png"}
                    alt="building"
                    className="absolute bottom-0 w-full h-auto object-cover"
                />
            </div>
            <div className="relative w-[40%] bg-white">
                <img
                    src={process.env.PUBLIC_URL + "/decoration1.svg"}
                    alt="decoration"
                    width={200}
                    height={200}
                    className="absolute right-0"
                />
                <img
                    src={process.env.PUBLIC_URL + "/decoration2.svg"}
                    alt="decoration"
                    width={150}
                    height={150}
                    className="absolute bottom-0 left-0"
                />
                <img
                    src={process.env.PUBLIC_URL + "/decoration3.svg"}
                    alt="decoration"
                    width={250}
                    height={250}
                    className="absolute right-20"
                />
                <div className="w-[400px] h-[500px] absolute inset-0 mx-auto my-auto object-cover bg-white border-2 border-gray-200 rounded-md shadow-lg">
                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 p-8 md:mb-0 gap-4">
                        <form className="w-full">
                            <h1 className="bold-32 my-3">
                                Log In
                            </h1>
                            <h3 className="bold-12 pb-5">
                                Log in with registered account
                            </h3>
                            <div className="field">
                                <label className="label pb-2">Email</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Email' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input
                                        type="password"
                                        className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        placeholder='******' />
                                </div>
                            </div>
                            <a href="" className="italic">Forget password?</a>
                            <div className="field mt-5">
                                <button type="submit" className="bold-32 bg-yellow-300 p-3 w-full rounded-xl shadow-lg hover:bg-yellow-400">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login;