const {v4: uuidv4 } = require('uuid');
const Mutation = {
    createUser(parent, args, {db}, info) {
        const emailTaken = db.users.some((user) => user.email === args.data.email)

        if (emailTaken) throw new Error("email already taken")

        const user = {
            id: uuidv4(),
            ...args.data
        }
        db.users.push(user)

        return user
    },
    deleteUser(parent, args, {db}, info) {
        const userIndex = db.users.findIndex((user) => args.userId === user.id)
        if (userIndex === -1) throw new Error("this user is not exist")
        const deleteUser = db.users.splice(userIndex, 1)
        db.posts = db.posts.filter((post) => {
            const match = post.author === args.userId
            if (match) {
                db.comments = db.comments.filter((comment) => {
                    return comment.post !== post.id
                })
            }
            return !match
        })
        db.comments = db.comments.filter((comment) => comment.author !== args.userId)
        return deleteUser[0]

    },
    updateUser(parent, args, {db}, info){
        const {id, data} = args

        const user = db.users.find((user)=> user.id === id)
        if(!user) throw new Error('User is not found')

        if( typeof data.email === 'string'){
            const emailTaken = db.users.some((user) => data.email === user.email)
            
            if(emailTaken) throw new Error('Email is taken')

            user.email = data.email
        }
        
        if (typeof data.name === 'string') user.name = data.name

        if ( typeof data.age !== 'undefined') user.age = data.age

        return user
    },
    createPost(parent, args, {db}, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)

        if (!userExists) throw new Error('User is not found')

        const post = {
            id: uuidv4(),
            ...args.data

        }
        db.posts.push(post)

        return post
    },
    deletePost(parent, args, {db}, info) {
        const postIndex = db.posts.findIndex((post) => args.postId === post.id)
        if (postIndex === -1) throw new Error('Post not Found')

        let deletePost = db.posts.splice(postIndex, 1)
        db.comments = db.comments.filter((comment) => comment.post !== args.postId)

        return deletePost[0]
    },
    updatePost(parent, args, {db}, info) {
        const {id, data} = args
        const post = db.posts.find((post) => post.id === id)
        if( !post ) throw new Error('Post is not found')

        if( typeof data.title === 'string') post.title = data.title
        if( typeof data.body === 'string') post.body = data.body

        if( typeof data.published === 'boolean') post.published = data.published

        return post
    },
    createComment(parent, args, {db}, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)
        const postExists = db.posts.some((post) => post.id === args.data.post && post.published)
        if (!userExists || !postExists) throw new Error("user or post is not exists")

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)

        return comment
    },
    deleteComment(parent, args, {db}, info) {
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.commentId)
        if (commentIndex === -1) throw new Error('Comment not found')
        let deleteComment = db.comments.splice(commentIndex, 1)

        return deleteComment[0]
    },
    updateComment(parent, args, {db}, info) {
        const {id, data} = args
        const comment = db.comments.find((comment) => comment.id === id)

        if(!comment) throw new Error('Commment is not found')
        if( typeof data.textField === 'string') comment.textField = data.textField
        
        return comment
    }

}
export { Mutation as default}