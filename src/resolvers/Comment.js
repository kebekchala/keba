const Comment = {
    author(parent, args, { db }, info) {
        return db.users.find((user) => {
            return parent.author === user.id
        })
    },
    posts(parent, args, { db }, info) {
        return db.posts.filter((post) => {
            return parent.post === post.id
        })
    }
}

export { Comment as default}