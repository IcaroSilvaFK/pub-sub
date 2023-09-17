package pub_sub

import (
	"sync"
)

type Handler struct {
	Name    string
	Handler func(msg interface{})
}

type Pub struct {
	handlers map[string][]Handler
}

func NewPubSub() *Pub {
	return &Pub{
		handlers: make(map[string][]Handler),
	}
}

func (pub *Pub) AddListener(topic, name string, listener func(msg interface{})) {

	pub.handlers[topic] = append(pub.handlers[topic], Handler{
		Name:    name,
		Handler: listener,
	})

}

func (pub *Pub) Send(topic string, msg interface{}) {

	if handlers, ok := pub.handlers[topic]; ok {
		wg := sync.WaitGroup{}
		for _, h := range handlers {
			wg.Add(1)
			go func() {
				h.Handler(msg)
				wg.Done()
			}()
			wg.Wait()
		}
	}
}

func (pub *Pub) Unsubscribe(topic string, listener string) {
	if handlers, ok := pub.handlers[topic]; ok {
		for i, handle := range handlers {
			if handle.Name == listener {
				pub.handlers[topic] = append(handlers[:i], handlers[i+1:]...)
			}
		}
	}
}
