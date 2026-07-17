import axios from "axios"
import { useRef, useState } from "react"
import { useNavigate , Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

    const apibaseUrl = import.meta.env.VITE_API_URL


    const formRef = useRef(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [isValid , setValid] = useState(false)


    const navigate = useNavigate()


    const submithandeler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const newUser = {
                email: email,
                password: password,
            }
            const res = await axios.post(`${apibaseUrl}/user/login`, newUser)
            setLoading(false)
            console.log(res.data)
            localStorage.setItem('token' , res.data.token )
            localStorage.setItem('fullName',res.data.fullName)

            toast.success('Login ✅', {
                position: 'top-right',
            });

            navigate('/dashboard')
        }
        catch (err) {
            setLoading(false)
            console.log(err)

            toast.error('Something is Wrong ❌', {
                position: 'top-right',
            });
        }
    }

    const handleChange = ()=>{
        console.log(formRef.current.checkValidity())
        setValid(formRef.current.checkValidity())
    }


    return (
        <div className="auth">
            <form ref={formRef} onChange={handleChange} onSubmit={submithandeler} className="login-form">
                <h1>Login</h1>
                <input required type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
                <input required minLength={5} type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                {password.length>=1 && password.length<5 && <p className="error-text">Password length should be at least 5 character</p>}
                <button disabled={!isValid} type="submit" className={isValid ? 'submit-btn' : 'disable-btn'}>{isLoading && <span><i className="fa-solid fa-circle-notch fa-spin"></i></span>}  Login</button>
                <div className="login">
                    <p>Don't have an account ?</p>
                    <Link to="/signup">Signup</Link>
                </div>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Login