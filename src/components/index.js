import React from "react";
import { Center, Text } from "@chakra-ui/react";
import Login from "./login";

function getName() {
  return localStorage.getItem("name") ? localStorage.getItem("name") : null;
}

export default function Index({ parentState, parentStateSetter }) {
  return parentState ? (
    <>
      <Center>
        <Text fontSize="4xl">Olá, {getName()}</Text>
      </Center>
    </>
  ) : (
    <>
      <Login parentState={parentState} parentStateSetter={parentStateSetter} />
    </>
  );
}
