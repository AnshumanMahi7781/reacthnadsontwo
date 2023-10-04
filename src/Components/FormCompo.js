import React, { Component, createRef } from 'react'

class FormCompo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empName: "",
            empDepart: "",
            empRating: "",
            empDatabase: [],
            nameError: "",
            departError: "",
            ratingError: "",
        }
        this.empNameRef = createRef();
        this.empDepartRef = createRef();
        this.empRatingRef = createRef();
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Run whenever there is an error in input field  and after 2ssec clear the errr
    removeError = () => {
        setTimeout(() => {
            this.setState({
                nameError: "",
                departError: "",
                ratingError: "",
            })
        }, 2000);
    }


    submitHandler = (e) => {
        e.preventDefault();

        // Checking if the empName is empty
        if (this.state.empName.length === 0 || !isNaN(this.state.empName)) {
            this.setState({
                nameError: "Fill Correct  Name"
            })
            this.removeError();
            this.empNameRef.current.focus();
            this.empNameRef.current.select();
        }
        // Checking if the empDepart is empty
        else if (this.state.empDepart.length === 0) {
            this.setState({
                departError: "Fill Department Name"
            })
            this.removeError();
            this.empDepartRef.current.focus();
            this.empDepartRef.current.select();
        }
        // Checking if the empRating is empty or lest then 1 or greater then 5
        else if (!this.state.empRating || parseInt(this.state.empRating) < 1 || parseInt(this.state.empRating) > 5) {
            this.setState({
                ratingError: "Give Rating Between 1 to 5"
            })
            this.removeError();
            this.empRatingRef.current.focus();
            this.empRatingRef.current.select();
        }
        // After here adding the data into database state and also clearning the state after savig the data
        else {
            let tempObj = {
                empName: this.state.empName,
                empDepart: this.state.empDepart,
                empRating: this.state.empRating
            }
            this.state.empDatabase.push(tempObj);
            this.setState({
                empName: "",
                empDepart: "",
                empRating: "",
                nameError: "",
                departError: "",
                ratingError: "",
                empDatabase: this.state.empDatabase
            })
            this.empNameRef.current.focus();
        }
    }
    // Call whenever the component is mounted to the DOm and give the focus to the empName Input
    componentDidMount() {
        this.empNameRef.current.focus();
    }


    render() {
        return (
            <div className="MainContainer">


                <form>
                    <h2>EMPLOYEE FEEDBACK FORM</h2>

                    <div className="formRow">
                        <label htmlFor="empName">Name :</label>
                        <div className="inputBox">
                            <input type="text" ref={this.empNameRef} name='empName' id='empName' placeholder='Enter Name' onChange={this.changeHandler} value={this.state.empName} />
                            {this.state.nameError && <p className='Error'>{this.state.nameError}</p>}
                        </div>
                    </div>

                    <div className="formRow">
                        <label htmlFor="empName">Department :</label>
                        <div className="inputBox">
                            <input type="text" ref={this.empDepartRef} name='empDepart' id='empDepart' placeholder='Enter Departent' onChange={this.changeHandler} value={this.state.empDepart} />
                            {this.state.departError && <p className='Error'>{this.state.departError}</p>}
                        </div>
                    </div>

                    <div className="formRow">
                        <label htmlFor="empName">Rating :</label>
                        <div className="inputBox">
                            <input type="number" ref={this.empRatingRef} name='empRating' id='empRating' placeholder='Enter Rating' onChange={this.changeHandler} value={this.state.empRating} />
                            {this.state.ratingError && <p className='Error'>{this.state.ratingError}</p>}
                        </div>
                    </div>
                    <button onClick={this.submitHandler}>Submit</button>
                </form>

                <div className="dataContainer">
                    <table border={2}>
                        <thead>
                            <tr>
                                <th>Name </th>
                                <th>Department </th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.empDatabase.map((emp, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{emp.empName}</td>
                                            <td>{emp.empDepart}</td>
                                            <td>{emp.empRating}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default FormCompo

