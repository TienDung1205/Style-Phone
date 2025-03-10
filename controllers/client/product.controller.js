const Product = require("../../models/product.model");

// [GET]/products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status : "active",
        deleted: false
    }).sort({position : "desc"});

    const newProducts = products.map((item) => {
        item.newPrice = item.price - item.discountPercentage;
        return item;
    });
    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: newProducts
    });
}

// [GET]/products/:slug
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
    
        const product = await Product.findOne(find);
    
        res.render("client/pages/products/detail.pug", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect(`/products`);
    }
}