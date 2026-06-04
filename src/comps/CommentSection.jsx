import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { useForm } from "react-hook-form"
import { toyService } from "../service/toy.service.js"
import { useSelector } from "react-redux"

export function CommentSection() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            txt: '',
        }
    })

    useEffect(() => {
        if (!toyId) return

        async function loadToy() {
            try {
                setIsLoading(true)
                const fetchedToy = await toyService.getById(toyId)
                setToy(fetchedToy)
            } catch (err) {
                console.error('Error loading toy:', err)
            } finally {
                setIsLoading(false)
            }
        }
        loadToy()
    }, [toyId])

    async function onSubmit(data) {
        try {
            const msgToSave = { txt: data.txt }

            const updatedToyOrMsg = await toyService.addToyMsg(toyId, msgToSave)

            setToy(prevToy => {
                const updatedMsgs = prevToy.msgs ? [...prevToy.msgs, updatedToyOrMsg] : [updatedToyOrMsg]
                return { ...prevToy, msgs: updatedMsgs }
            })

            reset()
        } catch (err) {
            console.error('Failed to save message: ', err)
        }
    }

    async function onRemoveMsg(msgId) {
        try {
            await toyService.removeToyMsg(toyId, msgId)

            setToy(prevToy => ({
                ...prevToy,
                msgs: prevToy.msgs.filter(msg => msg.id !== msgId)
            }))
        } catch (err) {
            console.error('Failed to remove message:', err)
        }
    }

    if (isLoading) return <div>Loading toy comments...</div>
    if (!toy) return <div>Toy not found</div>

    return (
        <section className="comment-section">
            <form className="comment-section__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="txt">Comment Section</label>
                    <textarea
                        {...register("txt", { required: true })}
                        id="txt"
                        placeholder="What is on your mind....?"
                    />
                    {errors.txt && <span className="error">Comment cannot be empty</span>}
                </div>

                <div className="comment-section__button-group">
                    <button className="submit-btn btn cancel" type="button" onClick={() => reset()}>
                        Cancel
                    </button>
                    <button className="submit-btn btn save" type="submit">
                        Comment
                    </button>
                </div>
            </form>

            {toy.msgs && toy.msgs.length ? (
                <section className="comment-section__list">
                    {toy.msgs.map(msg => (
                        <article className="comment-section__comment" key={msg.id}>
                            <div className="comment-content">
                                <p>{msg.txt || msg.comment}</p>
                                {msg.by && <small>By: {msg.by.fullname}</small>}
                            </div>

                            {(loggedinUser && (msg.by?._id === loggedinUser._id || loggedinUser.isAdmin)) && <button button button button
                                className="btn danger"
                                type="button"
                                onClick={() => onRemoveMsg(msg.id)}
                            >
                                X
                            </button>}
                        </article>
                    ))}
                </section>
            ) : (
                <p>No Comments yet...</p>
            )
            }
        </section >
    )
}