import { useNavigate } from "react-router"

export function AddToyStrip() {

    const navigate = useNavigate()

    return (
        <section className="add-toy-strip">
            <button
                className='add-toy-strip__button'
                onClick={() => navigate('edit')}
            > Add Toy +</button>
        </section >
    )
}