export function ToyPreview({ toy }) {
    return <article className="toy-preview">
        <p>{toy.name}</p>
        <p>{toy.price}</p>
    </article>
}