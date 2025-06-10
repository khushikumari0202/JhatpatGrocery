import User from "../models/User.js"

//update user cart data : /api/cart/update
export const updateCart = async (req, res)=>{
    try {
        const {userId, cartItems} = req.body
        await User.findByIdAndUpdate(userId, {cartItems} )
        res.json({succsess: true, message: "Cart Updated"})
    } catch (error) {
        console.log(error.message)
        res.json({succsess: false, message: error.message})
    }
}