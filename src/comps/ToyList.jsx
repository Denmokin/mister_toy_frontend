import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onEdit, onDetails, onRemove, loggedInUser }) {
    return (
        <section className="toy-list">
            <ul>
                {toys.map(toy =>
                    <li key={toy._id}>
                        <ToyPreview toy={toy} />
                        <div className="toy-preview__actions">
                            <button
                                className="toy-preview__button btn"
                                onClick={() => onDetails(toy._id)}>
                                Details
                            </button>
                            {isUserCreator(toy, loggedInUser) &&
                                <div className="toy-preview__user-actions">
                                    <button
                                        className="toy-preview__button btn"
                                        onClick={() => onEdit(toy._id)}>
                                        Edit
                                    </button>
                                    <button
                                        className="toy-preview__button btn danger"
                                        onClick={() => onRemove(toy._id)}>
                                        Remove
                                    </button>
                                </div>
                            }
                        </div>
                    </li>
                )}
            </ul>
        </section>
    )
}

function isUserCreator(toy, loggedInUser) {
    if (!loggedInUser) return false
    if (loggedInUser.isAdmin) return true
    return loggedInUser._id === toy.creator._id
}