import React from 'react'
import { ChakraProvider, Heading, Flex, Input, Button, useColorMode, useColorModeValue } from "@chakra-ui/react"

function Form() {
    return (
        <div>
            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Flex direction="column" background={bgColor} p={12} rounded={6}>
                    <Heading mb={6}>Login in</Heading>
                    <Input placeholder="text here" variant="filled" mb={3} type="email"></Input>
                    <Input placeholder="*******" variant="filled" mb={6} type="password"></Input>
                    <Button colorScheme="teal" mb={3}>Login in</Button>
                    <Button onClick={toggleColorMode}>Toggle color</Button>
                </Flex>
            </Flex>
        </div>
        
    )
}

export default Form
