import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        msg: 'Пользователь не найден',
      });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.paswordHash);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Неправильная почта или пароль',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretkey',
      {
        expiresIn: '30d',
      },
    );

    const { paswordHash, ...userInfo } = user._doc;

    res.status(200).json({
      ...userInfo,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Не удалось зарегистрироваться',
    });
  }
};

export const reqister = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullname: req.body.fullname,
      paswordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretkey',
      {
        expiresIn: '30d',
      },
    );

    const { paswordHash, ...userInfo } = user._doc;

    res.status(200).json({
      ...userInfo,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Не удалось зарегистрироваться',
    });
  }
};

export const auth = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    const { paswordHash, ...userInfo } = user._doc;
    if (user) {
      res.status(200).json({
        ...userInfo,
      });
    } else {
      res.status(404).json({
        msg: 'Пользователь не найден',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Нет доступа',
    });
  }
}; 
