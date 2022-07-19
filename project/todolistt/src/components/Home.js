import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useParams, useHistory, Link } from 'react-router-dom'
import {
  Container, Stack, Flex, Text, Heading, Button,
  Spinner, Grid,
  useToast
} from "@chakra-ui/react"
import AddNewPost from '../components/AddNewPost'
import { fetchPosts, deletePost } from '../api/index'

function Home() {
  const toast = useToast()
  const { id } = useParams()
  const postId = parseInt(id, 10)
  const history = useHistory()
  const query = useQueryClient()
  const { isLoading, isError, error, data } = useQuery(['posts', id], fetchPosts, {
    keepPreviousData: true,
  })
  const { isLoading: isMutation, mutateAsync } = useMutation('deletePost', deletePost, {
    onSuccess: function () {
      query.invalidateQueries(['posts'])
    },
    onError: (err) => {
      toast({ status: 404, message: err.message })
    }
  })
  // console.log(!data.meta.pagination.links.next !== null)

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
              <AddNewPost></AddNewPost>
              <Flex justifyContent="space-between" mb={4}>
                <Button colorScheme="red"
                  onClick={() => {
                    if (data.meta.pagination.links.previous !== null) {
                      history.push(`/${postId - 1}`)
                    }
                  }}
                  disabled={data.meta.pagination.links.previous == null}
                >
                  Prev
                </Button>
                <Text>CurrentPage : {postId}</Text>
                <Button colorScheme="green"
                  onClick={() => {
                    if (data.meta.pagination.links.next !== null) {
                      history.push(`/${postId + 1}`)
                    }
                  }}
                  disabled={postId >= data.meta.pagination.pages}
                >
                  Next
                </Button>
              </Flex>
              {
                data?.data.map(post => (
                  <Stack>
                    <Flex justifyContent="flex-end" >
                      <Button
                        size="sm"
                        isLoading={isMutation}
                        borderRadius="sm"
                        backgroundColor="red.400"
                        color="white"
                        onClick={async () => {
                          await mutateAsync({ id: post.id })

                        }}
                      >Delete</Button>
                    </Flex>
                    <Link to={`/post/${post.id}`} key={post.id}>
                      <Stack p="4" mb="4" boxShadow="md" borderRadius="xl" border="1px solid #ccc" >
                        <Flex justifyContent="space-between">
                          <Text>UserId: {post.user_id}</Text>
                          <Text>PostId: {post.id}</Text>
                        </Flex>
                        <Heading fontSize="2xl">{post.title}</Heading>
                        <Text>{post.body}</Text>
                      </Stack>
                    </Link>
                  </Stack>
                ))
              }
            </>
        }
      </>
    </Container >
  )
}

export default Home
