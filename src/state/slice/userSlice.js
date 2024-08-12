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
        },

        urlParameterz: -1,
        setUrlParameterz(urlParameterz)
        {
            set((state) => ({urlParameterz: urlParameterz}))
        },
        getUrlParameterz()
        {
            return get().urlParameterz
        },

        assessment: -1,
        setAssessment(assessment)
        {
            set((state) => ({assessment: assessment}))
        },
        getAssessment()
        {
            return get().assessment
        }
    }
)

export default createUsertSlice;