import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Atílio Antônio',
    email: 'atiliodadalto@guerrillamail.com',
    hashed_password: 'p1l4ntr4',
  });

  return res.json(user);
});

module.exports = routes;
