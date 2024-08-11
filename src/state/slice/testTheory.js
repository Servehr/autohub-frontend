const createTestTheorySlice  = (set, get) => (
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

        selectedTestTheoryOption: [],
        setSelectedTestTheoryOption(x)
        {
            set((state) => ({ selectedTestTheoryOption: [...state.selectedTestTheoryOption, x] }))
        },
        getSelectedTestTheoryOption()
        {
            return get().selectedTestTheoryOption
        },

        selectedAnswerValue: '',
        setSelectedAnswerValue(selectedAnswerValue)
        {
            set((state) => ({selectedAnswerValue: selectedAnswerValue}))
        },
        getSelectedAnswerValue()
        {
            return get().selectedAnswerValue
        },

        setEmptyTestTheory(selectedTestTheoryOption)
        {
            set((state) => ({selectedTestTheoryOption: selectedTestTheoryOption}))
        },
        setEmptyTestTheory()
        {
            return get().selectedTestTheoryOption
        },
    }
)

export default createTestTheorySlice;