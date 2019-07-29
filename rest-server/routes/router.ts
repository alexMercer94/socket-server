import { Request, Response, Router } from 'express';
import { ChartData } from '../classes/chart';
import { Map } from '../classes/map';
import Server from '../classes/server';
import { usersConnected } from '../sockets/sockets';

const router = Router();

const chart = new ChartData();

// * Routes for Maps App
export const map = new Map();
const places = [
    {
        id: '1',
        name: 'Udemy',
        lat: 37.784679,
        lng: -122.395936
    },
    {
        id: '2',
        name: 'Bahía de San Francisco',
        lat: 37.798933,
        lng: -122.377732
    },
    {
        id: '3',
        name: 'The Palace Hotel',
        lat: 37.788578,
        lng: -122.401745
    }
];

map.markers.push(...places);

/**
 * Route to get Markers
 */
router.get('/map', (req: Request, res: Response) => {
    res.json(map.getMarkers());
});

// * Routes for CHART APP

/**
 * Route to get Encueta's data
 */
router.get('/encuesta', (req: Request, res: Response) => {
    res.json(chart.getEncuestaData());
});

/**
 * Route to update Encuesta's data
 */
router.post('/encuesta', (req: Request, res: Response) => {
    const { option, units } = req.body;
    chart.incrementValues(Number(option), Number(units));

    const server = Server.instance;
    server.io.emit('change-encuesta', chart.getEncuestaData());

    res.json(chart.getEncuestaData());
});

/**
 * Route to get Chart's data
 */
router.get('/chart', (req: Request, res: Response) => {
    res.json(chart.getChartData());
});

/**
 * Route to update the Chart's Data
 */
router.post('/chart', (req: Request, res: Response) => {
    const { month, units } = req.body;
    chart.incrementValue(month, Number(units));

    const server = Server.instance;
    server.io.emit('change-chart', chart.getChartData());

    res.json(chart.getChartData());
});

/**
 * Route send a message to all users
 */
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

/**
 * Route to get all User's IDs
 */
router.get('/users', (req: Request, res: Response) => {
    const server = Server.instance;

    server.io.clients((err: any, clients: string[]) => {
        if (err) {
            return res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            clients
        });
    });
});

/**
 * Router to get users and their names
 */
router.get('/users/detail', (req: Request, res: Response) => {
    res.json({
        ok: true,
        clients: usersConnected.getList()
    });
});

export default router;
