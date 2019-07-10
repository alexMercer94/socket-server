import { Request, Response, Router } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: 'Everythin is ok!'
    });
});

router.post('/messages', (req: Request, res: Response) => {
    const { message, from } = req.body;

    const payload = {
        from,
        message
    };

    const server = Server.instance;
    server.io.emit('new-message', payload);

    res.json({
        ok: true,
        body: message,
        from
    });
});

/**
 * Route to send a message an specific user
 */
router.post('/messages/:id', (req: Request, res: Response) => {
    const { cuerpo, from } = req.body;
    const { id } = req.params;

    const payload = {
        from,
        cuerpo
    };

    const server = Server.instance;
    server.io.in(id).emit('private-message', payload);

    res.json({
        ok: true,
        body: cuerpo,
        from,
        id
    });
});

export default router;
