const createExamObjectiveSlice  = (set, get) => (
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

        selectedExamOption: [],
        setSelectedExamObjectiveOption(x)
        {
            set((state) => ({ selectedExamOption: [...state.selectedExamOption, x] }))
        },
        getSelectedExamObjectiveOption()
        {
            return get().selectedExamOption
        },

        setEmptyExamObjective(selectedExamOption)
        {
            set((state) => ({selectedExamOption: selectedExamOption}))
        },
        setEmptyExamObjective()
        {
            return get().selectedExamOption
        },
    }
)

export default createExamObjectiveSlice;