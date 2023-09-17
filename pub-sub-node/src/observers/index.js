let subscribers = []

/**
 * 
 * @param {string} topic
 * @param {Function} fn
*/
export function subscribe(topic,fn) {

  const findIndexTopic = subscribers.findIndex(sub => sub.topic === topic) 

  if(findIndexTopic < 0){
    subscribers = [
      ...subscribers,
      {
        topic,
        handlers: [fn]
      }
    ]

    return
  }

  subscribers[findIndexTopic].handlers.push(fn)
}


/**
 * 
 * @param {String} topic 
 * @param {any} msg 
 */
export async function notify(topic, msg){
  
  for(const sub of subscribers) {
    if(sub.topic === topic) {
      setTimeout(() => {
        sub.handlers.forEach(async handler => {
          await handler(msg)
        })
      },4000)
    }
  }
}


/**
 * 
 * @param {String} topic
 * @param {Function} fn
*/
export function unsubscribe(topic,fn) {

  const findIndexTopic = subscribers.findIndex(sub => sub.topic === topic)

  if(findIndexTopic < 0) return

  subscribers[findIndexTopic].handlers = subscribers[findIndexTopic].handlers.filter(handler => handler !== fn)
}
