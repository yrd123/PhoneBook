import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';

class Entry extends Component {
    constructor(props){
        super(props);

        this.state = {
            entries : [],
            show : false
        };

        this.entry = {};
        this.entryToBeUpdated = {};
    }

    componentDidMount(){
        fetch("http://localhost:3000/entries")
        .then(response => response.json())
        .then((entries) => this.setState({entries:entries}));
    }

    createEntry(){
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let phoneNumber = document.getElementById("phoneNumber").value;
        this.entry["firstName"] = firstName;
        this.entry["lastName"] = lastName;
        this.entry["phoneNumber"] = phoneNumber;
        
        fetch("http://localhost:3000/entries/create", {
            method:"POST",
            body:JSON.stringify(this.entry),
            headers:{"Content-Type" : "application/json"}
        })
        .then(response => response.json)
        .then((data) => console.log(data));
    }

    deleteEntry(id, index){
        fetch("http://localhost:3000/entries/delete/" + id,{
            method:"DELETE"
        })
        .then(response => response.json())
        .then((data)=>{
            console.log(data);
            let tempEntries = this.state.entries;
            this.state.entries.splice(index, 1);
            this.setState({entries : tempEntries})
        });
    }

    handleModal(index){
        this.setState({show:true});
        this.entryToBeUpdated = this.state.entries[index];
    }

    updateEntry(){
        let firstName = document.getElementById("firstNameModal").value;
        let lastName = document.getElementById("lastNameModal").value;
        let phoneNumber = document.getElementById("phoneNumberModal").value;
        let id = this.entryToBeUpdated._id;
        this.entryToBeUpdated["firstName"] = firstName;
        this.entryToBeUpdated["lastName"] = lastName;
        this.entryToBeUpdated["phoneNumber"] = phoneNumber;
        
        fetch("http://localhost:3000/entries/update/" + id, {
            method:"PUT",
            body:JSON.stringify(this.entryToBeUpdated),
            headers:{"Content-Type" : "application/json"}
        })
        .then(response => response.json)
        .then((data) => console.log(data));
    }

    render() { 
        
        return(
            <div className="container">
                Entry Component<br /><br /><br />
                
                <form onSubmit={() => this.createEntry()}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Enter First Name" />
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Enter Last Name" />
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" className="form-control" id="phoneNumber" placeholder="Enter Phone Number" />
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
                    <Modal.Header>Hello</Modal.Header>
                    <Modal.Body>
                        <form  onSubmit={() => this.updateEntry()}>
                            <div className="form-group">
                                <label>FIrst Name</label>
                                <input type="text" defaultValue={this.entryToBeUpdated.firstName} className="form-control" id="firstNameModal" placeholder="Enter First Name" />
                            </div>
                            <br />
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" defaultValue={this.entryToBeUpdated.lastName} className="form-control" id="lastNameModal" placeholder="Enter Last Name" />
                            </div>
                            <br />
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" defaultValue={this.entryToBeUpdated.phoneNumber} className="form-control" id="phoneNumberModal" placeholder="Enter Phone Number" />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-primary" onClick={() => this.setState({show:!this.state.show})}>Close</button>
                    </Modal.Footer>
                </Modal>
            </div>
    )}
}
 
export default Entry;