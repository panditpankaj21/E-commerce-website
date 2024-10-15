import { useEffect, useState } from "react"
import { useFilter } from "./FilterContext"


interface Product {
    category: string
}
interface FetchResponse{
    products: Product[]
}


const Sidebar = () => {

    const {
        searchQuery, 
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword
    } = useFilter()

    const [categories, setCategories] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [keywords] = useState<string[]>([
        "apple",
        "watch",
        "Fashion",
        "trend",
        "shoes",
        "shirt",
    ])

    useEffect(()=>{
        const fetchCategories = async () =>{
            try {

                const res = await fetch('https://dummyjson.com/products')
                const data : FetchResponse = await res.json()

                const uniqueCategory = Array.from(new Set(data.products.map(product => product.category)))

                setCategories(uniqueCategory)

            } catch (error) {
                console.error('Error while fetching data', error)
            }
        }

        fetchCategories();
    }, [])

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setMinPrice(value ? parseFloat(value) : undefined)
    }

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setMaxPrice(value ? parseFloat(value) : undefined)
    }

    const handleRadioChangeCategories = (category: string) => {
        setSelectedCategory(category)
    }

    const handleKeywordClick = (keyword: string) => {
        setKeyword(keyword)
    }

    const handleResetFilters = () => {
        setSearchQuery('')
        setSelectedCategory('')
        setMinPrice(undefined)
        setMaxPrice(undefined)
        setKeyword('')
    }

    useEffect(() => {
        const timer = setTimeout(() => {

            setSearchQuery(inputValue.trim());

        }, 500);

        return () => {
          clearTimeout(timer);
        };
    }, [inputValue, setSearchQuery]);


  return (
    <div className="w-64 p-5 h-screen">
        <section>
            <input
                type="text"
                className="border-2 sm:mb-2 py-2 rounded px-2"
                placeholder="Search Product"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />

            <div className="flex justify-center items-center">
                <input 
                    type="text"
                    className="border-2 mr-2 px-5 py-3 mb-3 w-full"
                    placeholder="Min"
                    value={minPrice ?? ""}
                    onChange={handleMinPriceChange}
                />
                <input 
                    type="text"
                    className="border-2 mr-2 px-5 py-3 mb-3 w-full"
                    placeholder="Max"
                    value={maxPrice ?? ""}
                    onChange={handleMaxPriceChange}
                />
            </div>
        </section>

        {/* Category Sections */}

        <section>
            <div className="mb-5">
                <h2 className="text-xl font-semibold mb-3">Categories</h2>
            </div>

            {categories.map((category, index) => (
                <label key={index} className="block mb-2">
                    <input 
                        type="radio"
                        name="category"
                        value={category}
                        className="mr-2 w-[16px] h-[16px]"
                        onChange={() => handleRadioChangeCategories(category)}
                        checked={selectedCategory === category}
                    />
                    {category.toUpperCase()}
                </label>
            ))}
        </section>


        {/* keyword sections */}

        <section>
            <div className="mb-5 mt-4">
                <h2 className="text-xl font-semibold mb-3">keywords</h2>
                <div>
                    {keywords.map((keyword, index) => (
                        <button
                            key={index}
                            className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
                            onClick={() => handleKeywordClick(keyword)}
                        >
                            {keyword.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
        </section>


        <button 
            onClick={handleResetFilters}
            className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5"
        >
            Reset Filters
        </button>

    </div>
  )
}

export default Sidebar