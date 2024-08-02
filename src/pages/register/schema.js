import * as Yup from "yup";
import parse from "date-fns/parse";
import { isDate } from "date-fns";

// Schema for UserType 1 (Assuming UserType 1 has additional fields)
const schemaForAffiliate = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneno: Yup.string()
    .matches(/^\d{11}$/, "Phone number must be 11 digits")
    .required("Phone number is required"),
  company_name: Yup.string().required("Company Name is required"),
  company_address: Yup.string().required("Company Address is required"),
  company_cac: Yup.string().required("Company CAC is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

// Schema for UserType 2 (Assuming UserType 2 does not have company fields)
const schemaForBuyer = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneno: Yup.string()
    .matches(/^\d{11}$/, "Phone number must be 11 digits")
    .required("Phone number is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const MACEOSRegistration = Yup.object().shape(
    {
        firstname:        Yup.string().min(3).required("Firstname is required"),
        surname:          Yup.string().min(3).required("Surname is required"),
        middlename:       Yup.string().min(3).required("Middle is required"),
        // email:            Yup.string().email("Invalid email address").required("Email is required"),
        phoneno:      Yup.string().required("Phone number is required"),
        companyName:      Yup.string().required("Company Name is required"),
        companyAddress:   Yup.string().required("Company Address is required"),
        specialization:   Yup.string().required("Specialization is required"),
        yearsIn:          Yup.number().transform((value) => Number.isNaN(value) ? null : value ).required('Your years in auto-mobile is Required'),
        region:           Yup.string().required("Region is required"),
        city:             Yup.string().required("City is required"),
        birth:            Yup.date().nullable().transform((curr, orig) => orig === '' ? null : curr).required('Enter date of birth'),
        gender:           Yup.string().required("Gender is required"),
        academic:         Yup.string().required("Academic is required"),
        // password:         Yup.string().required("Password is required"),
        // confirm_password:  Yup.string()
        //                   .oneOf([Yup.ref("password"), null], "Passwords must match")
        //                   .required("Confirm Password is required"),
        agree:            Yup.bool().oneOf([true], "You must accept the terms and conditions")
    }
);

export { schemaForBuyer, schemaForAffiliate, MACEOSRegistration };
