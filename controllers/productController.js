import ProductModel from '../models/Product.js';
import CategoryModel from '../models/Category.js';

export const getALl = async (req, res) => {
  try {
    const search = req.query.search || '';
    let category = req.query.category || 'all';
    let sort = req.query.sort || 'price';

    const sortBy = sort[0] === '-' ? -1 : 1;
    sort = sort.replace('-', '');
    const sortOption = {};
    sortOption[sort] = sortBy;

    let categoryOptions = await CategoryModel.find();
    categoryOptions = categoryOptions.map((obj) => obj._doc.tag);

    category === 'all' ? (category = [...categoryOptions]) : (category = [category]);

    const products = await ProductModel.find({ title: { $regex: search, $options: 'i' } })
      .sort(sortOption)
      .where('category')
      .in([...category]);
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Ошибка запроса',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findOne({ _id: productId });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: 'Не удалось получить товар',
    });
  }
};
