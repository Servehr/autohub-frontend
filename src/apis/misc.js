import axios_instance from "@/lib/axios";

// reject(res.data.message);

export async function fetchServices() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("/services")
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

export async function fetchQualifications() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("/qualifications")
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

export async function fetchMaker() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("/ad/list/maker")
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

export async function fetchAllRequiredData(id)
{
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`/ad/advert-api/${id}`)
        .then((res) => {
          if (res.data.success === 0) 
            {
              reject(res.data.message);
            } else {
              console.log(res.data.data)
              // pass data into local storage
                // localStorage.setItem("country", Number(res.data.data.country_id))
                // localStorage.setItem("state", Number(res.data.data.state_id))
                // localStorage.setItem("category", Number(res.data.data.category_id))
                // localStorage.setItem("maker", Number(res.data.data.make_id))
                // localStorage.setItem("model", Number(res.data.data.model_id))
                // localStorage.setItem("trim", Number(res.data.data.trim))
                // localStorage.setItem("fuelType", res.data.data.fuel_type)
                // localStorage.setItem("productionYear", res.data.data.year_of_production)
                // localStorage.setItem("colour", res.data.data.colour)
                // localStorage.setItem("transmission", Number(res.data.data.transmission_id))
                // localStorage.setItem("condition", res.data.data.condition_id)
                // localStorage.setItem("description", res.data.data.description)
                // localStorage.setItem("chasisNo", res.data.data.chasis_no)
                // localStorage.setItem("price", res.data.data.price)
                // localStorage.setItem("mileage", res.data.data.mileage)
              // data passed to storage
              resolve(res.data.data);
            }
        })
        .catch(() => {
          let message = "Something went wrong!";
          reject(new Error(message));
        });
    });
}

export async function fetchAllRequiredDataForEdit(id, stateId, modelId, trimId)
{
    const theId = Number(id)
    const theStateId = Number(stateId)
    const theModelId = Number(modelId)
    const theTrimId  = Number(trimId)

    console.log({ theId, theStateId, theModelId, theTrimId })

    return new Promise((resolve, reject) => {
      axios_instance
        .get(`/ad/advert-api/${theId}/${theStateId}/${theModelId}/${theTrimId}`)
        .then((res) => {
          if (res.data.success === 0) 
            {
              reject(res.data.message);
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

export async function fetchPlans() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("/plans")
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

export async function fetchTransmission() 
{
  console.log("What`s happening")
  return new Promise((resolve, reject) => {
    axios_instance
      .get("/ad/list/transmission")
      .then((res) => {
        if (res.data.success === 0) {
          console.log(res.data)
          resolve([]);
        } else {
          console.log(res.data.data)
          resolve(res.data.data);
        }
      })
      .catch((error) => {
        let message = "Something went wrong!";
        console.log(error)
        reject(new Error(message));
      });
  });
}

export async function fetchCondition() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("/ad/list/condition")
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

export async function fetchModel() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("/ad/list/model")
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

export async function fetchTrim() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("/ad/list/trim")
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

export async function fetchUserSelectedModel(id) 
{
    console.log(id)
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`ad/list/selected-model/${5}`)
        .then((res) => {
          if (res.data.success === 0) {
            reject(res.data.message);
          } else {
            console.log(res.data)
            resolve(res.data.data);
          }
        })
        .catch(() => {
          let message = "Something went wrong!";
          reject(new Error(message));
        });
    });
}

export async function fetchCategory() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("/ad/list/category")
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

export async function fetchCategoryWithProductCount() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("ad/list-with-catogries-count")
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
        } else {
          console.log(res.data.data)
          resolve(res.data.data);
        }
      })
      .catch((error) => {
        // console.log(error)
        let message = "Something went wrong!";
        reject(new Error(message));
      });
  });
}

export async function fetchColour() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("/ad/list/colour")
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

export async function fetchState() {
  return new Promise((resolve, reject) => {
    axios_instance
      .get("/ad/list/state")
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
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

export async function fetchAllFaqs() 
{
    return new Promise((resolve, reject) => {
      axios_instance
        .get("/faq")
        .then((res) => {
          if (res.data.success === 0) {
            reject(res.data.message);
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

export async function singelProduct(id) 
{
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`ad/single-product/${id}`)
        .then((res) => {
          if (res.data.success === 0) {
            reject(res.data.message);
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

export async function ActivateProduct(id)
{
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`ad/activate-product/${id}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
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

export async function DeActivateProduct(id)
{
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`ad/de-activate-product/${id}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
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

export async function CreateFaq(data)
{
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`faq`, data)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
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

export async function UpdateFaq(data)
{
  return new Promise((resolve, reject) => {
    axios_instance
      .put(`faq`, data)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
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

export async function DeleteFaq(id)
{
  return new Promise((resolve, reject) => {
    axios_instance
      .delete(`faq/${id}`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
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

export async function ChatList()
{
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`chat-list`)
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
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

export async function Conversations(id, pId)
{
  const userId = localStorage.getItem("authenticatedId")
  if(!userId)
  {
      return []   
  } else {
      // console.log("whats the id")
      // console.log({id, pId})
      // return
      console.log("whats the id")
      return new Promise((resolve, reject) => {
        axios_instance
          .get(`chat/conversations/${id}/${pId}`)
          .then((res) => {
            if (res.data.success === 0) {
              reject(res.data.message);
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
}

export async function sendConversationMessage(message, receiver, productId)
{
  // const message = { message: msg, receiver: receiver }
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`send-message`, { message, receiver, productId })
      .then((res) => {
        if (res.data.success === 0) {
          reject(res.data.message);
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

