import express from 'express';
const router = express.Router();

router.use('/users', require('./user').default);
router.use('/todos', require('./todo').default);

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to the express api!' });
});

export default router;