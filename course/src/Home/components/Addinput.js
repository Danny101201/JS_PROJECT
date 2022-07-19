import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { InputControl, TextareaControl, SubmitButton } from 'formik-chakra-ui'
import { Stack, Button, Heading, useToast } from '@chakra-ui/react'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'
import { addNewPost, updateNewPost } from '../../api/index'

function Addinput({ isUpdate, id }) {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { isLoading, data, mutateAsync } = useMutation(
    isUpdate ? 'updatepost' : 'addpost',
    isUpdate ? updateNewPost : addNewPost,
    {
      onSuccess: () => {
        isUpdate ?
          queryClient.invalidateQueries('posts') :
          queryClient.invalidateQueries(['posts', id])
      },
      onError: (error) => {
        toast({ status: 'error', title: error.message })
      },
      onMutate: async function (newPost) {
        if (isUpdate) {
          // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
          await query.cancelQueries(['posts', id])

          const previousData = queryClient.getQueryData(['posts', id])
          queryClient.setQueryData(['posts', id], oldQueryData => {
            return {
              data: newPost
            }
          })
          return { previousData };
        }
      }
    })
  const initialValues = {
    title: '',
    body: ''
  }
  const onSubmit = async (values, submitProps) => {
    console.log('formik values : ', values)
    console.log('submitProps : ', submitProps)
    isUpdate ?
      await mutateAsync({ title: values.title, body: values.body, id }) :
      await mutateAsync({ title: values.title, body: values.body })
    submitProps.resetForm()
  }
  const validationSchema = Yup.object({
    title: Yup.string().required(),
    body: Yup.string().required(),
  })
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {
        formik => (
          <Form>
            <Stack mb={10}>
              <Heading fontSize="2xl" textAlign="center">Add posts</Heading>
              <InputControl name="title" label="title" />
              <TextareaControl name="body" label="body" />
              <Stack direction="row" justifyContent="space-between">
                <SubmitButton disabled={!formik.isValid}>add item</SubmitButton>
              </Stack>
            </Stack>
          </Form>
        )
      }

    </Formik>
  )
}

export default Addinput
