import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import Select from "react-select"

import { saveToy } from "../store/actions/toy.actions.js"
import { useConfirmTabClose } from "../hooks/useConfirmTabClose.js"
import { toyService } from "../service/toy.service.js"

export function ToyEdit() {
    const { toyId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const setHasChanges = useConfirmTabClose()
    const toyLabels = useSelector(storeState => storeState.toyModule.toyLabels)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        formState: { isDirty }
    } = useForm({
        defaultValues: toyService.getEmptyToy()
    })

    useEffect(() => {
        setHasChanges(isDirty)
    }, [isDirty, setHasChanges])

    useEffect(() => {
        if (!toyId) return

        async function loadToy() {
            setIsLoading(true)
            try {
                const toy = await toyService.getById(toyId)
                reset(toy)
                console.error('Error loading toy:', err)
            }
            finally {
                setIsLoading(false)
                dispatch({ type: 'isLoading', isLoading: false })
            }
        }
        loadToy()
    }, [toyId, reset, dispatch])

    async function onSubmit(data) {
        try {
            await saveToy(data)
            setHasChanges(false)
            navigate('/toy')
        }
        catch (err) {
            console.error('err: ', err)
        }
    }

    function handleFileUpload(ev) {
        const file = ev.target.files[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setValue('imgUrl', url, { shouldDirty: true })
        }
    }

    const labelOptions = toyLabels.map(label => ({ value: label, label: label }))

    const currentImgUrl = watch('imgUrl')

    if (isLoading) return <div>Loading...</div>

    return (
        <section className="toy-edit">
            <form className="toy-edit-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <label htmlFor="name">Toy Name</label>
                    <input
                        {...register("name", { required: true })}
                        type="text"
                        id="name"
                        placeholder="Enter toy name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        {...register("price", { required: true, valueAsNumber: true, min: 1 })}
                        type="number"
                        id="price"
                        placeholder="Price"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="txt">Choose Labels</label>
                    <Controller
                        name="labels"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                isMulti
                                options={labelOptions}
                                placeholder="Select labels..."
                                onChange={(selected) => {
                                    field.onChange(selected.map(opt => opt.value))
                                }}
                                value={labelOptions.filter(opt =>
                                    field.value?.includes(opt.value)
                                )}
                            />
                        )}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imgUrl">Image URL</label>
                    <input
                        {...register("imgUrl")}
                        type="text"
                        id="imgUrl"
                        placeholder="Enter image URL"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imgFile">Or Upload Image</label>
                    <input
                        type="file"
                        id="imgFile"
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                </div>

                {currentImgUrl && (
                    <img
                        className="toy-edit-form__img-preview"
                        src={currentImgUrl}
                        alt="Preview"
                    />
                )}

                <div className="form-group checkbox-group">
                    <input
                        {...register("inStock")}
                        type="checkbox"
                        id="inStock"
                    />
                    <label htmlFor="inStock">Is In Stock</label>
                </div>

                <button className="submit-btn btn save" type="submit">
                    {toyId ? 'Save Changes' : 'Add Toy'}
                </button>
            </form>
        </section>
    )
}