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
        getEmptyTestTheory()
        {
            return get().selectedTestTheoryOption
        },        

        forceTestTheory: 'no',
        setForceTestTheory(forceTestTheory)
        {
            set((state) => ({forceTestTheory: forceTestTheory}))
        },
        getForceTestTheory()
        {
            return get().forceTestTheory
        },

        defaultTestTheoryAnswer: [],
        setDefaultTestTheoryAnswer(defaultTestTheoryAnswer)
        {
            set((state) => ({defaultTestTheoryAnswer: defaultTestTheoryAnswer}))
        },
        getDefaultTestTheoryAnswer()
        {
            return get().defaultTestTheoryAnswer
        },

        testTheoryIdentifier: '',
        setTestTheoryIdentifier(testTheoryIdentifier)
        {
            set((state) => ({testTheoryIdentifier: testTheoryIdentifier}))
        },
        getTestTheoryIdentifier()
        {
            return get().testTheoryIdentifier
        }
    }
)

export default createTestTheorySlice;