import React, { useContext, useEffect, useState } from "react";
import {
  MDBBadge,
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBInputGroup,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
} from "mdb-react-ui-kit";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from "../../UserContext";

export default function TodoList() {
  const {currentUser, userData} = useContext(UserContext)
  const [todoItems, setTodoItems] = useState();

  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    setTodoItems(
      userData?.todo
    )
    
  }, [userData?.todo])

  

  const addTodo = async() => {
    if (newTodo.trim() !== "") {
      const newId = todoItems.length + 1;
      const newItem = { id: newId, todo: newTodo, completed: false };
      setTodoItems([...todoItems, newItem]);
      setNewTodo("");
      await updateDoc(doc(db, "users", currentUser?.uid), {
        todo : todoItems
      })
    }
    
  };

  const toggleTodoCompletion = async(id, completed) => {
    todoItems[id].completed = !completed

    await updateDoc(doc(db, "users", currentUser.uid), {
      todo : todoItems
    })
    
  };

  return (
    <section className="p-5">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol>
            <MDBCard className="rounded-3">
              <MDBCardBody className="p-4">
                <h5>
                  <span className="h2 me-2">ToDo</span>{" "}
                  <MDBBadge className="mx-2" color="danger">
                    checklist
                  </MDBBadge>
                </h5>
                <p className="text-muted pb-2">04/01/2020 • ML - 1321</p>

                <MDBInputGroup>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new item"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={() => addTodo()}>
                    Add
                  </button>
                </MDBInputGroup>

                <MDBListGroup className="rounded-0">
                  {todoItems?.map((todo) => (
                    <MDBListGroupItem
                      className="border-0 d-flex align-items-center ps-0"
                      key={todo?.id}
                    >
                      <MDBCheckbox
                        name="flexCheck"
                        value=""
                        id={`flexCheckChecked-${todo?.id}`}
                        className="me-3"
                        checked= {todo.completed}
                        // onChange={() => toggleTodoCompletion(todo.id, todo.completed)}
                      />
                      {todo?.completed ? <s>{todo?.todo}</s> : todo?.todo}
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
