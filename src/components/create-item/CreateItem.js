import { NavLink } from 'react-router-dom';
import './CreateItem.css';
import React, { Component } from "react";
import resourceService from "../../services/resources-service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validation = ({ error, ...rest }) => {
    let checkValidation = false;
    Object.values(error).forEach(val => {
        if (val.length > 0) {
            checkValidation = false
        } else {
            checkValidation = true
        }
    });
    Object.values(rest).forEach(val => {
        if (val === null) {
            checkValidation = false
        } else {
            checkValidation = true
        }
    });

    return checkValidation;
};

export class CreateItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            link: '',
            resource: '',
            description: '',
            error: {
                name: '',
                link: '',
                resource: '',
                description: ''
            }
        }
    }
    componentDidMount() {
        setTimeout(topMenu, 1);
        function topMenu() {
            if (window.location.href.toString().includes("create") && document.querySelector(".add-btn")) {
                document.querySelector(".add-btn").style.display = "none";
            }
        }
    }
    componentWillUnmount(){
        document.querySelector(".add-btn").style.display = "block";
    }
    
    onFormSubmit = async (event) => {
        event.preventDefault();
        let error = { ...this.state.error };
        var name = document.querySelector("[name=name]").value;
        var link = document.querySelector("[name=link]").value;
        var resource = document.querySelector("[name=resource]").value;
        var description = document.querySelector("textarea").value;
        if (!name) {
            error.name = "Item Name Required";
            this.setState({
                error,
                [name]: name
            });
        }
        if (!link) {
            error.link = "Link Required";
            this.setState({
                error,
                [link]: link
            });
        }
        if (!resource) {
            error.resource = "Resource Required";
            this.setState({
                error,
                [resource]: resource
            });
        }
        if (!description) {
            error.description = "Description Required";
            this.setState({
                error,
                [description]: description
            });
        }

        var allFields = name === '' || link === '' || resource === '' || description === '';
        if (validation(this.state) && !allFields) {
            resourceService.createResource().then((res) => {
                console.log(res);
                toast.success("Created Item Successfully", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }).catch(err => {
                console.log(err);
                toast.error("Not added something went wrong", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            });
        } else {
            console.log("Error occured");
            toast.error("Form Fields are Invalid", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    };

    formObject = event => {
        event.preventDefault();

        const { name, value } = event.target;
        let error = { ...this.state.error };

        switch (name) {
            case "name":
                error.name = value.length === 0 ? "Item Name Required" : value.length < 5 ? "Item Name should be 5 characaters long" : "";
                break;
            case "link":
                error.link = value.length === 0 ? "Link Required" : "";
                break;
            case "resource":
                error.resource = value.length === 0 ? "Resource Required" : value.length < 5 ? "Resource should 5 characaters long" : "";
                break;
            case "description":
                error.description = value.length === 0 ? "Description Required" : value.length < 5 ? "Description should 5 characaters long" : "";
                break;
            default:
                break;
        }

        this.setState({
            error,
            [name]: value
        });
    };

    render() {
        const { error } = this.state;
        return (
            <>
                <span className='go-back-user'>
                    <NavLink to="/users" className={({ isActive }) => (isActive ? "link-active" : "link")} > <img src={process.env.PUBLIC_URL + "/assets/chevron-left-solid.svg"} className="left-arrow"  alt="logo" /> Users</NavLink>
                </span>
                <div className="add-form-container">
                    <form className="add-form" onSubmit={this.onFormSubmit} noValidate>
                        <h1 className='add-form-head'>Item Details</h1>

                        <div className="form-group ">
                            <label className="mb-2">ITEM NAME</label>
                            <input required type="text" name="name" className={error.name.length > 0 ? "is-invalid form-control" : "form-control"} onChange={this.formObject} />
                                {error.name.length > 0 && (
                                <span className="invalid-feedback">{error.name}</span>
                                )}
                        </div>

                        <div className="form-group mb-3">
                            <label className="mb-2">LINK</label>
                            <input required type="url" name="link" id="link" className={error.link.length > 0 ? "is-invalid form-control" : "form-control"} onChange={this.formObject}/>
                                {error.link.length > 0 && (
                                    <span className="invalid-feedback">{error.link}</span>
                                )}
                        </div>

                        <div className="form-group mb-3">
                            <label className="mb-2">RESOURCE NAME</label>
                            <input required type="text" name="resource" className={error.resource.length > 0 ? "is-invalid form-control" : "form-control"} onChange={this.formObject}/>
                                {error.resource.length > 0 && (
                                    <span className="invalid-feedback">{error.resource}</span>
                                )}
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="sFormInput4" className='des-lab'>DESCRIPTION</label>
                            <textarea id="sFormInput4" rows="3" name="description" className={error.description.length > 0 ? "is-invalid form-control" : "form-control"} onChange={this.formObject}></textarea>
                                {error.description.length > 0 && (
                                    <span className="invalid-feedback">{error.description}</span>
                                )}
                        </div>

                        <div className="d-grid mt-3">
                            <button type="submit" className="btn btn-block btn-primary">CREATE</button>
                        </div>
                    </form>
                    <div className="add-form-bg"> 
                        <img src={process.env.PUBLIC_URL + "/assets/addformimage.png"} className="add-res-image"  alt="logo" />
                    </div>
                    <ToastContainer />
                </div>
            </>
        );
    }
}