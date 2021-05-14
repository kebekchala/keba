const Subscription = {
    count: {
        subscribe(parent, args, {pubSub}, info) {
            let count = 0
            setInterval(() => {
                count++
                pubSub.publish('count', {
                    count
                })
            }, 1000);
            return pubSub.asyncIterator('count')
        }
    }
}

export {Subscription as default}