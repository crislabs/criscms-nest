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
  title,
  description,
  siteId,
  parentId,
  uid,
  type,
}: CreateAdoption) {
  return {
    _id: new Types.ObjectId(),
    parentId: parentId,
    slug: slug(title),
    dataAdoption: {
      title: title,
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

export function adoptionUpdated({ id, title, description, uid }: UpdateAdoption) {
  return {
    $set: {
      'dataAdoption.title': title,
      'dataAdoption.description': description,
      'dataAdoption.updateDate.lastUpdatedAt': new Date(),
      slug: slug(title),
    },
    $push: {
      'dataAdoption.updateDate.register': {
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
      'dataAdoption.details': text,
      'dataAdoption.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataAdoption.updateDate.register': {
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
      'dataAdoption.specs': text,
      'dataAdoption.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataAdoption.updateDate.register': {
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
      'dataAdoption.price': price,
      'dataAdoption.discountPrice': discountPrice,
      'dataAdoption.inStock': inStock,
      'dataAdoption.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataAdoption.updateDate.register': {
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
      'dataAdoption.tags': tags.map((data) => ({
        
        text: data,
        slug: slug(data),
      })),
      'dataAdoption.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataAdoption.updateDate.register': {
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
      // 'dataAdoption.likes': tags.map((data) => ({
      //   uid: uuidv3(),
      //   text: data,
      //   slug: slug(data),
      // })),
      'dataAdoption.updateDate.lastUpdatedAt': new Date(),
    },
    $addToSet: {
      'dataAdoption.likes': uid,
    },
    $push: {
      'dataAdoption.updateDate.register': {
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
      // 'dataAdoption.likes': tags.map((data) => ({
      //   uid: uuidv3(),
      //   text: data,
      //   slug: slug(data),
      // })),
      'dataAdoption.updateDate.lastUpdatedAt': new Date(),
    },
    $pull: {
      'dataAdoption.likes': uid,
    },
    $push: {
      'dataAdoption.updateDate.register': {
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
      'dataAdoption.images': images.map((data) => ({
        src: data.src,
        alt: data.alt,
      })),
      // 'dataAdoption.seoAdoption.image.src': images[0].src,
      // 'dataAdoption.seoAdoption.image.alt': images[0].alt,
      'dataAdoption.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataAdoption.updateDate.register': {
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
      'dataAdoption.thumbnailUrl': src,
      // 'dataAdoption.seoAdoption.image.src': images[0].src,
      // 'dataAdoption.seoAdoption.image.alt': images[0].alt,
      'dataAdoption.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataAdoption.updateDate.register': {
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
