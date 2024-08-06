import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import createAdvertSlice from './slice/advertSlice';
import createCategorySlice from './slice/categorySlice';
import createUsertSlice from './slice/userSlice';
import createNavSlice from './slice/navSlice';
import createTestObjectiveSlice from './slice/testObjSlice';

export const appStore = create(
    persist((...a) => (
        {
            ...createAdvertSlice(...a),
            ...createCategorySlice(...a),
            ...createUsertSlice(...a),
            ...createNavSlice(...a),
            ...createTestObjectiveSlice(...a),
        }
      ),
      { name: 'autoHub', storage: createJSONStorage(() => sessionStorage) },
      
    ),
  )