const User = require('../models/user');
const Product = require('../models/product');

exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate(
      'cart.items.productId'
    );
    res.json({ cart: user.cart.items });
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(req.userId);
    await user.addToCart(product);

    res.json({ message: 'Added to cart' });
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    await user.removeFromCart(req.body.productId);

    res.json({ message: 'Removed from cart' });
  } catch (err) {
    next(err);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findById(req.userId);
    const item = user.cart.items.find(
      i => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await user.save();

    res.json({ message: 'Cart updated' });
  } catch (err) {
    next(err);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    user.cart.items = [];
    await user.save();

    res.json({ message: 'Cart cleared' });
  } catch (err) {
    next(err);
  }
};
