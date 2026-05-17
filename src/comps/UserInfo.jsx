export function UserInfo({ loggedInUser, toys }) {

    return (
        <section className="user-info-strip">
            <p>Hi, {loggedInUser.fullname}</p>
            <p>Total Toys: {toys.length}</p>
        </section>
    )

}