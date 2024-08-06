const createTestObjectiveSlice  = (set, get) => (
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

        selectedOption: [],
        setSelectedOption(x)
        {
            set((state) => ({ selectedOption: [...state.selectedOption, x] }))
            // console.log(x)
            // console.log(this.selectedOption)

            // set((state) => ({
            //     selectedOption: { ...state.selectedOption, selectedOption: [...state.selectedOption, x] }
            //   }))
        },
        getSelectedOption()
        {
            // console.log(this.selectedOption)
            return get().selectedOption
        },
    }
)

export default createTestObjectiveSlice;