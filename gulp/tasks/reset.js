import path from "../config/path.js";
import { deleteAsync } from "del";

const reset = () => {
	return deleteAsync(path.clean)
}

export default reset