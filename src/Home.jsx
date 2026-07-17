import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#3B82F6", "#EC4899"];


const Home = () => {

    const [contactCount, setContactCount] = useState({})
    const [isloading, setLoading] = useState(false)

    useEffect(() => {
        getCount();
    }, [])
    const navigate = useNavigate()

    const chartData = [
        {
            name: "Male",
            value: contactCount.maleCount || 0,
        },
        {
            name: "Female",
            value: contactCount.femaleCount || 0,
        },
    ];

    const COLORS = ["#3B82F6", "#EC4899"];


    const getCount = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/contact/dashboard`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            console.log(res.data)
            setContactCount(res.data)
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            console.log(err)
        }
    }


    return (
        <div>
            {
                isloading ?
                    <span className="home-loader"><i className="fa-solid fa-circle-notch fa-spin"></i></span>
                    :
                    <div className="home-wrapper">
                        <div className="count-wrapper">
                            <div className="count-card">
                                <h1>{contactCount.count}</h1>
                                <p>Total Contacts</p>
                            </div>
                            <div className="count-card">
                                <h1>{contactCount.maleCount}</h1>
                                <p>Total Male Contact</p>
                            </div>
                            <div className="count-card">
                                <h1>{contactCount.femaleCount}</h1>
                                <p>Total Female Contact</p>
                            </div>
                        </div>
                        <div className="dashboard-bottom">
                            <div className="recent-contact">
                                <p className="recent-head">Recent Contact Added......</p>
                                {contactCount.recentContacts?.map((data) => (
                                    <div key={data._id}  className="recent-contact-item">
                                        <img className="count-image" src={data.imageUrl} alt="profile" />
                                        <div className="recent-info">
                                            <h3>{data.fullName}</h3>
                                            <p>{data.phone}</p>
                                        </div>
                                        <button className="view-btn" onClick={() => { navigate(`/dashboard/contactDetail/` + data._id) }}>View</button>
                                    </div>
                                ))
                                }
                            </div>
                            <div className="chart-box">
                                <ResponsiveContainer  width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={120}
                                            label
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>

                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Home