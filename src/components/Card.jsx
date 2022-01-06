import { useState } from 'react'

import AddComment from './AddComment'

const Card = ({
  id,
  content,
  date,
  score,
  image,
  name,
  deleteCard,
  increaseScore,
  decreaseScore,
  setComment,
  handleSubmit,
}) => {
  const [reply, setReply] = useState(false)
  const [edit, setEdit] = useState(false)

  const handleReply = () => {
    setReply(!reply)
    setEdit(false)
  }

  const handleEdit = () => {
    setEdit(!edit)
    setReply(false)
  }

  return (
    <>
      <div className='grid grid-cols-2 sm:grid-cols-[auto_1fr_auto] sm:gap-x-7 bg-white p-5 rounded-lg'>
        <div className='col-span-full sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2 flex items-center gap-5'>
          <img className='w-10 h-10' src={image.png} alt={name} />
          <span className='font-bold text-darkBlue'>{name}</span>
          {name === 'juliusomo' ? <span className='bg-moderateBlue text-white text-xs py-1 px-2 rounded'>you</span> : ''}
          <span className='text-grayishBlue font-medium'>{date}</span>
        </div>
        <p className='col-span-full sm:col-start-2 sm:col-end-4 sm:row-start-2 sm:row-end-3 py-5 text-grayishBlue'>{content}</p>
        <div className='sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-3 flex flex-row sm:flex-col self-start justify-self-start sm:w-11 bg-lightGray rounded-lg'>
          <button className='grid place-content-center p-3' onClick={() => increaseScore(id)}>
            <img className='w-4 h-4 object-contain' src='./images/icon-plus.svg' alt='plus icon' />
          </button>
          <span className='p-3 text-moderateBlue font-bold text-center'>{score}</span>
          <button className='grid place-content-center p-3' onClick={() => decreaseScore(id)}>
            <img className='w-4 h-4 object-contain' src='./images/icon-minus.svg' alt='minus icon' />
          </button>
        </div>
        {name === 'juliusomo'
          ? <div className='flex gap-3'>
            <button className='sm:col-start-3 sm:col-end-4 sm:row-start-1 sm:row-end-2 justify-self-end col-start-2 col-end-2 flex items-center gap-2.5 font-bold text-softRed' onClick={() => deleteCard(id)}>
              <img src='./images/icon-delete.svg' alt='delete icon' />
              Delete
            </button>
            <button className='sm:col-start-3 sm:col-end-4 sm:row-start-1 sm:row-end-2 justify-self-end col-start-2 col-end-2 flex items-center gap-2.5 font-bold text-moderateBlue' onClick={handleEdit}>
              <img src='./images/icon-edit.svg' alt='edit icon' />
              Edit
            </button>
          </div>
          : <button className='sm:col-start-3 sm:col-end-4 sm:row-start-1 sm:row-end-2 justify-self-end col-start-2 col-end-2 flex items-center gap-2.5 font-bold text-moderateBlue' onClick={handleReply}>
            <img src='./images/icon-reply.svg' alt='reply icon' />
            Reply
          </button>
        }
      </div>
      <div>
        {(reply || edit) && <AddComment setComment={setComment} handleSubmit={handleSubmit} />}
      </div>
    </>
  )
}

export default Card
