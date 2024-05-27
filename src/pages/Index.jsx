import { useState } from "react";
import { Container, VStack, HStack, Input, Button, IconButton, Text, Box, Checkbox } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo));
    setTodos(newTodos);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Add a new task" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <Button onClick={addTodo} colorScheme="teal">
            Add
          </Button>
        </HStack>
        <VStack spacing={2} width="100%">
          {todos.map((todo, index) => (
            <HStack key={index} width="100%" justifyContent="space-between" p={2} borderWidth="1px" borderRadius="md">
              <Checkbox isChecked={todo.completed} onChange={() => toggleTodo(index)}>
                <Text as={todo.completed ? "s" : "span"}>{todo.text}</Text>
              </Checkbox>
              <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => deleteTodo(index)} />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
