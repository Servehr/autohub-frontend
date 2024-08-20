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