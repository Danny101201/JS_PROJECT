import React from 'react'
import { useQuery } from 'react-query'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Stack, Flex, Heading, Text, Grid, Spinner, useToast, Button } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import Addinput from '../Home/components/Addinput'
import { fetchPost } from '../api/index'

function PostDetalis() {
  const { id } = useParams()
  const history = useHistory()
  console.log(history)
  const pageId = parseInt(id, 10)
  const toast = useToast()
  const { data, isLoading, error } = useQuery(["post", pageId], () => fetchPost(pageId), {
    onError: (error) => {
      toast({ title: error.message, status: "error" })
    },
    keepPreviousData: true
  })
  return (
    <Container maxWidth="1300px" mt="4">
      {isLoading ?
        <Grid placeItems="center" w="100%" h="100vh">
          <Spinner thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl' />
        </Grid>
        :
        <>
          <Addinput isUpdate id={data.data.id}></Addinput>
          <Flex justifyContent="flex-end" mb={5}>
            <Button
              colorScheme="red"
              onClick={() => history.goBack()}
              leftIcon={<ArrowBackIcon />}
            >Back</Button>
          </Flex>
          <Stack key={data.data.id} p={4} boxShadow="md" border="1px solid #ccc" borderRadius="base" mb={4}>
            <Flex justifyContent="space-between">
              <Text>UserId : {data.data.user_id}</Text>
              <Text>PostId :{data.data.id}</Text>
            </Flex>
            <Heading size="xl">{data.data.title}</Heading>
            <Text>{data.data.body}</Text>
          </Stack>

        </>
      }
    </Container>
  )
}

export default PostDetalis
