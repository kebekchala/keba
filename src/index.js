import {GraphQLServer} from 'graphql-yoga'
const express = require('express')
const route = express()


// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
        comments: [Comment!]!
    }
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments:[Comment!]!
    }
    
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        textField: String!
        author: User!
        posts: [Post!]!

    }

`
// Data
const users = [
    {
        id:'1',
        name:'oliyad',
        email:'oliyad@example.com',
        age:16
    },
    {
        id:'2',
        name:'kena',
        email:'kena@example.com',
        age:2
    },
    {
        id:'3',
        name:'abdi',
        email:'abdi@example.com',
        age:28
    }
    
    ]

const posts = [
    {
        id:'10',
        title:"The Lost city",
        body: "the lost",
        published: true,
        author: '1'

    },
    {
        id:'11',
        title:"Derto geda",
        body: "Derto",
        published: false,
        author: '1'
    },
    {
        id:'12',
        title:"Godannisa",
        body: "Godannisa",
        published: true,
        author:'2'
    },
    {
        id:'13',
        title: "Ye Burqa Zimita",
        body: "Burqa",
        published: true,
        author: '3'
    }

]

const comments = [
    {
        id: "100",
        textField: "this book is one of my favorite",
        author: '1',
        post:'10'
    },
    {
        id: "101",
        textField: "this book is not good but it's not bad",
        author: '3',
        post: '11'
    },
    {
        id: "102",
        textField: "WTF i hate this book it full of shit",
        author: '2',
        post: '12'

    },
    {
        id: "103",
        textField: "Glad you enjoyed it",
        author: '3',
        post:'13'
        
    }
]

// Resolvers
const resolvers = {
    Query: {
        
        comments(parent, args, ctx, info){
            return comments
        },
        posts(parent, args, ctx, info){
            if(!args.title  && !args.body){
                return posts
            }
            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.title.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.body.toLowerCase())
                return isTitleMatch || isBodyMatch
                //
            })
        },
        users(parent, args, ctx, info){
            if(!args.query)
                return users
            return users.filter((user) =>{
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

    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author 
            })
        },
        comments(parent, args, ctx, info){
            return comments.filter((comment) => {
                console.log(parent.id, comment.post)
                return parent.id === comment.post
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) =>{
                return parent.id === comment.author
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info){
            return users.find((user) =>{
                return parent.author === user.id
            })
        },
        posts(parent, args, ctx, info){
            return posts.filter((post) =>{
                return parent.post === post.id
            })
        }
    }
    
}

const server = new  GraphQLServer({
    typeDefs,
    resolvers
})
server.start(() => {
    console.log('The server is up')
}) 