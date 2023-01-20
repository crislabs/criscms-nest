import { Types } from 'mongoose';
import { capitalizar, slug, uuidv3 } from 'utils/function';
import {
  CreateProduct,
  UpdateDetailProduct,
  UpdateLikesProduct,
  UpdatePriceProduct,
  UpdateProduct,
  UpdateSpecsProduct,
  UpdateTagsProduct,
} from '../dto/product.input';
import { UpdateImageProduct, UpdateImageSeo } from '../dto/site.input';

export function productCreated({
  title,
  description,
  siteId,
  parentId,
  uid,
  type,
}: CreateProduct) {
  return {
    _id: new Types.ObjectId(),
    siteId: siteId,
    parentId: parentId,
    slug: slug(title),
    data: {
      title: title,
      description: description,
      type: {
        label: typeProduct(type),
        slug: slug(type),
      },

      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        register: [
          {
            uid: uid,
            change: 'product created',
            updatedAt: new Date(),
          },
        ],
      },
    },
  };
}

export function productUpdated({ id, title, description, uid }: UpdateProduct) {
  return {
    $set: {
      'data.title': title,
      'data.description': description,
      'data.updateDate.lastUpdatedAt': new Date(),
      slug: slug(title),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'product updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function productDetailUpdated({ text, uid }: UpdateDetailProduct) {
  return {
    $set: {
      'data.details': text,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'product detail updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function productSpecsUpdated({ text, uid }: UpdateSpecsProduct) {
  return {
    $set: {
      'data.specs': text,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'product specs updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function productPriceUpdated({ price, discountPrice, inStock, uid }: UpdatePriceProduct) {
  return {
    $set: {
      'data.price': price,
      'data.discountPrice': discountPrice,
      'data.inStock': inStock,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'product price updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function productTagsUpdated({ tags, uid }: UpdateTagsProduct) {
  return {
    $set: {
      'data.tags': tags.map((data) => ({
        uid: uuidv3(),
        text: data,
        slug: slug(data),
      })),
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'product tags updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function productLikesUpdated({ uid }: UpdateLikesProduct) {
  return {
    $set: {
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $addToSet: {
      'data.likes': uid,
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'product likes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function productDisLikesUpdated({ uid }: UpdateLikesProduct) {
  return {
    $set: {
      // 'data.likes': tags.map((data) => ({
      //   uid: uuidv3(),
      //   text: data,
      //   slug: slug(data),
      // })),
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $pull: {
      'data.likes': uid,
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'product dislikes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function productUpdateImage({
  id,
  images,
  type,
  uid,
}: UpdateImageProduct) {
  // const { src, alt } = images as InputImage;
  return {
    $set: {
      'data.images': images.map((data) => ({
        
        src: data.src,
        alt: data.alt,
      })),
      
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'image product update',
        updatedAt: new Date(),
      },
    },
  };
}
export function productUpdateImageSeo({
  id,
  src,
  uid,
}: UpdateImageSeo) {
  // const { src, alt } = images as InputImage;
  return {
    $set: {
      'data.thumbnailUrl': src,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'image product update',
        updatedAt: new Date(),
      },
    },
  };
}

export function typeProduct(type: string) {
  let data: string;
  switch (type) {
    case 'adoption':
      data = 'Adoption';
      break;

    default:
      console.log(`Sorry, we are out of ${type}.`);
      break;
  }
  return data;
}
