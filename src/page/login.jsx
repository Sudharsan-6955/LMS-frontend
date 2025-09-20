import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";

const title = "Login";
const socialTitle = "Login With Social Media";
const btnText = "Submit Now";

const socialList = [
    { link: '#', iconName: 'icofont-facebook', className: 'facebook' },
    { link: '#', iconName: 'icofont-twitter', className: 'twitter' },
    { link: '#', iconName: 'icofont-linkedin', className: 'linkedin' },
    { link: '#', iconName: 'icofont-instagram', className: 'instagram' },
    { link: '#', iconName: 'icofont-pinterest', className: 'pinterest' },
];

const LoginPage = () => {
    const [formData, setFormData] = useState({ name: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                name: formData.name,
                password: formData.password
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setTimeout(() => {
                navigate("/");
            }, 100); // ensure localStorage completes
        } catch (err) {
            const message = err.response?.data?.message || "Login failed";
            setError(message);

            if (message.toLowerCase().includes("not found") || message.toLowerCase().includes("no user")) {
                setTimeout(() => {
                    navigate("/signup");
                }, 3000); // redirect to signup after 3 seconds
            }
        }
    };

    return (
        <Fragment>
            <Header />
            <PageHeader title={'Login Page'} curPage={'Login'} />
            <div className="login-section padding-tb section-bg">
                <div className="container">
                    <div className="account-wrapper">
                        <h3 className="title">{title}</h3>
                        <form className="account-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="User Name *"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group" style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password *"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '15px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        fontSize: '18px',
                                        color: '#666'
                                    }}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </span>
                            </div>

                            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                            <div className="text-end pt-2">
                                <Link to="/forgot-password" className="text-sm text-primary">Forgot Password?</Link>
                            </div>

                            <div className="form-group text-center">
                                <button className="d-block lab-btn"><span>{btnText}</span></button>
                            </div>
                        </form>

                        <div className="account-bottom">
                            <span className="d-block cate pt-10">
                                Don’t Have any Account? <Link to="/signup">Sign Up</Link>
                            </span>
                            <span className="or"><span>or</span></span>
                            <h5 className="subtitle">{socialTitle}</h5>
                            <ul className="lab-ul social-icons justify-content-center">
                                {socialList.map((val, i) => (
                                    <li key={i}>
                                        <a href={val.link} className={val.className}>
                                            <i className={val.iconName}></i>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default LoginPage;
