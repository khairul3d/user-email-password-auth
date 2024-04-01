import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [registerError, setRegisterError] = useState('')
  const [sucsess, setSucsess] = useState('')
  const emailRef = useRef(null)

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setRegisterError('')
        setSucsess('')

        // add validation
       signInWithEmailAndPassword(auth, email, password)

       .then(result => {
        console.log(result.user);
        if(result.user.emailVerified){
          setSucsess('User Login Sucsessfully')
        }
        else('please varify your email')
       })
       .catch(error => {
        console.error(error);
        setRegisterError(error.message)
       })

    }

    const handleResetPassword = () => {
      const email = emailRef.current.value;
      if(!email){

        console.log('plese valid an email',emailRef.current.value);
        return;
      }
      else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        console.log('provide your email');
      }
      // send validation email
     sendPasswordResetEmail(auth, email)
     .then(() => {
      alert('please check your email')
     })
     .catch(error => {
       console.log(error);
     })

    }
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email"
                ref={emailRef}
                 name="email" 
                 placeholder="email" 
                 className="input input-bordered"
                  required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" onClick={handleResetPassword} className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button  className="btn btn-primary">Login</button>
              </div>
            </form>
            {
                    registerError && <p className=" text-red-600">{registerError}</p>
                }
                {
                    sucsess && <p className=" text-green-600 ml-20">{sucsess}</p>
                }
                <p className=" ml-16 mb-5"> switch to   <Link to="/register"><a className=" underline text-green-500" href="">Register Page</a></Link></p>
          </div>
        </div>
      </div>
    );
};

export default Login;