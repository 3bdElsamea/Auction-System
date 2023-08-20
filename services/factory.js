const { success } = require("./../utils/response");
const { Op } = require("sequelize");
const { items: ItemImages } = require("../db/models");

module.exports.getOne =
  (Model) =>
  async ({ params: { id } }, res, next) => {
    const result = await Model.findByPk(id);
    if (!result) throw new Error(`this ${Model.name} is not found.`);
    success(result, res);
  };

module.exports.getAll =
  (Model) =>
  async ({ query }, res, next) => {
    const {
      page = 1,
      limit = 10,
      sortBy = "id",
      search = "",
      filterBy = {},
      fields = "",
    } = query;
    let { sortOrder = "asc" } = query;

    if (!["ASC", "DESC"].includes(sortOrder.toUpperCase())) sortOrder = "ASC";
    const selectedFields = fields ? fields.split(",") : undefined;
    const order = [[sortBy, sortOrder.toUpperCase()]];
    const offset = (page - 1) * limit;

    const searchConditions = search
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};
    //filterBy={"name":"Nader"}
    const whereConditions = { ...filterBy, ...searchConditions };

    const result = await Model.findAndCountAll({
      where: whereConditions,
      limit: parseInt(limit),
      attributes: selectedFields?.length > 0 ? selectedFields : undefined,
      offset: offset,
      order: order,
    });

    const totalPages = Math.ceil(result.count / limit);

    success(result.rows, {
      pagination: {
        currentPage: parseInt(page),
        totalPages: totalPages,
        totalItems: result.count,
      },
      count: result.count,
    });
  };

module.exports.createOne =
  (Model) =>
  async ({ body }, res, next) => {
    const result = await Model.create(body);
    if (Model.name === "Item") {
      await ItemImages.bulkCreate([
        ...body.images.map((image) => ({ item_id: result.id, image })),
      ]);
      return res.status(201).json(success(await Model.findByPk(result.id)));
    }
    res.status(201).json(success(result));
  };

module.exports.updateOne =
  (Model) =>
  async ({ params: { id }, body }, res, next) => {
    const result = await Model.findOne({ where: { id } });
    if (!result) throw new Error(`this ${Model.name} is not found.`);
    const updatedUser = await result.update(body, { returning: true });
    res.status(200).json(success(updatedUser));
  };

module.exports.deleteOne =
  (Model) =>
  async ({ params: { id } }, res, next) => {
    const result = await Model.destroy({ where: { id } });
    res
      .status(200)
      .json(
        success(
          result
            ? `${Model.name} deleted successfully.`
            : `${Model.name} is not found.`
        )
      );
  };

module.exports.deleteOnePermanently =
  (Model) =>
  async ({ params: { id } }, res, next) => {
    const result = await Model.destroy({ where: { id }, force: true });
    if (Model.name === "Item") {
      const images = await Model.getItemImages();
      images.forEach(async (image) => await image.destroy({ force: true }));
    }
    res
      .status(200)
      .json(
        success(
          result
            ? `${Model.name} deleted successfully.`
            : `${Model.name} is not found.`
        )
      );
  };

module.exports.restoreOne =
  (Model) =>
  async ({ params: { id } }, res, next) => {
    const result = await Model.restore({ where: { id } });
    res
      .status(200)
      .json(
        success(
          result
            ? `${Model.name} restored successfully.`
            : `${Model.name} is not found.`
        )
      );
  };
