import axios_instance from "@/lib/axios";

export async function Countries() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get("countries")
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

export async function CountryStates(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`country-states/${id}`)
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

export async function AddCountri(country) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post(`add-country`, country)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function UpdateCountri(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put(`update-country`,  { id: data.id, name: data.name })
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function DeleteCountri(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`delete-country/${id}`)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function AddSteate(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .post(`add-state`, { country_id: data.country_id,  ijinle_id: data.ijinle_id,  name: data.name })
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function UpdateSteate(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put(`update-state`, { id: data.stateId,  name: data.stateName })
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function UpdateSteateLevel(data) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .put(`update-state-level`, { id: data.id,  rate: data.rate })
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function DeleteSteate(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .delete(`delete-state/${id}`)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function Manufacturers() 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`all-manufacturer`)
          .then((res) => {
            if (res.data.success === false) {
              reject(res.data.message);
            } else {
              resolve(res.data.data);
            }
          })
          .catch((err) => {
            let message = "Something went wrong!";
            reject(new Error(err));
          });
    });
}

export async function ManufacturerModels(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`all-models/${id}`)
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

export async function Trims(id) 
{
    return new Promise((resolve, reject) => 
    {
        axios_instance
          .get(`all-trim/${id}`)
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