const createCategorySlice  = (set, get) => (
    {
        isLoading: false,
        setLoading(loading)
        {
            set((state) => ({isLoading: loading}))
        },
        getLoading()
        {
            return get().isLoading
        },

        error: null,
        setError(err)
        {
            set((state) => ({error: err}))
        },
        getError()
        {
            return get().error
        },

        category: [],
        setCategory(category)
        {
            set((state) => (
                {
                    category: category
                }
            ))
        },
        getCategory()
        {
            return get().category
        },
    }
)

export default createCategorySlice;