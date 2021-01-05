import React, { useState, useEffect } from "react";
import {
  Form,
  Header,
  Container,
  List,
  Input,
  Segment,
} from "semantic-ui-react";
import axios from "axios"


const App = () => {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(()=>{getTodos()},[])

  const getTodos = async() => {
    let res = await axios.get("/api/todos")
    console.log(res.data)
    setTodos(res.data)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/todos',{name: name})
    .then((res)=>{
      setTodos([res.data, ...todos])
    })
    .catch((err)=>{
      alert("An Error has occurred")
    })
    setTodos([{name:name}, ...todos]);
    setName("");
  };

  const updateTodo = async (id) => {
   let res = await axios.put(`/api/todos/${id}`)
   const updatedTodos = todos.map(t => t.id === id ? res.data : t)
   setTodos(updatedTodos)

  }

  return (
    <Container>
      <Segment textAlign="center">
        <Header as="h3" textAlign="center">
          Todo List
        </Header>
        <Form onSubmit={handleSubmit}>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form>
        <List>
          {todos.map((t, i) => (
            <List.Item key={i} onClick={()=>updateTodo(t.id)} style={{color: t.complete ? "green" : "red"}}>{t.name}</List.Item>
          ))}
        </List>
      </Segment>
    </Container>
  );
};
export default App;