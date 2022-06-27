import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';

class Entry extends Component {
    constructor(props){
        super(props);

        this.state = {
            entries : [],
            createErrors: {},
            updateErrors:{},
            show : false,
            message:{}
        };
        this.entry = {};
        this.entryToBeUpdated = {};
    }

    componentDidMount(){
        fetch("http://localhost:4000/entries")
        .then(response => response.json())
        .then((entries) => this.setState({entries:entries}));
    }

    createEntry = e=> {
        e.preventDefault();
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let phoneNumber = document.getElementById("phoneNumber").value;
        this.entry['firstName'] = firstName;
        this.entry['lastName'] = lastName;
        this.entry['phoneNumber'] = phoneNumber;

        console.log(this.handleCreateValidation());
        if(this.handleCreateValidation()){
            fetch("http://localhost:4000/entries/create", {
                method:"POST",
                body:JSON.stringify({entry:this.entry}),
                headers:{"Content-Type" : "application/json"}
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data.message)
            });
            window.location.reload(false);
        }
    }

    handleCreateValidation() {
        let entry = this.entry;
        let createErrors = {};
        let formIsValid = true;
    
        //Id
        if (!entry["firstName"]) {
          formIsValid = false;
          createErrors["firstName"] = "First Name Cannot be empty";
        }
        else if (!entry["firstName"].match(/^[a-zA-Z]*$/)) {
            formIsValid = false;
            createErrors["firstName"] = "First Name should contain only Letters";
        }
        
    
        if (!entry["lastName"]) {
          formIsValid = false;
          createErrors["lastName"] = "Last Name Cannot be empty";
        }
        else if (!entry["lastName"].match(/^[a-zA-Z]*$/)) {
            formIsValid = false;
            createErrors["lastName"] = "Last Name should contain only Letters";
        }
    
        if (!entry["phoneNumber"]) {
          formIsValid = false;
          createErrors["phoneNumber"] = "Phone Number cannot be empty";
        }
        else if (!entry["phoneNumber"].match(/^[0-9]*$/)) {
            formIsValid = false;
            createErrors["phoneNumber"] = "Phone Number should contain only Numbers";
        }
        else if (entry["phoneNumber"].length < 2 || entry["phoneNumber"].length > 12 ) {
            formIsValid = false;
            createErrors["phoneNumber"] = "Length of Phone Number should be between 2 and 12";
        }
    
        this.setState({ createErrors });
        return formIsValid;
    }


    updateEntry = e => {
        e.preventDefault();
        let firstName = document.getElementById("firstNameModal").value;
        let lastName = document.getElementById("lastNameModal").value;
        let phoneNumber = document.getElementById("phoneNumberModal").value;
        let id = this.entryToBeUpdated._id;
        this.entryToBeUpdated["firstName"] = firstName;
        this.entryToBeUpdated["lastName"] = lastName;
        this.entryToBeUpdated["phoneNumber"] = phoneNumber;
        
        if(this.handleUpdateValidation()){
            fetch("http://localhost:4000/entries/update/" + id, {
                method:"PUT",
                body:JSON.stringify({entry:this.entryToBeUpdated}),
                headers:{"Content-Type" : "application/json"}
            })
            .then(response => response.json())
            .then((data) => console.log(data.message));
            window.location.reload(false);

        }
    }

    handleUpdateValidation() {
        let entry = this.entryToBeUpdated;
        let updateErrors = {};
        let formIsValid = true;
    
        //Id
        if (!entry["firstName"]) {
          formIsValid = false;
          updateErrors["firstName"] = "First Name Cannot be empty";
        }
        else if (!entry["firstName"].match(/^[a-zA-Z]*$/)) {
            formIsValid = false;
            updateErrors["firstName"] = "First Name should contain only Letters";
        }
    
        if (!entry["lastName"]) {
          formIsValid = false;
          updateErrors["lastName"] = "Last Name Cannot be empty";
        }
        else if (!entry["lastName"].match(/^[a-zA-Z]*$/)) {
            formIsValid = false;
            updateErrors["lastName"] = "Last Name should contain only Letters";
        }
    
        if (!entry["phoneNumber"]) {
          formIsValid = false;
          updateErrors["phoneNumber"] = "Phone Number cannot be empty";
        }
        else if (!entry["phoneNumber"].match(/^[0-9]*$/)) {
            formIsValid = false;
            updateErrors["phoneNumber"] = "Phone Number should contain only Numbers";
        } 
        else if (entry["phoneNumber"].length < 2 || entry["phoneNumber"].length > 12 ) {
            formIsValid = false;
            updateErrors["phoneNumber"] = "Length of Phone Number should be between 2 and 12";
        }
    
        this.setState({ updateErrors });
        return formIsValid;
    }


    deleteEntry(id, index){
        fetch("http://localhost:4000/entries/delete/" + id,{
            method:"DELETE"
        })
        .then(response => response.json())
        .then((data)=>{
            console.log(data.message);
            let tempEntries = this.state.entries;
            this.state.entries.splice(index, 1);
            this.setState({entries : tempEntries})
        });
    }
    
    handleModal(index){
        this.setState({show:true});
        this.entryToBeUpdated = this.state.entries[index];
    }

    
    render() { 
        
        return(
            <div className="container">
                <br /><br/>
                <h4>Add Phonebook Entry</h4>
                <br />
                <form onSubmit={this.createEntry}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Enter First Name" />
                        {this.state.createErrors['firstName'] &&
                            <div class="alert alert-danger" role="alert">
                            {this.state.createErrors["firstName"]}
                            </div>
                        }
                    </div>
                   
                    <br />
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Enter Last Name" />
                        {this.state.createErrors['lastName'] &&
                        <div class="alert alert-danger" role="alert">
                          {this.state.createErrors["lastName"]}
                        </div>
                        }
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" className="form-control" id="phoneNumber" placeholder="Enter Phone Number" />
                        {this.state.createErrors['phoneNumber'] &&
                            <div class="alert alert-danger" role="alert">
                            {this.state.createErrors["phoneNumber"]}
                            </div>
                        }
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <br /><br /><br />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th> First Name </th>
                        <th> Last Name </th>
                        <th> Phone Number </th>
                        <th> # </th>
                        <th> # </th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.entries.map((entry, index) => {
                            return(
                            <tr key={index}>
                                <td> {entry.firstName} </td>
                                <td> {entry.lastName} </td>
                                <td> {entry.phoneNumber} </td>
                                <td> <button type="button" className="btn btn-primary" onClick={() => this.handleModal(index)}>Update</button></td>
                                <td> <button className="btn btn-danger" onClick={()=>this.deleteEntry(entry._id, index)}>Delete</button></td>
                            </tr>
                            )
                        })
                    }
                </tbody>
                </table>
                <Modal show={this.state.show}>
                    <Modal.Header>Update Entry</Modal.Header>
                    <Modal.Body>
                        <form  onSubmit={this.updateEntry}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" defaultValue={this.entryToBeUpdated.firstName} className="form-control" id="firstNameModal" placeholder="Enter First Name" />
                                {this.state.updateErrors['firstName'] &&
                                    <div class="alert alert-danger" role="alert">
                                    {this.state.updateErrors["firstName"]}
                                    </div>
                                }
                            </div>
                            <br />
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" defaultValue={this.entryToBeUpdated.lastName} className="form-control" id="lastNameModal" placeholder="Enter Last Name" />
                                {this.state.updateErrors['lastName'] &&
                                    <div class="alert alert-danger" role="alert">
                                    {this.state.updateErrors["lastName"]}
                                    </div>
                                }
                            </div>
                            <br />
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" defaultValue={this.entryToBeUpdated.phoneNumber} className="form-control" id="phoneNumberModal" placeholder="Enter Phone Number" />
                                {this.state.updateErrors['phoneNumber'] &&
                                    <div class="alert alert-danger" role="alert">
                                    {this.state.updateErrors["phoneNumber"]}
                                    </div>
                                }
                            </div>
                            <br />
                            <div style={{float:"right"}}>
                            <span><button type="submit" className="btn btn-primary">Submit</button></span>&nbsp;&nbsp;&nbsp;
                            <span><button type="button" className="btn btn-primary" onClick={() => this.setState({show:!this.state.show})}>Close</button></span>
                            </div>
                    </form>
                    </Modal.Body>
                </Modal>
            </div>
    )}
}
 
export default Entry;