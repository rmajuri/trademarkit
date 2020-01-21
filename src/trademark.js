import { Router } from 'express'
import axios from 'axios'

const router = Router()

router.get('/:searchPhrase', async (req, res, next) => {
    try {
        const response = await axios.get(`https://markerapi.com/api/v2/trademarks/trademark/${decodeURI(req.params.searchPhrase)}/status/all/start/1/username/merman/password/7xRdLjM2Bh`);
        res.status(200).json(response.data)
    } catch (error) {
        next(error)
    }
});

export default router
