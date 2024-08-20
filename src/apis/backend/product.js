import axios_instance from "@/lib/axios";

// manufacturers
export async function AddMaker(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("add-manufacturer", { code: data.code, title: data.title  })
          .then((res) => {
            if (res.data.success === false) {
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

export async function UpdateMaker(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post("update-manufacturer", { id: data.id, code: data.code, title: data.title  })
          .then((res) => {
            if (res.data.success === false) {
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

export async function UpdateManufacturerLevel(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("update-manufacturer-level", { id: data.id, rate: Number(data.rate) })
          .then((res) => {
            if (res.data.success === false) {
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

export async function RemoveManufacturerLevel(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`remove-manufacturer-level/${id}`)
          .then((res) => {
            if (res.data.success === false) {
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


// brands
export async function AddManufacturerModel(data) 
{
    return new Promise((resolve, reject) =>
    {
        axios_instance
          .post("add-manufacturer-model", { make_id: data.make_id, code: data.code, title: data.title  })
          .then((res) => {
            if (res.data.success === false) {
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

export async function UpdateManufacturerModel(data) 
{
    return new Promise((resolve, reject) =>
    {
        axios_instance
          .put("update-manufacturer-model", { id: data?.id, make_id: data.make_id, code: data.code, title: data.title  })
          .then((res) => {
            if (res.data.success === false) {
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

export async function UpdateModelLevel(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put("update-model-level", { id: data.id, rate: Number(data.rate) })
          .then((res) => {
            if (res.data.success === false) {
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

export async function RemoveModel(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`remove-manufacturer-model/${id}`)
          .then((res) => {
            if (res.data.success === false) {
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


// trims
export async function AddModelTrim(data) 
{
    return new Promise((resolve, reject) =>
    {
        axios_instance
          .post("add-trim", { make_id: data.make_id, model_id: data.model_id, name: data.name  })
          .then((res) => {
            if (res.data.success === false) {
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

export async function UpdateModelTrim(data) 
{
    return new Promise((resolve, reject) =>
    {
        axios_instance
          .put("update-trim", { id: data.id, name: data.name })
          .then((res) => {
            if (res.data.success === false) {
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

export async function UpdateTrimLevel(data) 
{
    return new Promise((resolve, reject) =>
    {
        axios_instance
          .put("update-trim-level", { id: data?.id, rate: data.rate })
          .then((res) => {
            if (res.data.success === false) {
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

export async function RemoveTrim(id) 
{
    return new Promise((resolve, reject) =>
    {
        axios_instance
          .delete(`remove-trim/${id}`)
          .then((res) => {
            if (res.data.success === false) {
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

