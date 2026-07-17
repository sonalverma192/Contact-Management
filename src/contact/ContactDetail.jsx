import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import swal from 'sweetalert';

const ContactDetail = () => {

    const navigate = useNavigate()
    const [contact, setContact] = useState({})
    const [isLoading, setLoading] = useState(true)
    const { id } = useParams();


    useEffect(() => {
        getContactById()
    }, [])

    const getContactById = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/contact/Contact/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            setContact(res.data.contact)
            // console.log(res.data)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }
    }


    const deleteHandeler = async (id) => {
        try {
            
          const res = await swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this contact !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        if(res)
        {
            setLoading(true)
            const dlt = await await axios.delete(`${import.meta.env.VITE_API_URL}/contact/${id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setLoading(false)
             navigate('/dashboard/ContactList')
            swal("Success!", "Contact Deleted Successfully!", "success");
        }
        }
            
        catch (err) {
            console.log(err)
            setLoading(false)
            swal("Error!", "Something is wrong!", "error");
        }
    }


    return (
        <div className="contactList-wrapper">
            {
                isLoading ? <span><i className="fa-solid fa-circle-notch fa-spin"></i></span> :
                    <div className="contactList-box">
                        <img src={contact.imageUrl} alt="profile" />
                        <div className="contactList-detail">
                            <h1>{contact.fullName}</h1>
                            <p> <i className="fa-regular fa-envelope"></i> Email: {contact.email}</p>
                            <p> <i className="fa-solid fa-circle-user"></i> Contact: {contact.phone}</p>
                            <p> <i className="fa-solid fa-location-dot"></i> Address: {contact.address}</p>
                            <p> <i className="fa-regular fa-user"></i> Gender: {contact.gender}</p>
                            <div className="contact-btn">
                                <button className="edit-btn" onClick={()=>{navigate('/dashboard/edit',{state:contact})}}><span><i className="fa-solid fa-pen-to-square"></i></span>  Edit</button>
                                <button className="dlt-btn" onClick={() => { deleteHandeler(contact._id) }}><span><i className="fa-solid fa-trash-can"></i></span> Delete</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
export default ContactDetail