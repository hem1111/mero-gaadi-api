import ownerRouter from './owner-api/routes.js';

export default function routes(app) {
    app.use('/owners', ownerRouter());
} 