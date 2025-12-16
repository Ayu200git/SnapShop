const Product = require('../models/product');

const ITEMS_PER_PAGE = 10;

exports.getProducts = async (req, res, next) => {
  try {
    const page = +req.query.page || 1;

    const totalItems = await Product.countDocuments();
    const products = await Product.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};
