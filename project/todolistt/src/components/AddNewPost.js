import React from 'react'
import { InputControl, TextareaControl, SubmitButton } from "formik-chakra-ui"
import { Formik, Form } from "formik"
import { Stack, Heading, useToast } from "@chakra-ui/react"
import { useMutation, useQueryClient } from 'react-query'
import { addPost, updatePost } from '../api/index'

function AddNewPost({ isUpdate, id }) {
    const toast = useToast()
    const query = useQueryClient()
    const { isLoading, data, mutateAsync } = useMutation(
        isUpdate ? "updatePost" : "addPost",
        isUpdate ? updatePost : addPost, {
        onSuccess: function () {
            isUpdate
                ? query.invalidateQueries('posts')
                : query.invalidateQueries(['posts', id])
        },
        onError: function (error, newPost, context) {
            query.setQueryData(['posts', id], context.previousData)
            toast({
                status: 'error',
                title: error.message
            })
        },
        onMutate: async function (newPost) {
            if (isUpdate) {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await query.cancelQueries(['posts', id])

                const previousData = query.getQueryData(['posts', id])
                query.setQueryData(['posts', id], oldQueryData => {
                    return {
                        data: newPost
                    }
                })
                return { previousData };
            }
        }
    })
    return (
        <div>
            <Formik initialValues={{ title: '', body: '' }} onSubmit={async (values) => {
                isUpdate
                    ? await mutateAsync({ id, title: values.title, body: values.body })
                    : await mutateAsync({ title: values.title, body: values.body })
            }}>
                <Form >
                    <Stack my="4" direction={{ base: 'column', lg: 'column' }}>
                        <Heading fontSize="2xl" textAlign="center">{isUpdate ? "Update" : "Add"} Post</Heading>
                        <InputControl name="title" label="title"></InputControl>
                        <TextareaControl name="body" label="body"></TextareaControl>
                        <SubmitButton alignSelf={{ base: "initial", lg: 'flex-start' }}>{isUpdate ? "Update" : "Add"} Post</SubmitButton>
                    </Stack>
                </Form>
            </Formik>
        </div>
    )
}

export default AddNewPost
