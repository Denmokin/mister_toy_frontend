export function UserInfo({ loggedinUser, toys }) {

    return (
        <section className="user-info-strip">
            <p>Hi, {loggedinUser.fullname}</p>
            <p>Total Toys: {toys.length}</p>
        </section>
    )

}