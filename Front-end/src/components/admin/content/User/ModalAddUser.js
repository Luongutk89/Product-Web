import { useEffect, useState } from 'react';
import { BiCloudUpload, BiXCircle } from "react-icons/bi";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { createUser } from '../../../../services/apiService';
import { fetchAllUsers } from "../../../../redux/slices/userSlice";

function ModalAddUser(props) {
    const { modalAddUser, setModalAddUser } = props;
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("user");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");


    const handleClose = () => {
        setModalAddUser(false)
        setUsername("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAddress("");
        setRole("user");
        setImage("");
        setPreviewImage("");
    }


    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        }
    }


    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    const handleSubmitCreateUser = async () => {
        const isValidateEmail = validateEmail(email);

        if (!username) {
            toast.error("Please Enter a Username");
            return;
        }

        if (!isValidateEmail) {
            toast.error("Email Error Malformed");
            return;
        }

        if (!password) {
            toast.error("Please Enter a Password");
            return;
        }

        if (!phone) {
            toast.error("Please Enter a Phone");
            return;
        }

        if (!address) {
            toast.error("Please Enter a Address");
            return;
        }


        let data = await createUser(username, email, password, phone, address, role, image);
        console.log(data);
        if (data && data.errCode === 0) {
            toast.success("Success");
            const page = 1;
            const limit = 7;
            dispatch(fetchAllUsers({ page, limit }));
            handleClose();
        } else {
            toast.error("Error");
        }
    }

    return (
        <>
            <Modal
                show={modalAddUser}
                onHide={() => handleClose()}
                size="lg"
                backdrop="static"
                className='modal-add'
            >
                <Modal.Header closeButton className='demo'>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-add'>
                        <div className="box-left">
                            <div className="form-group">
                                <label htmlFor="">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Phone</label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Role</label>
                                <select onChange={(e) => setRole(e.target.value)}>
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                            </div>
                        </div>


                        <div className="box-right">
                            <input hidden
                                type="file"
                                id="upload"
                                onChange={(e) => handleUploadImage(e)}
                            />
                            <label className="label-upload" htmlFor="upload">
                                <BiCloudUpload
                                    className="arrow-up"
                                />
                                <span className='text-browse'>Browse file to upload</span>
                                <span className='btn-browse'>Browse file</span>
                            </label>
                            <img className="image-preview" src={previewImage} />
                            <BiXCircle
                                className='clone-image'
                                onClick={() => {
                                    setPreviewImage("");
                                    setImage("");
                                }}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => handleClose()}
                        className="btn-close-user"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => handleSubmitCreateUser()}
                        className="btn-add-user"
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddUser;