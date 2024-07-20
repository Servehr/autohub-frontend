import { create } from "zustand";

export const browserType = create((set) => ({
  isMobile: false,
  setIsMobile: (value) => set(() => ({ isMobile: value })),
}));

export const modalStore = create((set) => ({
  menu: false,
  enabled: false,
  toggleMenu: () => set((state) => ({ menu: !state.menu })),
}));

export const searchStore = create((set) => ({
  query: "",
  setQuery: (query) => set(() => ({ query })),
}));


// export const useFilterStore = create((set) => ({
//   enabled: false,
//   setEnabled: () => set(() => ({ enabled: true })),
//   filters: {
//     price: null,
//     category_id: null,
//     make_id: null,
//     year_of_production: null,
//     state_id: null,
//     featured: null,
//     description: null,
//     vendor_id: null,
//   },
//   updateFilters: (newFilters) => {
//     const sanitizedFilters = {};

//     // List of valid filter keys
//     const validFilterKeys = [
//       "price",
//       "category_id",
//       "make_id",
//       "year_of_production",
//       "state_id",
//       "featured",
//       "description",
//       "vendor_id",
//     ];

//     // Iterate through the newFilters and validate each filter
//     for (const key of validFilterKeys) {
//       if (key in newFilters) {
//         sanitizedFilters[key] = newFilters[key];
//       }
//     }

//     // Update the Zustand store with sanitized filters
//     set((state) => ({ filters: { ...state.filters, ...sanitizedFilters } }));
//   },
// }));
