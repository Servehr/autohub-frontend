// export default function currencyFormatter(price) {
//   if(price){

//     let NGN = new Intl.NumberFormat("en-NG", {
//       style: "currency",
//       currency: "NGN",
//     });
//     return NGN.format(price);
//   }
//   return ""
// }

export default function currencyFormatter(price) {
  try {
    let NGN = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    });
    return NGN.format(price);
  } catch (error) {
    // console.error("Error formatting currency:", error);
    return ""; // Return blank string in case of an error
  }
}