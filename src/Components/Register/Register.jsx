import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { useState } from "react";
import { FaRegEye, } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";



const Register = () => {

    const [registerError, setRegisterError] = useState('')
    const [sucsess, setSucsess] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accsepted = e.target.terms.checked;
        console.log(name,email, password,accsepted)
        // reset error
        setRegisterError('')
        setSucsess('')

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password Should Be One Atlist UpporCase');
            return;
        }
        else if(!accsepted){
            setRegisterError('please accepted our tetms and condition!! ')
            return
        }

                 

        // creat a user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSucsess('User Crated Sucsessfully')
                  // send varefication email

                //   updte profile 

                updateProfile(result.user, {
                    displayName: name,
                    photoURL:"https://example.com/jane-q-user/profile.jpg"
                })
                .then(()=> {
                    console.log('Update Your Profile');
                })
                .catch()

                  sendEmailVerification(result.user)
                    .then(() => {
                        alert('please check your email and varifay your account')
                    })
                
            })
            
            
            .catch(error => {
                console.log(error);
                setRegisterError(error.message)

            })


    };


    return (
        <div>
            <div className="mx-auto md:w-1/2">
                <h2 className=" text-3xl font-medium">Plese Register</h2>

                <form onSubmit={handleRegister}>
                    <input className=" mb-4 p-2 m-4 w-2/3 border rounded-lg" type="text" placeholder="Your Name" name="aame" required id="" />
                    <br />
                    <input className=" mb-4 p-2 m-4 w-2/3 border rounded-lg" type="email" placeholder="Email Address" name="email" required id="" />
                    <br />
                      <div className=" relative">
                      <input className="p-2 m-4 w-2/3 border rounded-lg"
                        type={showPassword ? "text" : "password"}

                        placeholder="Password"
                        name="password"
                        required id="" />
                    <span className=" absolute mt-8 -ml-10 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                        {
                            showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>

                        }</span>
                      </div>
                      <br />
                      <input className=" ml-4 mx-2" type="checkbox" name="trems" id="terms" />
                      <label htmlFor="terms">Accsept Our Tram Condition</label>
                    <br />
                    <input className=" btn btn-secondary bg-green-500 p-2 m-4 w-2/3 border rounded-lg" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className=" text-red-600">{registerError}</p>
                }
                {
                    sucsess && <p className=" text-green-600 ml-20">{sucsess}</p>
                }
                 <p className=" ml-16 mb-5"> switch to   <Link to="/login"><a className=" underline text-green-500" href="">Login Page</a></Link></p>
            </div>

        </div>
    );
};

export default Register;