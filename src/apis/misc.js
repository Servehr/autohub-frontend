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

    return new Promise((resolve, reject) => {
      axios_instance
        .get(`/ad/advert-api/${theId}/${theStateId}/${theModelId}/${theTrimId}`)
        .then((res) => {
          if (res.data.success === 0) 
            {
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
    return new Promise((resolve, reject) => {
      axios_instance
        .get("/ad/list/transmission")
        .then((res) => {
          if (res.data.success === 0) {
            resolve([]);
          } else {
            resolve(res.data.data);
          }
        })
        .catch((error) => {
          let message = "Something went wrong!";
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
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`ad/list/selected-model/${5}`)
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
          resolve(res.data.data);
        }
      })
      .catch((error) => {
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
      .put(`ad/activate-product`,  {id: id})
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

export async function DeActivateProduct(id)
{
  return new Promise((resolve, reject) => {
    axios_instance
      .put(`ad/de-activate-product`, {id: id})
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

export async function SoldTheProduct(id)
{
  return new Promise((resolve, reject) => {
    axios_instance
      .put(`ad/sold-product`,  {id: id})
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

export async function CreateFaq(data)
{
  return new Promise((resolve, reject) => {
    axios_instance
      .post(`faq`, data)
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

export async function UpdateFaq(data)
{
  return new Promise((resolve, reject) => {
    axios_instance
      .put(`faq`, data)
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

export async function DeleteFaq(id)
{
  return new Promise((resolve, reject) => {
    axios_instance
      .delete(`faq/${id}`)
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

export async function ChatList()
{
  return new Promise((resolve, reject) => {
    axios_instance
      .get(`chat-list`)
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

export async function Conversations(id, pId)
{
  const userId = localStorage.getItem("authenticatedId")
  if(!userId)
  {
      return []   
  } else {
      return new Promise((resolve, reject) => {
        axios_instance
          .get(`chat/conversations/${id}/${pId}`)
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
          resolve(res.data.data);
        }
      })
      .catch(() => {
        let message = "Something went wrong!";
        reject(new Error(message));
      });
  });
}

