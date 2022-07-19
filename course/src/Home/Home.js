import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useParams, useHistory, Link } from 'react-router-dom'
import { Container, Stack, Flex, Heading, Text, Grid, Spinner, useToast, Button } from '@chakra-ui/react'
import { fetchPosts, deletePost } from '../api/index'
import Addinput from './components/Addinput'

function Home() {
  const { id } = useParams()
  const history = useHistory()
  const pageId = parseInt(id, 10)
  const query = useQueryClient()
  console.log(pageId)
  const toast = useToast()
  const { data, isLoading, error } = useQuery(["posts", pageId], () => fetchPosts(pageId), {
    onError: (error) => {
      toast({ title: error.message, status: "error" })
    },
    keepPreviousData: true
  })
  const { isLoading: isMutation, mutateAsync } = useMutation('deletePost', deletePost, {
    onSuccess() {
      query.invalidateQueries("posts")
    },
    onError: (error) => {
      toast({ title: error.message, status: "error" })
    },
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
          <Addinput formDefaultValue={data.data}></Addinput>
          <Flex justifyContent="space-between" mb={5}>
            <Button
              disabled={!data.meta.pagination.links.previous}
              colorScheme="green"
              onClick={() => history.push(`/${pageId - 1}`)}
            >Prev Page</Button>
            <Text>Current page : {pageId}</Text>
            <Button
              colorScheme="red"
              onClick={() => history.push(`/${pageId + 1}`)}
              disabled={!data.meta.pagination.links.next || !data.data.length}
            >Next Page</Button>
          </Flex>
          {data?.data.map(item => (
            <Stack key={item.id} p={4} boxShadow="md" border="1px solid #ccc" borderRadius="base" mb={4}>
              <Link to={`/post/${item.id}`} >
                <Flex justifyContent="flex-end">
                  <Button
                    size="small"
                    isLoading={isMutation}
                    onClick={async () => {
                      await mutateAsync({ id: item.id })
                    }}
                  >Delete</Button>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text>UserId : {item.user_id}</Text>
                  <Text>PostId :{item.id}</Text>
                </Flex>
                <Heading size="xl">{item.title}</Heading>
                <Text>{item.body}</Text>
              </Link>
            </Stack>
          ))}
        </>
      }
    </Container >
  )
}

export default Home
