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
        getEmptyExamObjective()
        {
            return get().selectedExamOption
        },

        forceExamObj: 'no',
        setForceExamObj(forceExamObj)
        {
            set((state) => ({forceExamObj: forceExamObj}))
        },
        getForceExamObj()
        {
            return get().forceExamObj
        },

        defaultExamObjectiveAnswer: [],
        setDefaultExamObjectiveAnswer(defaultExamObjectiveAnswer)
        {
            set((state) => ({defaultExamObjectiveAnswer: defaultExamObjectiveAnswer}))
        },
        getDefaultExamObjectiveAnswer()
        {
            return get().defaultExamObjectiveAnswer
        },        

        examObjectiveIdentifier: '',
        setExamObjectiveIdentifier(examObjectiveIdentifier)
        {
            set((state) => ({examObjectiveIdentifier: examObjectiveIdentifier}))
        },
        getExamObjectiveIdentifier()
        {
            return get().examObjectiveIdentifier
        }
    }
)

export default createExamObjectiveSlice;