import express, {Application, Request, Response, json} from "express";
import morgan from "morgan"
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { config as dotenv } from "dotenv";

//Router
import UserRoutes from "./routers/UserRoutes";
import AuthRoutes from "./routers/AuthRoutes";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins(): void {
        this.app.use(json())
        this.app.use(morgan("dev"))
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("Ini adlah routes Ts")
        })

        this.app.use("/api/v1/users", UserRoutes);
        this.app.use("/api/v1/auth", AuthRoutes);
    }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
    console.log("Aplikasi ini berjalan pada port " +  port)
})