import { toyService } from '../service/toy.service.js'
import { utilService } from '../service/util.service.js'
import { useEffect, useRef, useState } from "react"


export function ToyFilter({ filterBy, setFilterBy, toyLabels, onClearFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            case 'checkbox':
                value = target.checked ? true : ''
                break
            case 'select-multiple':
                value = Array.from(target.selectedOptions, (option) => option.value)
                break
            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function clearFilter() {
        onClearFilter()
        setFilterByToEdit(toyService.getDefaultFilters())
    }

    const { txt = '', inStock = '', maxPrice = 0 } = filterByToEdit

    return (
        <section>
            <form className="toy-filter_form">
                <div className="form-group">
                    <label htmlFor="txt">Search by name</label>
                    <input
                        value={txt}
                        onChange={handleChange}
                        placeholder="Search for Toys"
                        type="text"
                        name="txt"
                        id="txt"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="txt">Select by label</label>
                    <select
                        onChange={handleChange}
                        name="labels"
                        multiple
                        value={filterByToEdit.labels || []}>
                        <option value={''}> All </option>
                        {toyLabels.map(label => <option key={utilService.makeId(label)} value={label}>{label}</option>)}
                    </select>
                </div>

                <div className="form-group checkbox-group">
                    <label htmlFor="inStock">Is in stock</label>
                    <input
                        checked={inStock === true}
                        onChange={handleChange}
                        type="checkbox"
                        name="inStock"
                        id="inStock"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input
                        value={maxPrice || ''}
                        onChange={handleChange}
                        type="number"
                        name="maxPrice"
                        id="maxPrice"
                    />
                </div>
                <button
                    className='btn secondary'
                    type='button'
                    onClick={() => clearFilter()}>Clear Filters
                </button>
            </form>
        </section>
    )
}