import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe";
import User from "../models/User.js";


//place order: COD: /api/order/cod
export const placeOrderCOD= async (req, res)=>{
    try {
        const userId = req.userId;
        const {items, address} = req.body
        if(!address || items.length === 0){
            return res.json({success: false, message: "Invalid Data"})
        }
        //calculate amount using items
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.json({ success: false, message: "Product not found" });
            }
            amount += product.offerPrice * item.quantity;
        }

        //add tax charge (2%)
        amount += Math.floor(amount*0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        return res.json({success: true, message: "Order Placed Successfully"})
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

//place order: ONLINE: /api/order/stripe
export const placeOrderStripe = async (req, res)=>{
    try {
        const userId = req.userId;
        const {items, address} = req.body
        const {origin} = req.headers;
        if(!address || items.length === 0){
            return res.json({success: false, message: "Invalid Data"})
        }

        let productData = [];
        //calculate amount using items
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.json({ success: false, message: "Product not found" });
            }
            productData.push({
                name: product.name,
                offerPrice: product.offerPrice,
                quantity: item.quantity,
            })
            //calculate total amount
            amount += product.offerPrice * item.quantity;
        }

        //add tax charge (2%)
        amount += Math.floor(amount*0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });

        //stripe gateway Initialization
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //create line item for stripe
        const line_items = productData.map(item=> {
            return {
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.offerPrice * 1.02 * 100), //amount in paise
                },
                quantity: item.quantity,
            }
        })

        //create checkout session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=/my-orders`,
            cancel_url: `${origin}/loader?next=/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        })

        return res.json({success: true, url: session.url});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

//STRIPE webhook: /stripe
// STRIPE webhook: /stripe
export const stripeWebhooks = async (request, response) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        return response.status(400).send(`Webhook Error: ${error.message}`);
    }

    // ✅ Handle checkout.session.completed
    switch (event) {
        case "payment_intent.succeeded":{
            const paymentIntend = event.data.object;
            const paymentIntentId = paymentIntend.id;

            //getting session metadata
            const session = await stripeInstance.checkout.session.list({
                payment_intent: paymentIntentId,
            });

            const {orderId, userId} = session.data[0].metadata;

            //mark order as paid
            await Order.findByIdAndUpdate(orderId, {isPaid: true})
            //clear cart items
            await User.findByIdAndUpdate(userId, {cartItems: []});
            break;
        }

        case "payment_intent.payment_failed":{
            const paymentFailed = event.data.object;
            const paymentIntentId = paymentFailed.id;

            //getting session metadata
            const session = await stripeInstance.checkout.session.list({
                payment_intent: paymentIntentId,
            });

            const {orderId} = session.data[0].metadata;

            //mark order as failed
            await Order.findByIdAndUpdate(orderId);
            break;
        }

    
    
        default:
            console.error(`Unhandled event type ${event.type}`);
            break;
    }

  response.json({ received: true });
};


//get orders by user id: /api/order/user
export const getUserOrders = async (req, res)=>{
    try {
        const userId = req.userId;
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success: true, orders});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

//get all orders (for seller / admin): /api/order/seller

export const getAllOrders = async(req, res)=>{
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success: true, orders})
        
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}   

