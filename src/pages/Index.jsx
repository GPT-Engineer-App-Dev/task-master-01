import { Container, VStack, HStack, Input, Button, IconButton, Text, Checkbox, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useEvents, useAddEvent, useDeleteEvent, useUpdateEvent } from "../integrations/supabase/api";

const Index = () => {
  const { data: todos, isLoading, isError, error } = useEvents();
  const addEventMutation = useAddEvent();
  const deleteEventMutation = useDeleteEvent();
  const updateEventMutation = useUpdateEvent();
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      addEventMutation.mutate({ text: inputValue, completed: false });
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    deleteEventMutation.mutate(id);
  };

  const toggleTodo = (todo) => {
    updateEventMutation.mutate({ ...todo, completed: !todo.completed });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <Alert status="error"><AlertIcon />{error.message}</Alert>;

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Add a new task" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <Button onClick={addTodo} colorScheme="teal" isLoading={addEventMutation.isLoading}>
            Add
          </Button>
        </HStack>
        <VStack spacing={2} width="100%">
          {todos.map((todo) => (
            <HStack key={todo.id} width="100%" justifyContent="space-between" p={2} borderWidth="1px" borderRadius="md">
              <Checkbox isChecked={todo.completed} onChange={() => toggleTodo(todo)}>
                <Text as={todo.completed ? "s" : "span"}>{todo.text}</Text>
              </Checkbox>
              <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => deleteTodo(todo.id)} isLoading={deleteEventMutation.isLoading} />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;