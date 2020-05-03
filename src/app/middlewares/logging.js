export default async (req, res, next) => {
  console.log(`Receiving request to '${req.originalUrl}'`);
  return next();
};
