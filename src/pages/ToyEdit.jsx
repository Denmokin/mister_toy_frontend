import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { saveToy } from "../store/actions/toy.actions.js"
import { useSelector, useDispatch } from "react-redux"
import { useConfirmTabClose } from "../hooks/useConfirmTabClose.js"
import { utilService } from "../service/util.service.js"


// import { toyService } from "../service/toy.service.local.js"
import { toyService } from "../service/toy.service.js"

export function ToyEdit() {
    const { toyId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const setHasChanges = useConfirmTabClose()

    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const toyLabels = useSelector(storeState => storeState.toyModule.toyLabels)


    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

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
                    setToyToEdit(toy)
                }
            })
            .catch(err => {
                console.error('Error loading toy:', err)
            })
            .finally(() => {
                dispatch({ type: 'isLoading', isLoading: false })
            })
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => {
                navigate('/toy')
            })
            .catch(err => console.log('err: ', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            case 'checkbox':
                value = target.checked
                break
            case 'file':
                value = URL.createObjectURL(target.files[0])
                break
            case 'select-multiple':
                value = Array.from(target.selectedOptions, (option) => option.value)
            default:
                break
        }

        setToyToEdit(prevEdit => ({ ...prevEdit, [field]: value }))
        setHasChanges(true)
    }

    if (isLoading || !toyToEdit) {
        return <div>Loading...</div>
    }

    return (
        <section className="toy-edit">
            <form className="toy-edit-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Toy Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={toyToEdit.name}
                        onChange={handleChange}
                        placeholder="Enter toy name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={toyToEdit.price}
                        onChange={handleChange}
                        placeholder="Price"
                        min="1"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imgUrl">Image URL</label>
                    <input
                        type="text"
                        name="imgUrl"
                        id="imgUrl"
                        value={toyToEdit.imgUrl}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="txt">Choose Label</label>
                    <select
                        onChange={handleChange}
                        name="labels"
                        multiple
                        value={toyToEdit.labels || []}>
                        {toyLabels.map(label => <option key={utilService.makeId(label)} value={label}>{label}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="imgFile">Or Upload Image</label>
                    <input
                        type="file"
                        name="imgUrl"
                        id="imgUrl"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>

                {toyToEdit.imgUrl && (
                    <img
                        className="toy-edit-form__img-preview"
                        src={toyToEdit.imgUrl}
                        alt="Preview"
                    />
                )}

                <div className="form-group checkbox-group">
                    <input
                        type="checkbox"
                        name="inStock"
                        id="inStock"
                        checked={toyToEdit.inStock}
                        onChange={handleChange}
                    />
                    <label htmlFor="inStock">Is In Stock</label>
                </div>

                <button className="submit-btn btn save" type="submit">
                    {toyToEdit._id ? 'Save Changes' : 'Add Toy'}
                </button>
            </form>
        </section>
    )
}