import axios from "axios"
import { useRef, useState } from "react"
import { useNavigate , Link} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {

    const apibaseUrl = import.meta.env.VITE_API_URL

    const formRef = useRef(null)
    const navigate = useNavigate()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [isValid , setValid] = useState(false)

    const submithandeler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const newUser = {
                fullName: fullName,
                email: email,
                phone: phone,
                password: password,
            }
            console.log("API URL:", apibaseUrl);
            console.log("Sending Data:", newUser);

            const res = await axios.post(`${apibaseUrl}/user/signup`, newUser)
            setLoading(false)
            console.log(res.data)

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.fullName);



            toast.success('Account Created ✅ !', {
                position: 'top-right',
            });

            navigate('/login')
        }
        catch (err) {
            setLoading(false)
            console.log(err)

            toast.error('Something is Wrong ❌ !', {
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
            <form ref={formRef} onChange={handleChange} onSubmit={submithandeler} className="auth-form">
                <h1>Sign Up</h1>
                <h3>Create a new account</h3>
                <input required value={fullName} onChange={(e) => { setFullName(e.target.value) }} placeholder="Full Name" />
                <input required type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
                <input required maxLength={10} minLength={10} value={phone} onChange={(e) => { setPhone(e.target.value) }} placeholder="Phone" />
                <input required minLength={5} type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <button disabled={!isValid} type="submit" className={isValid ? 'submit-btn' : 'disable-btn'}>{isLoading && <span><i className="fa-solid fa-circle-notch fa-spin"></i></span>}  {isLoading ? 'Account Creating' : 'Sign Up'}</button>
                <div className="login">
                    <p>Already have an account ?</p>
                    <Link to="/login" >Login</Link>
                </div>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Signup