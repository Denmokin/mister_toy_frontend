import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { toyService } from '../service/toy.service.js'

export function ToyFilter({ filterBy, setFilterBy, toyLabels, onClearFilter }) {

    const { register, control, watch, reset } = useForm({
        defaultValues: filterBy
    })

    const labelOptions = toyLabels.map(label => ({ value: label, label: label }))

    useEffect(() => {
        const subscription = watch((values) => {
            const formattedValues = {
                ...values,
                inStock: values.inStock ? true : '',
                maxPrice: values.maxPrice || ''
            }
            setFilterBy(formattedValues)
        })
        return () => subscription.unsubscribe()
    }, [watch, setFilterBy])

    function clearFilter() {
        onClearFilter()
        reset(toyService.getDefaultFilters())
    }

    return (
        <section>
            <form className='toy-filter_form' onSubmit={(e) => e.preventDefault()}>

                <div className='form-group'>
                    <label htmlFor='txt'>Search by name</label>
                    <input {...register('txt')} type='text' id='txt' placeholder='Search for Toys' />
                </div>

                <div className='form-group'>
                    <label htmlFor='labels'>Select by label</label>

                    <Controller
                        name="labels"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                isMulti
                                options={labelOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Select labels..."
                                onChange={(selectedOptions) => {
                                    field.onChange(selectedOptions.map(option => option.value))
                                }}
                                value={labelOptions.filter(option =>
                                    field.value?.includes(option.value)
                                )}
                            />
                        )}
                    />
                </div>

                <div className='form-group checkbox-group'>
                    <label htmlFor='inStock'>Is in stock</label>
                    <input {...register('inStock')} type='checkbox' id='inStock' />
                </div>

                <div className='form-group'>
                    <label htmlFor='maxPrice'>Max Price</label>
                    <input {...register('maxPrice', { valueAsNumber: true })} type='number' id='maxPrice' />
                </div>

                <button type='button' className='btn secondary' onClick={clearFilter}>
                    Clear Filters
                </button>

            </form>
        </section>
    )
}