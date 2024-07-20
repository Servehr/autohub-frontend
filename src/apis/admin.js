// admin/list/{status} (status can be active, inactive or blocked. so you can use this for the 3 pages/list)
// admin/sponsored (this will fetch all sponsored ads on the system)
// admin/list/state (this will fetch all states)
// admin/list/state_lga (this will fetch all lga)
// admin/list/maker (this will fetch all car makers)
// admin/list/condition (this will fetch all conditions)
// admin/list/transmission (this will fetch all car transmissions)
// admin/list/model (this will fetch all marker models)
// admin/list/trim (this will fetch all trims)
// admin/list/category (this will fetch all categories)
// admin/list/colour (this will fetch all colors)
// admin/{id}/details (this can be used to view product details by id)
// admin/view-details/{slug} (this can be used to view product details by slug)

import axios_instance from "@/lib/axios";

// N.B (status can be active, inactive or blocked. so you can use this for the 3 pages/list)
export async function adminGetList(status) {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`admin/list/${status}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          resolve(res.data.data);
        }
      })
      .catch(() => {
        let message = "Something went wrong!";
        reject(new Error(message));
      });
  });
}
export async function adminGetSponsored() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`admin/sponsored`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          resolve(res.data.data);
        }
      })
      .catch(() => {
        let message = "Something went wrong!";
        reject(new Error(message));
      });
  });
}
export async function adminGetProductDetails(id) {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`admin/${id}/details`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          resolve(res.data.data);
        }
      })
      .catch(() => {
        let message = "Something went wrong!";
        reject(new Error(message));
      });
  });
}
