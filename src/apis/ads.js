import axios from 'axios';
import { BASE_URL, axios_instance, axios_instance_no, sendDataWithForm } from "@/lib/axios";

export async function fetchAll(page) {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`ad/list?page=${page && page}`)
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

export async function fetchSponsored()
{  
    return new Promise((resolve, reject) => {
      axios_instance
        .get("ad/sponsored")
        .then((res) => {
          if (res.data.success === 0) {
            resolve([]);
          } else {
            // console.log(res.data.data.category)
            // const catogory = res.data.data.category
            // const sponsored = res.data.data.sponsored
            // console.log(res.data.data.sponsored)
            
            // const x = []
            // x['sponsored'] = sponsored
            // x['category'] = catogory
            // console.log(res.data.data)
            resolve(res.data.data);
          }
        })
        .catch(() => {
          // console.log(err)
          let message = "Something went wrong!";
          reject(new Error(message));
        });
  });
}

export async function ImageSlider() 
{  
    return new Promise((resolve, reject) => {
      axios_instance
        .get("ad/image-slider")
        .then((res) => {
          if (res.data.success === 0) {
            resolve([]);
          } else {
                // localStorage.setItem("sliderSizee", res.data.data.slider.length)
                // console.log(res.data.data.slider.length)
                // console.log(res.data.data.slider)
                resolve(res.data.data);
          }
        })
        .catch(() => {
          // console.log(err)
          let message = "Something went wrong!";
          reject(new Error(message));
        });
  });
}

export async function fetchFeatured() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("ad/list/search?featured")
      .then((res) => {
        if (res.data.success === 0) {
          resolve([]);
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

export async function fetchProductWithSlug(slug) {
  return new Promise((resolve, reject) => {
    axios_instance_no
      .get(`ad/view-details/${slug}`)
      .then((res) => {
        if (res.data.success === 0) {
          resolve([]);
        } else {
          console.log(res.data.data)
          resolve(res.data.data);
        }
      })
      .catch(() => {
        let message = "Something went wrong!";
        reject(new Error(message));
      });
  });
}

export async function fetchByCategory(id, page) {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`ad/list-by-category/${id}?page=${page ? page : 1}`)
      .then((res) => {
        if (res.data.success === 0) {
          resolve([]);
        } else {
          // console.log(res.data.data)
          resolve(res.data.data);
        }
      })
      .catch((error) => {
        let message = "Something went wrong!";
        reject(new Error(error));
      });
  });
}

export async function allProductsUploaded(page) 
{
    return new Promise((resolve, reject) => {
      axios_instance_no
        .get(`ad/all-uploaded-product?page=${page ? page : 1}`)
        .then((res) => {
          if (res.data.success === 0) {
            resolve([]);
          } else {
            console.log(res.data)
            resolve(res.data.data);
          }
        })
        .catch((error) => {
          let message = "Something went wrong!";
          reject(new Error(error));
        });
    });
}

export async function fetchCars() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("ad/list/search?category_id=1")
      .then((res) => {
        if (res.data.success === 0) {
          resolve([]);
        } else {
          resolve(res.data.data.data);
        }
      })
      .catch(() => {
        let message = "Something went wrong!";
        reject(new Error(message));
      });
  });
}

export async function fetchBuses() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("ad/list/search?category_id=2")
      .then((res) => {
        if (res.data.success === 0) {
          resolve([]);
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

export async function fetchProductDetails(id) {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`/ad/${id}/details`)
      .then((res) => {
        if (res.data.data === null) {
          reject(new Error("Details not found"));
        } else {
          // console.log(res.data.data)
          resolve(res.data.data);
        }
      })
      .catch(() => {
        let message = "Something went wrong!";
        reject(new Error(message));
      });
  });
}

export async function fetchMoreFromVendor(id) {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`/ad/${id}/more-from-vendor`)
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

export async function fetchMoreFromModel(id) {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`/ad/${id}/more-from-model`)
      .then((res) => {
        if (res.data.success === 0) {
          resolve();
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

// prettier-ignore
export async function fetchSearch({
  price,
  category_id,
  make_id,
  year_of_production,
  state_id,
  featured,
  description,
  vendor_id,
}) {
  const queryParams = {
    price,
    category_id,
    make_id,
    year_of_production,
    state_id,
    featured,
    description,
    vendor_id,
  };

  // Filter out undefined or empty values
  const filteredQueryParams = Object.fromEntries(
    Object.entries(queryParams).filter(([key, value]) => value !== undefined && value !== "")
  );

  const queryString = new URLSearchParams(filteredQueryParams).toString();

  return new Promise((resolve, reject) => {
    axios_instance
      .get(`/ad/list/search?${queryString}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error("Something went wrong!"));
        } else {
          resolve(res.data.data.data);
        }
      })
      .catch(() => {
        let message = "Something went wrong!";
        reject(new Error(message));
      });
  });
}

// prettier-ignore
export async function createAd({ title, state, category, maker, model, colour, year_of_production, transmission, condition, chasis_number, trim, description, price, plan_id, avatar, others }) 
{
  // const requestData = { title, state, category, maker, model, colour, year_of_production, transmission, condition, chasis_number, trim, description, price, plan_id, avatar, others }

  //   console.log(requestData)
    // return
    // return new Promise((resolve, reject) => {
    //   sendDataWithForm
    //     .post("/ad/create", requestData)
    //     .then((res) => {
          // console.log(res)
          // if (res.data.success === 0) {
          //   reject(res.data.message);
          // } else {
            // console.log(res);
        //     resolve(res.data.message);
        //   }
        // })
        // .catch((err) => {
          // console.log(err);
    //       let message = err?.message;
    //       reject(message);
    //     });
    // });
}


// prettier-ignore
export async function saveAdvert(
    { state, category, maker, model, colour, year_of_production, manufacturerName, modelName, 
      transmission, condition, chasis_number, trim, description, price, plan_id, avatar, others, mainImage, draft
    }
) 
{
  const requestData = { state, category, maker, model, colour, year_of_production, manufacturerName, modelName, 
    transmission, condition, chasis_number, trim, description, price, plan_id, avatar, others, mainImage, draft
  }

    console.log(requestData)
    // return
    return new Promise((resolve, reject) => {
      axios_instance
        .post("/ad/create-ad", requestData)
        .then((res) => {
          // console.log(res)
          if (res.data.success === 0) {
            reject(res.data.message);
          } else {
            // console.log(res);
            resolve(res.data.draft);
          }
        })
        .catch((err) => {
          // console.log(err);
          let message = err?.message;
          reject(message);
        });
    });
}

export async function updateAds(advertDetail)
{
  console.log(advertDetail)
  // return
    return new Promise((resolve, reject) => {
      axios_instance
        .put("/ad/update", advertDetail)
        .then((res) => {
            console.log(res)
          if (res.data.success === 0) {
            reject(res.data.message);
          } else {
            console.log(res.data);
            resolve(res.data);
          }
        })
        .catch((err) => {
          // console.log(err);
          let message = err?.message;
          reject(message);
        });
    });
}

export async function addProductAds(advertDetail)
{
    return new Promise((resolve, reject) => {
      sendDataWithForm
        .put("/ad/add-product-ads", advertDetail)
        .then((res) => {
          // console.log(res)
          if (res.data.success === 0) {
            reject(res.data.success);
          } else {
            // console.log(res);
            resolve(res.data);
          }
        })
        .catch((err) => {
          // console.log(err);
          let message = err?.message;
          reject(message);
        });
    });
}

export async function deleteAdProduct(url) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .delete(`${url}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          // console.log(res)
          resolve(res.data);
        }
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}

export async function setProductAdvert(data) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`ad/face-advert`, data)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          console.log(res)
          resolve(res.data);
        }
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}



export async function setProductSliderAdvert(data) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`ad/product-advert`, data)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          console.log(res)
          resolve(res.data);
        }
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}



export async function SellablePrice(data) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`ad/product-sellable-price`, data)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          console.log(res)
          resolve(res.data);
        }
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}

export async function unpublishAd(url) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`${url}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          // console.log(res)
          resolve(res.data);
        }
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}

export async function fetchUserProduct(id) 
{
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`store/user-prouct/${id}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          // console.log(res)
          resolve(res.data.data);
        }
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}

export async function allProduct()
{
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`ad/all-product`)
        .then((res) => {
          if (res.data.success === 0) {
            reject(res.data.message);
          } else {
            resolve(res.data.data);
          }
        })
        .catch((err) => {
          let message = "Something went wrong";
          reject(new Error(message));
        });
    });  
}

export async function getAdverts(currentPage, PerPage, searchQuery)
{
    let theQuery = searchQuery.trim()
    if(theQuery.length === 0)
    {        
      // console.log("All Searched Product")
        return new Promise((resolve, reject) => {
          axios_instance
            .get(`ad/products/${currentPage}/${PerPage}`)
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
    } else {        
        // console.log("Searched Product")
        return new Promise((resolve, reject) => {
      
          axios_instance
            .get(`ad/product-search/${currentPage}/${PerPage}/${theQuery}`)
            .then((res) => {
              if (res.data.success === 0) {
                reject(res.data.message);
              } else {
                // console.log(res)
                resolve(res.data.data);
              }
            })
            .catch(() => {
              let message = "Something went wrong!";
              reject(new Error(message));
            });
        });
    }
}


export async function viewPosts(currentPage, PerPage, searchQuery)
{
    if(searchQuery === "" | searchQuery === undefined | searchQuery === null)
    {        
      // console.log("All Searched Product")
        return new Promise((resolve, reject) => {
          axios_instance
            .get(`view-blog/${currentPage}/${PerPage}`)
            .then((res) => {
              if (res.data.success === 0) {
                reject(res.data.message);
              } else {
                console.log(res.data.response)
                resolve(res.data.response);
              }
            })
            .catch(() => {
              let message = "Something went wrong!";
              reject(new Error(message));
            });
        });
    } else {        
        // console.log("Searched Product")
        return new Promise((resolve, reject) => {
      
          axios_instance
            .get(`ad/product-search/${currentPage}/${PerPage}/${searchQuery}`)
            .then((res) => {
              if (res.data.success === 0) {
                reject(res.data.message);
              } else {
                // console.log(res)
                resolve(res.data.data);
              }
            })
            .catch(() => {
              let message = "Something went wrong!";
              reject(new Error(message));
            });
        });
    }
}

export async function fetchData(theCurrentPage, thePerPage, from)
{
    return new Promise((resolve, reject) => {
      axios_instance_no
        .get(`fetch-data/${theCurrentPage}/${thePerPage}/${from}`)
        .then((res) => {
          if (res.data.success === 0) {

            reject(res.data.message);
          } else {
            console.log(res.data.response)
            resolve(res.data.response);
          }
        })
        .catch((err) => {
          let message = "Something went wrong";
          reject(new Error(message));
        });
    });   
}

export async function faqAndProduct()
{
    return new Promise((resolve, reject) => {
      axios_instance_no
        .get(`faq-product`)
        .then((res) => {
          if (res.data.success === 0) {
            reject(res.data.message);
          } else {
            console.log(res.data.response)
            resolve(res.data.response);
          }
        })
        .catch((err) => {
          let message = "Something went wrong";
          reject(new Error(message));
        });
    }); 
}

export async function blogDetail(post_id)
{
    console.log("kkkkkkkkkkkkkkkkkkkkk")
    console.log(post_id)
    console.log("kkkkkkkkkkkkkkkkkkkkk")
    return new Promise((resolve, reject) => {
      axios_instance_no
        .get(`blog-detail/${post_id}`)
        .then((res) => {
          if (res.data.success === 0) {
            reject(res.data.message);
          } else {
            console.log(res.data.response)
            resolve(res.data.response);
          }
        })
        .catch((err) => {
          let message = "Something went wrong";
          reject(new Error(message));
        });
    }); 
}

export async function addCommentOnBlog(payLoad)
{
    return new Promise((resolve, reject) => {
      axios_instance
        .post(`blog-detail-comment`,  payLoad )
        .then((res) => {
          if (res.data.success === 0) {
            reject(res.data.message);
          } else {
            console.log(res.data.response)
            resolve(res.data.response);
          }
        })
        .catch((err) => {
          let message = "Something went wrong";
          reject(new Error(message));
        });
    }); 
}    

export async function getPost(id)
{
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`view-blog/${id}`)
        .then((res) => {
          if (res.data.success === 0) {
            reject(res.data.message);
          } else {
            console.log(res.data.title)
            resolve(res.data);
          }
        })
        .catch((err) => {
          let message = "Something went wrong";
          reject(new Error(message));
        });
    });  
}

export async function addMessage(requestData) {
  // const requestData = { product_id, message };

  return new Promise((resolve, reject) => {
    axios_instance
      .post(`message`, requestData)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          resolve(res.data.message);
        }
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}

export async function followUser(vendor) {
  // const requestData = { product_id, message };
  // console.log(vendor)
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`follow`, vendor)
      .then((res) => {
        if (res.data.success === 0) {
          console.log(res)
          reject(0);
        } else {
          resolve(res.data.follower);
        }
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });
}

export async function getUserFollowers(vendor)
{
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`user-follower-count/${vendor}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(0);
        } else {
          console.log(res.data.follower)
          resolve(res.data.follower);
        }
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });  
}

export async function getCategories()
{
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`ad/list-with-catogries-count`)
      .then((res) => {
          console.log("Nice Nice Nice Nice Nice Nice Nice ")
          console.log(res)
          console.log("Nice Nice Nice Nice Nice Nice Nice ")
          resolve(res);
      })
      .catch((err) => {
        let message = "Something went wrong";
        reject(new Error(message));
      });
  });  
}

export async function fetchSuggestions(description) {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`/ad/list/search?description=${description}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error("Something went wrong!"));
        } else {
          resolve(res.data.data.data);
        }
      })
      .catch(() => {
        let message = "Something went wrong!";
        reject(new Error(message));
      });
  });
}


export async function UserProductAdverts(pId) {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`ad/user-product-ads/${pId}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error("Something went wrong!"));
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


export async function GetSearchedProduct(keyword) {
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`ad/search-product-advert/${keyword}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(new Error("Something went wrong!"));
        } else {
          console.log(res)
          resolve(res.data.data);
        }
      })
      .catch(() => {
        let message = "Something went wrong!";
        reject(new Error(message));
      });
  });
}
