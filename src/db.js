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
        post: '10'
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
        
}]

const db = {
    users,
    posts,
    comments
}

export { db as default}