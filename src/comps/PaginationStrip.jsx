export function PaginationStrip({ filterBy, onChangePage, totalPages }) {
    return <section className="pagination">
        <div className="pagination-content">
            <button
                className="pagination-content__button btn"
                disabled={filterBy.pageIdx === 0}
                onClick={() => onChangePage(-1)}
            >
                Prev
            </button>
            <span>Page {filterBy.pageIdx + 1} of {totalPages}</span>
            <button
                className="pagination-content__button btn"
                disabled={filterBy.pageIdx >= totalPages - 1}
                onClick={() => onChangePage(1)}
            >
                Next
            </button>
        </div>
    </section>
}