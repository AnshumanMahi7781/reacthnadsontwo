import React, { Component } from 'react'

class FormCompo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empName: "",
            empDepart: "",
            empRating: "",
            empDatabase: []
        }
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        let tempObj = {
            empName: this.state.empName,
            empDepart: this.state.empDepart,
            empRating: this.state.empRating
        }
        
        if (this.state.empName.length !== 0 && this.state.empDepart.length !== 0 && this.state.empRating.length !== 0) {
            this.state.empDatabase.push(tempObj);
            this.setState({
                empName: "",
                empDepart: "",
                empRating: "",
                empDatabase: this.state.empDatabase
            })
        }
    }


    render() {
        return (
            <div className="MainContainer">


                <form>
                    <h1>EMPLOYEE FEEDBACK FORM</h1>

                    <div className="formRow">
                        <label htmlFor="empName">Name :</label>
                        <input type="text" name='empName' id='empName' placeholder='Enter Name' onChange={this.changeHandler} value={this.state.empName} />
                    </div>

                    <div className="formRow">
                        <label htmlFor="empName">Department :</label>
                        <input type="text" name='empDepart' id='empDepart' placeholder='Enter Departent' onChange={this.changeHandler} value={this.state.empDepart} />
                    </div>

                    <div className="formRow">
                        <label htmlFor="empName">Rating :</label>
                        <input type="number" name='empRating' id='empRating' placeholder='Enter Rating' onChange={this.changeHandler} value={this.state.empRating} />
                    </div>
                    <button onClick={this.submitHandler}>Submit</button>
                </form>

                <div className="dataContainer">
                    {
                        this.state.empDatabase.map((emp, index) => {
                            return <p key={index} className='empData'>Name  : {emp.empName} | Department : {emp.empDepart} | Rating : {emp.empRating}</p>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default FormCompo

