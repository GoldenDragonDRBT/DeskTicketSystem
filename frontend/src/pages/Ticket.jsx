import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice"
import { getNotes, createNote, reset as notesReset } from "../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem"

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root') // "#root" will look it our "index.html" and mounted to this "#root"

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)

  const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes)

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { ticketId } = useParams() // This destructuring variable will get the "ticketId" from the "URL". Then we get pass in to "dispatch(getTicket(ticketId))". 

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId])

  // Close Ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    // console.log('Submit')
    dispatch(createNote({ noteText, ticketId }))
    closeModal() // Emplementing this "closeModal()" to close modal
  }

  // Open/close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (isLoading || notesIsLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>
  }

  return (
    <div className='ticket-page'>
      <header className="ticket-header">
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id} {/* "ticket._id" because of thats how it formatted in MongoDB and the ticket we get it from the "state.tickets" using "useSelector" inside the function Ticket */}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button className="btn" onClick={openModal}><FaPlus />Add Note</button>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="AddNote">
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className='from-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            >
            </textarea>
          </div>
          <div className="form-group">
            <button className="btn" type='submit'>Submit</button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  )
}
export default Ticket;

/* 
As we know if we want to disable an error that "eslint" detect we have to options:
1. In ".eslint.json" file turn on/off the specific error that "eslint" detect.
2. We can disable it inside of programming implementation right above the specific line code like we did in line 23 "// eslint-disable-next-line".
*/