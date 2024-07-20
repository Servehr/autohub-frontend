const createUsertSlice  = (set, get) => (
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

        user: '',
        setLoggedInUser(user)
        {
            set((state) => ({user: user}))
        },
        getLoggedInUser()
        {
            return get().user
        },

        userType: '',
        setLoggedInUserType(user)
        {
            set((state) => ({user: user}))
        },
        getLoggedInUserType()
        {
            return get().user
        },

        userServices: -1,
        setUserServices(userServices)
        {
            set((state) => ({userServices: userServices}))
        },
        getUserServices()
        {
            return get().userServices
        }
    }
)

export default createUsertSlice;