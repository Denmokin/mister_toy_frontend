import { useEffect, useRef, useState } from "react"

export function ToyFilter({ filterBy, setFilterBy }) {

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
                value = target.checked
                break
            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt = '', inStock = false, maxPrice = 0 } = filterByToEdit

    return (
        <section>
            <form className="toy-filter_form">
                <div className="filter-group">
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

                <div className="filter-group checkbox-group">
                    <label htmlFor="inStock">Is in stock</label>
                    <input
                        checked={inStock === true}
                        value={inStock}
                        onChange={handleChange}
                        type="checkbox"
                        name="inStock"
                        id="inStock"
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input
                        value={maxPrice || ''}
                        onChange={handleChange}
                        type="number"
                        name="maxPrice"
                        id="maxPrice"
                    />
                </div>
            </form>
        </section>
    )
}