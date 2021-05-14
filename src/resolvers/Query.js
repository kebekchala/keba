const Query = {

    comments(parent, args, {db}, info) {
        return db.comments
    },
    posts(parent, args, {db}, info) {
        if (!args.title && !args.body) {
            return db.posts
        }
        return db.posts.filter((post) => {
            const isTitleMatch = post.title.toLowerCase().includes(args.title.toLowerCase())
            const isBodyMatch = post.body.toLowerCase().includes(args.body.toLowerCase())
            return isTitleMatch || isBodyMatch
            //
        })
    },
    users(parent, args, {db}, info) {
        if (!args.query)
            return db.users
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    me() {
        {
            return {
                id: '1234555',
                name: 'kebe',
                email: 'keba@gmail.com',
                age: 25
            }
        }
    },

}

export { Query as default}