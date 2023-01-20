import { Types } from 'mongoose';
import { capitalizar, slug, uuidv3 } from 'utils/function';
import { CreateArticle, UpdateArticle } from '../dto/article.input';
import { CreateComment, UpdateComment, UpdateLikesComment } from '../dto/comment.input';
import { CreateProduct, UpdateProduct } from '../dto/product.input';
import { InputImage, UpdateImage, UpdateImageProduct } from '../dto/site.input';

export function commentCreated({
  author,
  content,
  siteId,
  parentId,
  uid,
}: CreateComment) {
  return {
    _id: new Types.ObjectId(),
    parentId: parentId,
    data: {
      author: author,
      content: content,
      siteId: siteId,
      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        register: [
          {
            uid: uid,
            change: 'comment created',
            updatedAt: new Date(),
          },
        ],
      },
    },
  };
}

export function commentUpdated({
  content,
  uid,
}: UpdateComment) {
  return {
    $set: {
      'data.content': content,
      'data.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'data.updateDate.register': {
        uid: uid,
        change: 'comment update',
        updatedAt: new Date(),
      },
    },
  };
}


export function commentLikesUpdated({ uid }: UpdateLikesComment) {
  return {
    $set: {
      // 'dataProduct.likes': tags.map((data) => ({
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
        change: 'comment likes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function commentDisLikesUpdated({ uid }: UpdateLikesComment) {
  return {
    $set: {
      // 'dataProduct.likes': tags.map((data) => ({
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
        change: 'comment dislikes updated',
        updatedAt: new Date(),
      },
    },
  };
}

// export function articleImageUpdated({ id, images, type, uid }: UpdateImage) {
//   const { src, alt } = images as InputImage;
//   return {
//     $set: {
//       'dataArticle.thumbnail': {
//         uid: uuidv3(),
//         src: src,
//         alt: alt,
//       },
//       'dataArticle.seoArticle.image.src': src,
//       'dataArticle.seoArticle.image.alt': alt,
//       'dataArticle.updateDate.lastUpdatedAt': new Date(),
//     },
//     $push: {
//       'dataArticle.updateDate.register': {
//         uid: uid,
//         change: 'article image updated',
//         updatedAt: new Date(),
//       },
//     },
//   };
// }

// export function typeProduct(type: string) {
//   let data: string;
//   switch (type) {
//     case 'adoption':
//       data = 'Adoption';
//       break;

//     default:
//       console.log(`Sorry, we are out of ${type}.`);
//       break;
//   }
//   return data;
// }
