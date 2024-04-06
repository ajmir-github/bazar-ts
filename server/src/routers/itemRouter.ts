import { Router } from "express";

const itemRouter = Router();

// GET api/item - list items (not sold ones) (if sign check if it is in the pinnedItems of the user)

// GET api/item/:itemId - with user profile (with comments)

// GET api/item/user/:userId (sold and unsold posts of the user)

// POST api/item
// PATCH api/:itemId
// DELETE api/:itemId

// GET api/item/comment
// POST api/item/comment
// UPDATE api/item/comment
// DELETE api/item/comment

export default itemRouter;
