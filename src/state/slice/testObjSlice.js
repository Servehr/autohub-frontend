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

            // set((state) => ({
            //     selectedOption: { ...state.selectedOption, selectedOption: [...state.selectedOption, x] }
            //   }))
        },
        getSelectedOption()
        {
            return get().selectedOption
        },

        setEmptyTestObjective(selectedOption)
        {
            set((state) => ({selectedOption: selectedOption}))
        },
        getEmptyTestObjective()
        {
            return get().selectedOption
        },

        course: -1,
        setCourse(course)
        {
            set((state) => ({course: course}))
        },
        getCourse()
        {
            return get().course
        },

        force: 'no',
        setForce(force)
        {
            set((state) => ({force: force}))
        },
        getForce()
        {
            return get().force
        },

        defaultTestObjectiveAnswer: [],
        setDefaultTestObjectiveAnswer(defaultTestObjectiveAnswer)
        {
            set((state) => ({defaultTestObjectiveAnswer: defaultTestObjectiveAnswer}))
        },
        getDefaultTestObjectiveAnswer()
        {
            return get().defaultTestObjectiveAnswer
        },

        testObjectiveIdentifier: '',
        setTestObjectiveIdentifier(testObjectiveIdentifier)
        {
            set((state) => ({testObjectiveIdentifier: testObjectiveIdentifier}))
        },
        getTestObjectiveIdentifier()
        {
            return get().testObjectiveIdentifier
        }

    }
)

export default createTestObjectiveSlice;