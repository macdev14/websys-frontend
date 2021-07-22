import React, { useEffect, useState } from "react";
import { Center, Text } from "@chakra-ui/react";
import Login from "./login";

function getName() {
  return localStorage.getItem("name") ? localStorage.getItem("name") : null;
}

export default function Index({ parentState, parentStateSetter }) {
  const [name, setName] = useState("");
  useEffect(() => {
    setName(getName());
  }, [name]);
  return parentState ? (
    <>
      <Center>
        <Text fontSize="4xl">Olá, {name}</Text>
      </Center>
    </>
  ) : (
    <>
      <Login parentState={parentState} parentStateSetter={parentStateSetter} />
    </>
  );
}
