const createExamTheorySlice  = (set, get) => (
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

        selectedExamTheoryOption: [],
        setSelectedExamTheoryOption(x)
        {
            set((state) => ({ selectedExamTheoryOption: [...state.selectedExamTheoryOption, x] }))
        },
        getSelectedExamTheoryOption()
        {
            return get().selectedExamTheoryOption
        },

        selectedExamTheoryAnswerValue: '',
        setSelectedExamTheoryAnswerValue(selectedExamTheoryAnswerValue)
        {
            set((state) => ({selectedExamTheoryAnswerValue: selectedExamTheoryAnswerValue}))
        },
        getSelectedExamTheoryAnswerValue()
        {
            return get().selectedExamTheoryAnswerValue
        },

        setEmptyExamTheory(selectedExamTheoryOption)
        {
            set((state) => ({selectedExamTheoryOption: selectedExamTheoryOption}))
        },
        setEmptyExamTheory()
        {
            return get().selectedExamTheoryOption
        },
    }
)

export default createExamTheorySlice;