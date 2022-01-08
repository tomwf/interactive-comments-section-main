import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

import Card from './Card'
import AddComment from './AddComment'

const CommentSection = () => {
  const [data, setData] = useState([])
  const [comment, setComment] = useState('')
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


  const deleteCard = async (id, parentId) => {
    if (parentId) {
      const parentComment = data.filter(item => item.id === parentId)
      parentComment[0].replies = parentComment[0].replies.filter(item => item.id !== id)

      await fetch(`http://localhost:8000/comments/${parentId}`, {
        method: 'PUT',
        body: JSON.stringify(parentComment[0]),
        headers:  {
          'Content-Type': 'application/json'
        },
      })
    } else {
      await fetch(`http://localhost:8000/comments/${id}`, {
        method: 'DELETE',
      })
    }
    fetchData()
  }

  const deleteReply = async (parentId, id) => {
    const parentComment = data.filter(item => item.id === parentId)

    parentComment[0].replies = parentComment[0].replies.filter(item => item.id !== id)
    await fetch(`http://localhost:8000/comments/${parentId}`, {
      method: 'PUT',
      body: JSON.stringify(parentComment[0]),
      headers:  {
        'Content-Type': 'application/json'
      },
    })
    fetchData()
  }

  const handleSubmit = async (e, cardId=null) => {
    e.preventDefault()

    let newComment

    // Exit function on empty comment
    if (!comment) return

    if (cardId) {
      newComment = {
        id: uuidv4(),
        content: comment,
        createdAt: new Date().toISOString().replace('T', ' ').replace('Z', ' '),
        score: 0,
        replyingTo: "",
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp"
          }
          ,
          username: "juliusomo"
        }
      }

      fetch(`http://localhost:8000/comments/${cardId}`)
        .then(res => res.json())
        .then(data => {
          data.replies.push(newComment)

          fetch(`http://localhost:8000/comments/${cardId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:  {
              'Content-Type': 'application/json'
            },
          })
        })
    } else {
      newComment = {
        id: uuidv4(),
        content: comment,
        createdAt: new Date().toISOString(),
        score: 0,
        replyingTo: "",
        user: {
          image: {
            png:  "./images/avatars/image-juliusomo.png",
            webp:  "./images/avatars/image-juliusomo.webp"
          }
          ,
          username: "juliusomo"
        },
        replies: []
      }

      await fetch('http://localhost:8000/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers:  {
          'Content-Type': 'application/json'
        },
      })
    }
    setComment('')
    fetchData()
  }

  const increaseScore = async (id, parentId=null) => {
    let selectedComment
    // Grab the comment
    if (parentId) { // If the comment is a reply
      selectedComment = data.filter(item => item.id === parentId)
      selectedComment[0].replies.forEach((item, i) => {

        if (item.id === id) {
          selectedComment[0].replies[i].score += 1
        }
      })

      await fetch(`http://localhost:8000/comments/${parentId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(selectedComment[0])
      })
    } else {
      selectedComment = data.filter(item => item.id === id)
      selectedComment[0].score += 1

      await fetch(`http://localhost:8000/comments/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(selectedComment[0])
      })
    }
    fetchData()
  }

  const decreaseScore = async (id, parentId=null) => {
    let selectedComment

    if (parentId) { // If the comment is a reply
      selectedComment = data.filter(item => item.id === parentId)
      selectedComment[0].replies.forEach((item, i) => {

        if (item.id === id) {
          selectedComment[0].replies[i].score -= 1
        }
      })

      await fetch(`http://localhost:8000/comments/${parentId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(selectedComment[0])
      })
    } else {
      selectedComment = data.filter(item => item.id === id)
      selectedComment[0].score -= 1

      await fetch(`http://localhost:8000/comments/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(selectedComment[0])
      })
    }
    fetchData()
  }

  const fetchData = async () => {
    await fetch('http://localhost:8000/comments')
      .then(res => res.json())
      .then(data => setData(data))
  }

  // Fetch data on render
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {
        data.length > 0 &&
          data.map(card => (
            <>
              <Card
                key={card.id}
                id={card.id}
                content={card.content}
                date={card.createdAt}
                score={card.score}
                image={card.user.image}
                name={card.user.username}
                deleteCard={deleteCard}
                increaseScore={increaseScore}
                decreaseScore={decreaseScore}
                setComment={setComment}
                handleSubmit={handleSubmit}
              />
              {
                card.replies.length > 0 &&
                  <div className='ml-3 flex flex-col gap-3'>
                    {card.replies.map(reply => (
                      <Card
                        key={reply.id}
                        parentId={card.id}
                        id={reply.id}
                        content={reply.content}
                        date={reply.createdAt}
                        score={reply.score}
                        image={reply.user.image}
                        name={reply.user.username}
                        deleteCard={deleteCard}
                        increaseScore={increaseScore}
                        decreaseScore={decreaseScore}
                        setComment={setComment}
                        handleSubmit={handleSubmit}
                      />
                    ))}
                  </div>
              }
            </>
          ))
      }
      <AddComment
        handleSubmit={handleSubmit}
        setComment={setComment}
      />
    </>
  )
}

export default CommentSection
