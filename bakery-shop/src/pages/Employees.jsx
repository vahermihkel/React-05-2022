import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import validator from "validator";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const idRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const avatarRef = useRef();

  // TODO: Load data from backend service
  useEffect(()=>{
    fetch("https://reqres.in/api/users")
      .then(res => res.json())
      .then(body => setEmployees(body.data)) 
  },[]);
  // map is not a function --> [].map(element =>) ei tee listile

  // "Elas metsas mutionu, keset kuuski".split(" ")  --> ["Elas", "metsas", "mutionu,", "keset", "kuuski"]
  // "Elas metsas mutionu, keset kuuski".split("a")  --> ["El", "s mets", "s mutionu, keset kuuski"]
  const [idError, setIdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  
  const addEmployee = () => {
    // TODO: Add validations
    // TODO: Add an employee to the table
    if (validator.isNumeric(idRef.current.value) &&
      validator.isAlpha(nameRef.current.value.replaceAll(" ", "")) &&
      validator.isEmail(emailRef.current.value) &&
      validator.isURL(avatarRef.current.value)) {
      const newEmployee = {
        id: idRef.current.value,
        // first_name: nameArray.slice(0, -1).join(" "),  
        // last_name: nameArray[nameArray.length-1], 
        name: nameRef.current.value,
        email: emailRef.current.value,
        avatar: avatarRef.current.value,
      }
      employees.push(newEmployee);
      setEmployees(employees.slice());
    }
    if (!validator.isNumeric(idRef.current.value)) {
      setIdError("ID ei ole korrektne");
    } else {
      setIdError("");
    }
    if (!validator.isAlpha(nameRef.current.value.replaceAll(" ", ""))) {
      setNameError("Nimi ei ole korrektne");
    } else {
      setNameError("");
    }
    if (!validator.isEmail(emailRef.current.value)) {
      setEmailError("Email ei ole korrektne");
    } else {
      setEmailError("");
    }
    if (!validator.isURL(avatarRef.current.value)) {
      setAvatarError("Avatari URL ei ole korrektne");
    } else {
      setAvatarError("");
    }
  }

  const deleteEmployee = (employee) => {
    // TODO: Delete an employee from the table
    const index = employees.indexOf(employee);
    if (index >= 0) {
      employees.splice(index,1);
      setEmployees(employees.slice());
    }
  }

  return (<div>
    <div className="container">
      <h2 className="mb-4">Employees</h2>
      <Table className="table table-hover table-bordered table-sortable">
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          {/* <!-- TODO: Add a column for an avatar --> */}
          <th scope="col">Avatar</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        { employees.map(employee =>
        <tr>
          <td>{employee.id}</td>
          <td>{employee.first_name} {employee.last_name} {employee.name}</td>
          <td>{employee.email}</td>
          <td><img src={employee.avatar} alt="" /></td>
          <td><Button type="button" variant="danger" onClick={() => deleteEmployee(employee)}>Delete</Button></td>
        </tr>)
        }

        <tr className="input-row">
          <td><input type="text" ref={idRef} placeholder="ID" className="form-control"/>{idError}</td>
          <td><input type="text" ref={nameRef} placeholder="Name" className="form-control"/>{nameError}</td>
          <td><input type="text" ref={emailRef} placeholder="Email" className="form-control"/>{emailError}</td>
          <td><input type="text" ref={avatarRef} placeholder="Avatar" className="form-control"/>{avatarError}</td>
          <td><Button type="submit" variant="success" onClick={() => addEmployee()}>Add</Button></td>
        </tr>
        </tbody>
      </Table>
    </div>

  </div>)
}

export default Employees;