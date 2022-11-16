import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { checkAuth } from '../../../authUtils/checkAuth';
import { trackSite } from '../../../utils/trackSite';

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const user = checkAuth(req);
        const foundedUser = await User.findById(user.id);
        if (!foundedUser) {
          throw 'user not found';
        }
        const trackers = foundedUser.trackers;
        res.status(200).json({ success: true, trackers });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'POST':
      try {
        const user = checkAuth(req);

        const foundedUser = await User.findById(user.id);
        if (!foundedUser) {
          throw 'user not found';
        }

        const product = await trackSite(body.productURL);

        const newProduct = {
          ...product,
          isPriceMeet: body.desired_price >= product.last_price,
          productURL: body.productURL,
          desired_price: body.desired_price,
          createAt: Date.now(),
          updated: Date.now(),
        };

        foundedUser.trackers.unshift(newProduct);

        await foundedUser.save();
        const newTracker = foundedUser.trackers[0];

        res.status(200).json({ success: true, newTracker });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      {
      }
      break;
  }
}
