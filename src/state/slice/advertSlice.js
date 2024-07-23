const createAdvertSlice  = (set, get) => (
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

        refresh: 0,
        setRefresh(refresh)
        {
            set((state) => ({refresh: refresh}))
        },
        getRefresh()
        {
            return get().refresh
        },

        advert: {
            title: "Benz GLE 450", 
            states: "",  
            category: "",  
            maker: "",  
            model: "",  
            colour: "",  
            year_of_production: "",  
            transmission: "",  
            condition: "",  
            chasis_number: "",  
            trim: "",  
            description: "",  
            price: "",  
            plan_id: "",  
            avatar: []
        },
        setAdvert(advert)
        {
            set((state) => ({advert: advert}))
        },
        getAdvert()
        {
            return get().advert
        },

        productId: "",
        setProductId(id)
        {
            set((state) => ({productId: id}))
        },
        getProductId()
        {
            return get().productId
        },

        onEdit: "no",
        setOnEdit(onEdit)
        {
            set((state) => ({onEdit: onEdit}))
        },
        getOnEdit()
        {
            return get().onEdit
        },

        advertTitle: "",
        setAdvertTitle(title)
        {
            set((state) => ({advertTitle: title}))
        },
        getAdvertTitle()
        {
            return get().advertTitle
        },
        
        country: -1,
        setCountry(country)
        {
            console.log(country)
            set((state) => ({country: country}))
        },
        getCountry()
        {
            return get().country
        },
        
        states: -1,
        setStates(states)
        {
            console.log(states)
            set((state) => ({states: states}))
        },
        getStates()
        {
            return get().states
        },

        categ: -1,
        setCateg(categ)
        {
            set((state) => ({categ: categ}))
        },
        getCateg()
        {
            return get().categ
        },        

        maker: -1,
        setMaker(maker)
        {
            set((state) => ({maker: maker}))
        },
        getMaker()
        {
            return get().maker
        },        

        model: -1,
        setModel(model)
        {
            set((state) => ({model: model}))
        },
        getModel()
        {
            return get().model
        },
        
        colour: -1,
        setColour(colour)
        {
            set((state) => ({colour: colour}))
        },
        getColour()
        {
            return get().colour
        },        
        
        year_of_production: -1,
        setYearOfPoduction(year_of_production)
        {
            set((state) => ({year_of_production: year_of_production}))
        },
        getYearOfPoduction()
        {
            return get().year_of_production
        },
                               
        transmission: -1,
        setTransmission(transmission)
        {
            set((state) => ({transmission: transmission}))
        },
        getTransmission()
        {
            return get().transmission
        },
                               
        condition: -1,
        setCondition(condition)
        {
            set((state) => ({condition: condition}))
        },
        getCondition()
        {
            return get().condition
        },
                               
        fuelType: -1,
        setFuelType(fuelType)
        {
            set((state) => ({fuelType: fuelType}))
        },
        getFuelType()
        {
            return get().fuelType
        },
                               
        mileAge: "",
        setMileAge(mileAge)
        {
            set((state) => ({mileAge: mileAge}))
        },
        getMileAge()
        {
            return get().mileAge
        },
                
        chasis_number: "",
        setChasisNumber(chasis_number)
        {
            set((state) => ({chasis_number: chasis_number}))
        },
        getChasisNumber()
        {
            return get().chasis_number
        },
                
        trim: -1,
        setTrim(trim)
        {
            set((state) => ({trim: trim}))
        },
        getTrim()
        {
            return get().trim
        },
                
        description: "",
        setDescription(description)
        {
            set((state) => ({description: description}))
        },
        getDescription()
        {
            return get().description
        },

        price: "",
        setPrice(price)
        {
            set((state) => ({price: price}))
        },
        getPrice()
        {
            return get().price
        },

        plan_id: "",
        setPlan_id(plan_id)
        {
            set((state) => ({plan_id: plan_id}))
        },
        getPlan_id()
        {
            return get().plan_id
        },  

        others: "",
        setOthers(others)
        {
            set((state) => ({others: others}))
        },
        getOthers()
        {
            return get().others
        },   

        theManufacturerName: "",
        setTheManufacturerName(theManufacturerName)
        {
            console.log(theManufacturerName)
            set((state) => ({theManufacturerName: theManufacturerName}))
        },
        getTheManufacturerName()
        {
            return get().theManufacturerName
        },   

        theModelName: "",
        setTheModelName(theModelName)
        {
            console.log(theModelName)
            set((state) => ({theModelName: theModelName}))
        },
        getTheModelName()
        {
            return get().theModelName
        },  

        makerModels: [],
        setTheMakerModels(makerModels)
        {
            console.log(makerModels)
            set((state) => ({makerModels: makerModels}))
        },
        getTheMakerModels()
        {
            return get().makerModels
        },  

        modelTrim: [],
        setTheModelTrim(modelTrim)
        {
            console.log(modelTrim)
            set((state) => ({modelTrim: modelTrim}))
        },
        getTheModelTrim()
        {
            return get().modelTrim
        }, 

        statesModels: [],
        setStateModel(statesModels)
        {
            console.log(statesModels)
            set((state) => ({statesModels: statesModels}))
        },
        getStateModel()
        {
            return get().statesModels
        },  

        imageOnEdit: "",
        setImageOnEdit(images)
        {
            console.log(images)
            set((state) => ({images: images}))
        },
        getImageOnEdit()
        {
            return get().imageOnEdit
        },      

        productImages: [],
        setProductImages(productImages)
        {
            set((state) => (
                {
                    productImages: productImages
                }
            ))
        },
        getProductImages()
        {
            return get().productImages
        },       

        productComments: [],
        setProductComments(productComments)
        {
            set((state) => (
                {
                    productComments: productComments
                }
            ))
        },
        getProductComments()
        {
            return get().productComments
        },     

        processAdvertAsDraft: '',
        setProcessAdvertAsDraft(processAdvertAsDraft)
        {
            set((state) => (
                {
                    processAdvertAsDraft: processAdvertAsDraft
                }
            ))
        },
        getProcessAdvertAsDraft()
        {
            return get().processAdvertAsDraft
        },     

        processAdvert: '',
        setProcessAdvert(processAdvert)
        {
            set((state) => (
                {
                    processAdvert: processAdvert
                }
            ))
        },
        getProcessAdvert()
        {
            return get().processAdvert
        },     

        // getProductImages()
        // {
        //     return get().productImages
        // },       

        productTitle: "",
        setProductTitle(productTitle)
        {
            set((state) => (
                {
                    productTitle: productTitle
                }
            ))
        },
        getProductTitle()
        {
            return get().productTitle
        }, 

        avatar: [],
        setAvatar(avatar)
        {
            console.log(avatar)
            set((state) => (
                {
                    ...state,
                    avatar: [...state.avatar, avatar]
                }
            ))
            console.log(avatar)
            // set((state) => (
            //     {
            //         avatar: avatar
            //     }
            // ))
        },
        getAvatar()
        {
            console.log(this.advert)
            return get().avatar
        },    
        removeImage(id)
        {
            const removedImage = this.avatar.map((image, index) => {
                return image = image !== id
            })
            set((state) => (
                {
                    avatar: removedImage
                }
            ))
        }  
    }
)

export default createAdvertSlice;