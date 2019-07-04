import { Request, Response, Router } from 'express';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: 'Everythin is ok!'
    });
});

router.post('/messages', (req: Request, res: Response) => {
    const { cuerpo, from } = req.body;

    res.json({
        ok: true,
        body: cuerpo,
        from
    });
});

router.post('/messages/:id', (req: Request, res: Response) => {
    const { cuerpo, from } = req.body;
    const { id } = req.params;

    res.json({
        ok: true,
        body: cuerpo,
        from,
        id
    });
});

export default router;
