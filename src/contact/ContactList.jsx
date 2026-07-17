import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const ContactList = () => {

    const apibaseUrl = import.meta.env.VITE_API_URL
    const [contactList, setContactList] = useState([])
    const [isLoading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getContact()
    }, [])

    const getContact = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${apibaseUrl}/contact/all-contact`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
            setLoading(false)
            console.log(res.data)
            setContactList(res.data.contacts)
        }
        catch (err) {
            console.log(err)
            console.log(err.response);
            setLoading(false)
        }
    }


    return (
        <div>
            <div>
                {isLoading ? <span><i className="fa-solid fa-circle-notch fa-spin"></i></span> :
                    <div>
                        {
                            contactList.length == 0 ?
                                <p>No Contact Found........... <Link to="/dashboard/AddContact">  Add Contact</Link> </p> :
                                <div className="contact-wrapper">
                                    {
                                        contactList.map((data) => (
                                            <div onClick={() => {navigate(`/dashboard/contactDetail/` + data._id) }} key={data._id} className="contact-card">
                                                <img src={data.imageUrl} />
                                                <p className="name">{data.fullName}</p>
                                                <p className="phone">{data.phone}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default ContactList