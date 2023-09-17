package main

import (
	"fmt"
	pub_sub "pubsub/example"
)

func main() {

	pubSub := pub_sub.NewPubSub()

	pubSub.AddListener("topic1", "name1", func(msg interface{}) {
		fmt.Println(msg)
	})
	pubSub.AddListener("topic1", "name2", func(msg interface{}) {
		fmt.Println(msg)
	})
	pubSub.AddListener("topic1", "name3", func(msg interface{}) {
		fmt.Println(msg)
	})

	pubSub.Unsubscribe("topic1", "name2")

	pubSub.Send("topic1", "hello")
}
