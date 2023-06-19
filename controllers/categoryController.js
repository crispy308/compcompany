import CategoryModel from '../models/Category.js';

export const getCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    const result = categories.map((obj) => {
      const { _id, ...data } = obj._doc;
      return data;
    });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Ошибка запроса',
    });
  }
};
