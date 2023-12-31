import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orders: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', OrderSchema);
