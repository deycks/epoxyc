import { NextApiRequest, NextApiResponse } from 'next';
import { json } from 'body-parser';
import nextConnect from 'next-connect';

const middleware = nextConnect();

middleware.use(json({ limit: '10mb' })); // Aumenta el límite de tamaño del cuerpo a 10 MB

export default middleware;