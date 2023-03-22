import Product from "../models/products";
import joi from "joi";
const productShema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    desc: joi.string().required(),
    status: joi.boolean().required(),
})
export const create = async (req, res) => {
    const { error } = productShema.validate(req.body);
    if (error) {
        res.json({
            message: error.details[0].message,
        });
    }
    try {
        const product = await Product.create(req.body);
        return res.status(200).json({
            message: "Thêm thành công",
            product,
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
export const get = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        return res.status(200).json(products)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
export const remove = async (req, res) => {
    try {
        const products = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "xoá thành công",
            products,
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
export const update = async (req, res) => {
    const { error } = productShema.validate(req.body);
    if (error) {
        res.json({
            message: error.details[0].message,
        });
    }
    try {
        const products = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({
            message: "update thành công",
            products,
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}


