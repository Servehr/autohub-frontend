const createNavSlice  = (set, get) => (
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

        sideBar: false,
        setSideBar(sideBar)
        {
            set((state) => ({sideBar: sideBar}))
        },
        getSideBar()
        {
            return get().sideBar
        },
    }
)

export default createNavSlice;