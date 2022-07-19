import React from 'react'
import { useQuery } from 'react-query'
import { useParams, useHistory } from 'react-router'
import {
  Container, Stack, Flex, Text, Heading, Button,
  Spinner, Grid,
  useToast
} from "@chakra-ui/react"
import { ArrowBackIcon } from '@chakra-ui/icons'
import { fetchPostDetail } from '../api/index'
import AddNewPost from './AddNewPost'


function PostDetail() {
  const toast = useToast()
  const { id } = useParams()
  const history = useHistory()
  console.log(history)
  const { isLoading, isError, error, data } = useQuery(['posts', parseInt(id)], fetchPostDetail, {
    onError: function (error) {
      toast({
        status: 'error',
        title: error.message
      })
    }
  })
  // console.log(!data.meta.pagination.links.next !== null)
  console.log(data)
  return (
    <Container maxWidth="1300px" mt="4">
      <>
        {
          isLoading ?
            <Grid
              placeItems="center"
              height="100vh"
              backgroundColor="#eee"
            >
              <Spinner size="xl"></Spinner>
            </Grid> :
            <>
              <AddNewPost isUpdate={true} id={id}></AddNewPost>
              <Stack p="4" mb="4" boxShadow="md" borderRadius="xl" border="1px solid #ccc" >
                <Flex justifyContent="space-between">
                  <Text>UserId : {data.data.user_id}</Text>
                  <Text>PostId : {data.data.id}</Text>
                </Flex>
                <Heading fontSize="2xl">{data.data.title}</Heading>
                <Text>{data.data.body}</Text>
                <Button colorScheme="blue" leftIcon={<ArrowBackIcon />} onClick={() => history.goBack()} style={{ alignSelf: 'flex-end' }}>Back</Button>
              </Stack>
            </>
        }
      </>
    </Container>
  )
}

export default PostDetail
