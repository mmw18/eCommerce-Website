const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET all the products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a product by the ID
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    // If any tag id's provided, associate them with the new product
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return { product_id: product.id, tag_id };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT or update a product by the ID
router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Updating the product tags if there's any change in the tagIds
    if (req.body.tagIds) {
      const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return { product_id: req.params.id, tag_id };
        });

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }
    res.status(200).json({ message: 'Product updated!' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a product by the ID
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Product deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

