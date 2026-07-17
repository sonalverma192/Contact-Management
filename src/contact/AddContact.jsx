import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom"
import profilePic from '../assets/profilePic.png'

const AddContact = () => {

    const apibaseUrl = import.meta.env.VITE_API_URL

    const navigate = useNavigate()

    const formRef = useRef(null)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('Female')
    const [image, setImage] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const [isValid , setValid] = useState(false)

    const { state } = useLocation()

    useEffect(() => {
        if (state) {
            setFullName(state.fullName)
            setAddress(state.address)
            setEmail(state.email)
            setGender(state.gender)
            setPhone(state.phone)
            setImageUrl(state.imageUrl)
        }
        else {
            reset()
        }
    }, [state])

    const submitHandeler = async (e) => {
        e.preventDefault()
        setLoading(true)
        //  console.log(fullName,email,phone,address,gender)

        try {
            const formData = new FormData()
            formData.append('fullName', fullName),
                formData.append('email', email),
                formData.append('phone', phone),
                formData.append('address', address),
                formData.append('gender', gender)
            if (image) {
                formData.append('photo', image)
            }

            if (state) {
                // update
                const res = await axios.put(`${apibaseUrl}/contact/update/${state._id}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                setLoading(false)
                toast.success('Contact Update ✅ !', {
                    position: 'top-right',
                });
                reset()
            }
            else {
                const res = await axios.post(`${apibaseUrl}/contact/add-contact`, formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                setLoading(false)
                toast.success('Contact Added ✅ !', {
                    position: 'top-right',
                });
                reset()
            }
            navigate('/dashboard/ContactList')
        }
        catch (err) {
            setLoading(false)
            console.log(err)

            console.log(localStorage.getItem("token"));
            toast.error('Something is Wrong ❌ !', {
                position: 'top-right',
            });
        }
    }

    const reset = () => {
        setFullName('')
        setAddress('')
        setEmail('')
        setGender('Female')
        setPhone('')
        document.getElementById('contactForm').reset()
        setImage(null)
        setImageUrl(null)
    }


    const imageFile = (e) => {
        setImage(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    const handleChange = ()=>{
        setValid(formRef.current.checkValidity())
    }


    return (
        <div>
            <div className="add-form">
                <form ref={formRef} onChange={handleChange} id='contactForm' onSubmit={submitHandeler} className="form">
                    <input required={!state} placeholder="Full Name" value={fullName} type="text" onChange={(e) => { setFullName(e.target.value) }} />
                    <input required={!state} placeholder="Email" value={email} type="email" onChange={(e) => { setEmail(e.target.value) }} />
                    <input required={!state} minLength={10} maxLength={10} placeholder="Phone" value={phone} type="number" onChange={(e) => { setPhone(e.target.value) }} />
                    <input required={!state} placeholder="Address" value={address} type="text" onChange={(e) => { setAddress(e.target.value) }} />
                    <select value={gender} onChange={(e) => { setGender(e.target.value) }}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <div className="profileImage-wrapper">
                        <img onClick={() => { document.getElementById("profile-image").click() }} className="profileImage" src={imageUrl ? imageUrl : profilePic} alt="image" />
                        <input id="profile-image" onChange={imageFile} placeholder="Image" style={{ height: "35px", padding: "5px" }} type="file" />
                    </div>
                    <button disabled={!isValid} type="submit" className={isValid ? 'add-btn' : 'disable-btn'}>{isLoading && <span><i className="fa-solid fa-circle-notch fa-spin"></i></span>} {state ? 'Update Contact' : 'Add Contact'}</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddContact