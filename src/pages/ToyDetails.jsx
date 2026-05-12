import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// import { toyService } from "../service/toy.service.local.js"
import { toyService } from "../service/toy.service.js"

export function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        if (toyId) {
            loadToy()
        }
    }, [toyId])

    function loadToy() {
        dispatch({ type: 'isLoading', isLoading: true })

        toyService.getById(toyId)
            .then(toy => {
                if (toy) {
                    setToy(toy)
                }
            })
            .catch(err => {
                console.error('Error loading toy:', err)
            })
            .finally(() => {
                dispatch({ type: 'isLoading', isLoading: false })
            })
    }

    if (isLoading || !toy) {
        return <div>Loading...</div>
    }

    return (
        <section className="toy-details">
            <div className='toy-details__content'>
                <h1>Toy name: {toy.name}</h1>
                <h5>Price: ${toy.price}</h5>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Animi voluptas cumque tempore, aperiam sed dolorum rem!
                    Nemo quidem, placeat perferendis tempora aspernatur sit,
                    explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!
                </p>
                <div className="toy-details__actions">
                    <Link to={`/toy/edit/${toy._id}`}>
                        <button className='toy-details__button btn save'>Edit</button>
                    </Link>
                    <Link to="/toy">
                        <button className='toy-details__button btn'>back</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}