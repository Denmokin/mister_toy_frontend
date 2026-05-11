export function ToyPreview({ toy }) {
    return <article className="toy-preview">
        <p>{toy.name}</p>
        <div className="toy-preview__img-container">
            {toy.imgUrl && <img src={toy.imgUrl} />}
        </div>
        <p>Price: {toy.price}</p>
    </article>
}