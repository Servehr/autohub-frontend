import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import createAdvertSlice from './slice/advertSlice';
import createCategorySlice from './slice/categorySlice';
import createUsertSlice from './slice/userSlice';
import createNavSlice from './slice/navSlice';

export const appStore = create(
    persist((...a) => (
        {
            ...createAdvertSlice(...a),
            ...createCategorySlice(...a),
            ...createUsertSlice(...a),
            ...createNavSlice(...a),
        }
      ),
      { name: 'autoHub', storage: createJSONStorage(() => sessionStorage) },
      
    ),
  )