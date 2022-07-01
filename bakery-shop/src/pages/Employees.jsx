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
  const addEmployee = () => {
    // TODO: Add validations
    // TODO: Add an employee to the table
    // const nameArray = nameRef.current.value.split(" ");
    // if(!validator.isEmail(emailRef.current.value)) {
    //   return;
    // }
    // if(!validator.isAlpha(nameRef.current.value.replaceAll(" ", ""))) {
    //   return;
    // }
    if (validator.isEmail(emailRef.current.value) && 
      validator.isAlpha(nameRef.current.value.replaceAll(" ", ""))) {
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
  }

  const deleteEmployee = (employee) => {
    // TODO: Delete an employee from the table
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
          <td><Button type="button" variant="danger">Delete</Button></td>
        </tr>)
        }

        <tr className="input-row">
          <td><input type="text" ref={idRef} placeholder="ID" className="form-control"/></td>
          <td><input type="text" ref={nameRef} placeholder="Name" className="form-control"/></td>
          <td><input type="text" ref={emailRef} placeholder="Email" className="form-control"/></td>
          <td><input type="text" ref={avatarRef} placeholder="Avatar" className="form-control"/></td>
          <td><Button type="submit" variant="success" onClick={() => addEmployee()}>Add</Button></td>
        </tr>
        </tbody>
      </Table>
    </div>

  </div>)
}

export default Employees;