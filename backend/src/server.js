import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env, validateEnvironment } from "./config/environment.js";

validateEnvironment();
await connectDatabase();
app.listen(env.port, () => console.info(`SkillBridge API listening on port ${env.port}`));
