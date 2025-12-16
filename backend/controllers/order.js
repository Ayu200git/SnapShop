const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/user');
const Order = require('../models/order');

exports.createCheckoutSession = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate(
      'cart.items.productId'
    );

    if (!user.cart.items.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: user.cart.items.map(item => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.productId.title
          },
          unit_amount: Math.round(item.productId.price * 100)
        },
        quantity: item.quantity
      })),
      success_url: `${process.env.FRONTEND_URL}/checkout/success`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`
    });

    res.json({ sessionId: session.id });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate(
      'cart.items.productId'
    );

    const products = user.cart.items.map(i => ({
      quantity: i.quantity,
      product: { ...i.productId._doc }
    }));

    const order = new Order({
      user: { userId: user._id },
      products
    });

    await order.save();
    user.cart.items = [];
    await user.save();

    res.status(201).json({ message: 'Order placed' });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ 'user.userId': req.userId });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};
