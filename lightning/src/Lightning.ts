import { EventEmitter } from "events";
require("dotenv").config();
const opennode = require("opennode");

class Lightning extends EventEmitter {
  private client;

  constructor() {
    super();
    this.client = opennode.setCredentials(
      process.env.OPENNODE_API_KEY_DEV,
      "dev"
    );
  }
}

export default new Lightning();
