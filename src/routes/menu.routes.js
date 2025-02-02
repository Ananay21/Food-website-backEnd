import { Router } from "express";
import { getMenu,addMenu,updateItem,deleteItem,getSingleItem} from "../controllers/menu.controller.js";

const menuRouter=Router();

menuRouter.route("/").get(getMenu);
menuRouter.route("/:id").get(getSingleItem);
menuRouter.route("/").post(addMenu);
menuRouter.route("/:id").put(updateItem);
menuRouter.route("/:id").delete(deleteItem);

export {menuRouter};