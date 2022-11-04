import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { checkAuth } from '../../../authUtils/checkAuth';
import { trackSite } from '../../../utils/trackSite';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'DELETE':
      try {
        const user = checkAuth(req);
        const foundedUser = await User.findById(user.id);
        if (!foundedUser) {
          throw 'user not found';
        }

        const trackerIdx = foundedUser.trackers.findIndex(
          (t) => t.id === req.query.id
        );

        const deletedItem = foundedUser.trackers[trackerIdx];

        foundedUser.trackers.splice(trackerIdx, 1);
        await foundedUser.save();

        res.status(200).json({ success: true, deletedItem });
      } catch (err) {
        res.status(400).json({ success: false, err });
      }
      break;
    case 'PATCH':
      try {
        const user = checkAuth(req);
        const foundedUser = await User.findById(user.id);
        const trackerIdx = foundedUser.trackers.findIndex(
          (t) => t.id === req.query.id
        );
        const obj = foundedUser.trackers[trackerIdx];
        const product = await trackSite(obj.productURL);

        const editedObj = { ...obj._doc, ...product, updated: Date.now() };

        foundedUser.trackers[trackerIdx] = editedObj;
        await foundedUser.save();
        const updatedItem = foundedUser.trackers[trackerIdx];

        res.status(200).json({ success: true, updatedItem });
      } catch (err) {
        res.status(400).json({ success: false, err });
      }
      break;

    default: {
    }
  }
}
