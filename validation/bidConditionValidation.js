const joi = require("joi");
const ValidationMW = require("../middlewares/validationMW");

const createBidConditionSchema = joi.object({
  item_id: joi.number().required(),
  auction_id: joi.number().required(),
  order: joi.number().required(),
  duration: joi.number().valid(0.25, 0.5, 1, 2, 3).required(),
  start_amount: joi.number().required(),
  minimum_bidding_amount: joi.number().required(),
  close_price: joi.number(),
});
