import categories from "./categories";

export const getCategoryRoute = (category_id) => {
  let category = categories.filter(
    (category) => category.id === Number(category_id)
  )[0];
  console.log(typeof category_id)
  console.log(category_id)
  console.log(categories)
  console.log(category)
  let categoryLink = category.link;

  return categoryLink;
};

export const generateProductDetailsRouteWithSlugUrl = (category_id, slug) => {
  return `${getCategoryRoute(category_id)}/${slug}`;
};
export const generateProductDetailsRouteWithIDUrl = (category_id, id) => {
  return `/product/details/id`;
};
