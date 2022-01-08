import { useState, useEffect } from 'react'

const AddComment = ({ setComment, handleSubmit, cardId }) => {
  return (
    <form className='grid grid-rows-[1fr_auto] grid-cols-2 sm:grid-rows-none sm:grid-cols-[auto_1fr_auto] items-center sm:items-start bg-white rounded-lg p-5 min-h-[200px] w-full gap-5'>
      <textarea className='col-span-full sm:col-start-2 sm:col-end-3 py-1 pl-5 w-full h-full justify-self-stretch border border-lightGray rounded' placeholder='Add a comment...' id="" name="" onChange={(e) => setComment(e.target.value)} required></textarea>
      <img className='w-11 h-11 col-span-1 sm:row-start-1 sm:row-end-2 sm:col-start-1 sm:col-end-2' src='./images/avatars/image-juliusomo.png' alt='me' />
      <button className='justify-self-end col-span-1 sm:col-start-3 sm:col-end-4 bg-moderateBlue px-6 py-3 rounded-lg text-white font-bold' onClick={(e) => handleSubmit(e, cardId)}>SEND</button>
    </form>
  )
}

export default AddComment
