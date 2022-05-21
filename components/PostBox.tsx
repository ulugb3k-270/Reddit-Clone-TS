import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Avatar from './Avatar'
import { useForm } from 'react-hook-form'

type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

const PostBox = () => {
  const { data: session } = useSession()

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData)
  })

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50 rounded-md border border-gray-300  bg-white p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />

        <input
          {...register('postTitle', { required: true })}
          type="text"
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          placeholder={`${
            session ? 'Create a post by entering a title! ' : 'Sign in to post!'
          }`}
        />

        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && 'text-blue-300'
          }`}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>

      {watch('postTitle') && (
        <div className="flex flex-col space-y-3 py-2">
          {/* BODY */}

          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body</p>
            <input
              type="text"
              placeholder="Text (optional)"
              {...register('postBody')}
              className="m=2 flex-1 bg-blue-50 p-2 outline-none"
            />
          </div>

          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit</p>
            <input
              type="text"
              placeholder="i.e. reactjs"
              {...register('subreddit', { required: true })}
              className="m=2 flex-1 bg-blue-50 p-2 outline-none"
            />
          </div>

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                type="text"
                placeholder="Optional"
                {...register('postImage')}
                className="m=2 flex-1 bg-blue-50 p-2 outline-none"
              />
            </div>
          )}

          {/* Errors */}

          {Object.keys(errors).length > 0 && (
            <div className="space-y-3 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>- A Post Title is required</p>
              )}
              {errors.postTitle?.type === 'required' && (
                <p>- A Subreddit is required</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default PostBox
