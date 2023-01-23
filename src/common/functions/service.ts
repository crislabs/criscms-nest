import { Types } from 'mongoose';
import { capitalizar, slug, uuidv3 } from 'utils/function';
import {
  CreateService,
  UpdateDetailService,
  UpdateLikesService,
  UpdatePriceService,
  UpdateService,
  UpdateSpecsService,
  UpdateTagsService,
} from '../dto/service.input';
import { UpdateImageSeo, UpdateImageProduct } from '../dto/site.input';

export function serviceCreated({
  name,
  description,
  siteId,
  parentId,
  uid,
  type,
}: CreateService) {
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
        label: typeService(type),
        slug: slug(type),
      },

      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        register: [
          {
            uid: uid,
            change: 'service created',
            updatedAt: new Date(),
          },
        ],
      },
    },
  };
}

export function serviceUpdated({ id, name, description, uid }: UpdateService) {
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
        change: 'service updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function serviceDetailUpdated({ text, uid }: UpdateDetailService) {
  return {
    $set: {
      'data.details': text,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'service detail updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function serviceSpecsUpdated({ text, uid }: UpdateSpecsService) {
  return {
    $set: {
      'data.specs': text,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'service specs updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function servicePriceUpdated({ price, discountPrice, inStock, uid }: UpdatePriceService) {
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
        change: 'service price updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function serviceTagsUpdated({ tags, uid }: UpdateTagsService) {
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
        change: 'service tags updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function serviceLikesUpdated({ uid }: UpdateLikesService) {
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
        change: 'service likes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function serviceDisLikesUpdated({ uid }: UpdateLikesService) {
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
        change: 'service dislikes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function serviceUpdateImage({
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
      // 'data.seoService.image.src': images[0].src,
      // 'data.seoService.image.alt': images[0].alt,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'image service update',
        updatedAt: new Date(),
      },
    },
  };
}
export function serviceUpdateImageSeo({
  id,
  src,
  uid,
}: UpdateImageSeo) {
  // const { src, alt } = images as InputImage;
  return {
    $set: {
      'data.thumbnailUrl': src,
      // 'data.seoService.image.src': images[0].src,
      // 'data.seoService.image.alt': images[0].alt,
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

export function typeService(type: string) {
  let data: string;
  switch (type) {
    case 'service':
      data = 'Service';
      break;

    default:
      console.log(`Sorry, we are out of ${type}.`);
      break;
  }
  return data;
}
