import { Container, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useEvents } from "../integrations/supabase/api";

const Events = () => {
  const { data: events, isLoading, isError, error } = useEvents();

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Created At</Th>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map((event) => (
            <Tr key={event.id}>
              <Td>{event.id}</Td>
              <Td>{event.created_at}</Td>
              <Td>{event.name}</Td>
              <Td>{event.date}</Td>
              <Td>{event.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Events;
