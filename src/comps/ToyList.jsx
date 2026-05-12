import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys, onEdit, onDetails, onRemove }) {

    return <section className="toy-list">
        <ul>
            {toys.map(toy =>
                <li key={toy.name}>
                    <ToyPreview toy={toy} />
                    <div className="toy-preview__actions">
                        <button className="toy-preview__button btn"
                            onClick={() => onDetails(toy._id)}>
                            Details
                        </button>
                        <button className="toy-preview__button btn"
                            onClick={() => onEdit(toy._id)}>
                            Edit
                        </button>
                        <button className="toy-preview__button btn danger"
                            onClick={() => onRemove(toy._id)}>
                            Remove
                        </button>
                    </div>
                </li>)}
        </ul>

    </section>
}