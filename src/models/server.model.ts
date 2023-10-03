import express from "express";
import wodRouter from "../routers/wod.router";
import randomRouter from "../routers/random.router";

export default class Server {

    private app: express.Application;
    private port: string;
    // paths
    private paths = {
        wod: '/api/v1/wod',
        random: '/api/v1/random',
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        // Routes
        this.routes();
    }

    routes() {
        this.app.use(this.paths.wod, wodRouter);
        this.app.use(this.paths.random, randomRouter);
    }

    run(port: string = this.port) {
        this.app.listen(port, () => console.log(`🏋🏻‍♂️ Server running: http://localhost:${port}`));
    }
}