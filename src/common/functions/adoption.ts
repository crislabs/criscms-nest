import { Types } from 'mongoose';
import { capitalizar, slug, uuidv3 } from 'utils/function';
import {
  CreateAdoption,
  UpdateDetailAdoption,
  UpdateLikesAdoption,
  UpdatePriceAdoption,
  UpdateAdoption,
  UpdateSpecsAdoption,
  UpdateTagsAdoption,
} from '../dto/adoption.input';
import { UpdateImageSeo, UpdateImageProduct } from '../dto/site.input';

export function adoptionCreated({
  name,
  description,
  siteId,
  parentId,
  uid,
  type,
}: CreateAdoption) {
  return {
    _id: new Types.ObjectId(),
    parentId: parentId,
    slug: slug(name),
    data: {
      name: name,
      description: description,
      siteId: siteId,
      // type: type,
      type: {
        label: typeAdoption(type),
        slug: slug(type),
      },

      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        register: [
          {
            uid: uid,
            change: 'adoption created',
            updatedAt: new Date(),
          },
        ],
      },
    },
  };
}

export function adoptionUpdated({ id, name, description, uid }: UpdateAdoption) {
  return {
    $set: {
      'data.name': name,
      'data.description': description,
      'data.updateDate.lastUpdatedAt': new Date(),
      slug: slug(name),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'adoption updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function adoptionDetailUpdated({ text, uid }: UpdateDetailAdoption) {
  return {
    $set: {
      'data.details': text,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'adoption detail updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function adoptionSpecsUpdated({ text, uid }: UpdateSpecsAdoption) {
  return {
    $set: {
      'data.specs': text,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'adoption specs updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function adoptionPriceUpdated({ price, discountPrice, inStock, uid }: UpdatePriceAdoption) {
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
        change: 'adoption price updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function adoptionTagsUpdated({ tags, uid }: UpdateTagsAdoption) {
  return {
    $set: {
      'data.tags': tags.map((data) => ({
        
        text: data,
        slug: slug(data),
      })),
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'adoption tags updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function adoptionLikesUpdated({ uid }: UpdateLikesAdoption) {
  return {
    $set: {
      // 'data.likes': tags.map((data) => ({
      //   uid: uuidv3(),
      //   text: data,
      //   slug: slug(data),
      // })),
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $addToSet: {
      'data.likes': uid,
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'adoption likes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function adoptionDisLikesUpdated({ uid }: UpdateLikesAdoption) {
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
        change: 'adoption dislikes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function adoptionUpdateImage({
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
      // 'data.seoAdoption.image.src': images[0].src,
      // 'data.seoAdoption.image.alt': images[0].alt,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'image adoption update',
        updatedAt: new Date(),
      },
    },
  };
}
export function adoptionUpdateImageSeo({
  id,
  src,
  uid,
}: UpdateImageSeo) {
  // const { src, alt } = images as InputImage;
  return {
    $set: {
      'data.thumbnailUrl': src,
      // 'data.seoAdoption.image.src': images[0].src,
      // 'data.seoAdoption.image.alt': images[0].alt,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'image for seo update',
        updatedAt: new Date(),
      },
    },
  };
}

export function typeAdoption(type: string) {
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
