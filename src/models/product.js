const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    situation: {
        type: Number,
        required: true,
        default: 1,
    },
    type: {
        type: Number,
        required: true,
        default: 1,
    },
    price: {
        type: Number,
        default: 0
    },
    pictures: [{
        picture: { data: Buffer, contentType: String }
    }]
}, {
    timestamps: true
});

// Getter for price
productSchema.methods.toJSON = function () {
    const product = this;

    //Formata preço
    var formatedProduct = product.toObject();
    formatedProduct.price = (formatedProduct.price / 100).toFixed(2);

    return formatedProduct;
}

// Setter for price
productSchema.path('price').set(function (num) {
    return num * 100;
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;