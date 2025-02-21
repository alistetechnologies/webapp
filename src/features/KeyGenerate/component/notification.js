import toast from "react-hot-toast"
const notify = (msg) => toast(msg)
const success =(msg)=>toast.success(msg)
const error = (msg)=>toast.error(msg)

export const messages ={
    notify,
    success,
    error
}