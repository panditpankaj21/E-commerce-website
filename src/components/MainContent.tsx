import { useEffect, useState } from "react"
import { useFilter } from "./FilterContext"
import { Tally3 } from "lucide-react"
import axios from "axios"
import BookCard from "./BookCard"
import Sidebar from "./Sidebar"

const SkeletonLoader = () => {
    return (
      <div className="animate-pulse p-4 border rounded shadow-sm w-full">
        <div className="bg-gray-200 h-48 w-full mb-4"></div>
        <div className="bg-gray-200 h-6 w-3/4 mb-2"></div>
        <div className="bg-gray-200 h-6 w-1/2"></div>
      </div>
    );
};


const MainContent = () => {
    const {searchQuery, selectedCategory, minPrice, maxPrice, keyword} = useFilter()

    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all')
    const [currentPage, setCurrentPage] =  useState(1);
    const [dropdownOpen, setDropDownOpen] = useState(false)
    const ITEMS_PER_PAGE = 12


    useEffect(()=>{
        setLoading(true)
        let url = `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${(currentPage-1)*ITEMS_PER_PAGE}`

        if(keyword){
            url = `https://dummyjson.com/products/search?q=${keyword}`
        }

        axios.get(url)
        .then(res =>{
            setProducts(res.data.products)
        })
        .catch(error => {
            console.error("ERROR while fetching data", error)
        })
        .finally(()=>{
            setLoading(false)
        })
    }, [currentPage, keyword])



    const getFilteredProducts = () => {

        let filteredProducts  = products;
        
        if(selectedCategory){
            filteredProducts = filteredProducts.filter(product => product.category == selectedCategory)
        }

        if(minPrice !== undefined){
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice)
        }

        if(maxPrice !== undefined){
            filteredProducts = filteredProducts.filter(product => product.price <= maxPrice)
        }

        // search query
        filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchQuery))
    


        switch(filter){
            case "expensive":
                return filteredProducts.sort((a, b) => b.price - a.price)
            case "cheap":
                return filteredProducts.sort((a, b) => a.price - b.price)
            case "popular":
                return filteredProducts.sort((a,b) => b.rating - a.rating)
            default: return filteredProducts;
        }
    } 

    const filteredProducts = getFilteredProducts();

    const totalProducts = 100;
    const totalPages = Math.ceil(totalProducts/ITEMS_PER_PAGE);

    const handlePageChange = (page: number) =>{
        if(page > 0 && page <= totalPages){
            setCurrentPage(page)
        }
    }

    const handleSetFilter = (f: string)=>{
        setFilter(f)
        setDropDownOpen(false);
    }


    const getPaginationButtons = ()=>{
        const buttons: number[] = []
        let startPage = Math.max(1, currentPage-2)
        let endPage = Math.min(totalPages, currentPage+2)


        if(currentPage-2 < 1){
            endPage = Math.min(totalPages, endPage + (2-currentPage-1));
        }

        if(currentPage + 2 > totalPages){
            startPage = Math.min(1, startPage - (2 - totalPages - currentPage));
        }


        for(let page = startPage; page<=endPage;page++){
            buttons.push(page);
        }

        return buttons;
    }

  return (
    <div className="flex h-screen">
        <Sidebar/>
        <div className="rounded w-full flex justify-between flex-wrap">
            <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
                <div className="mb-5">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="relative mb-5">
                            <button 
                                onClick={()=>setDropDownOpen(!dropdownOpen)}
                                className="border px-4 py-2 rounded-full flex items-center"
                            >
                                <Tally3 className="mr-2"/>
                                {filter==='all' ? 'Filter' : filter.charAt(0).toLowerCase() + filter.slice(1)} 
                            </button>

                            {dropdownOpen && (
                                <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                                    <button 
                                        onClick={()=>handleSetFilter('cheap')}
                                        className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                                    >Cheap{ filter==="cheap" && <span className="font-bold text-green-500 ml-2">&#10003;</span>}</button>
                                    <button 
                                        onClick={()=>handleSetFilter('expensive')}
                                        className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                                    >Expensive{ filter==="expensive" && <span className="font-bold text-green-500 ml-2">&#10003;</span>}</button>
                                    <button 
                                        onClick={()=>handleSetFilter('popular')}
                                        className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                                    >Popular{ filter==="popular" && <span className="font-bold text-green-500 ml-2">&#10003;</span>}</button>

                                </div>
                            )}
                        </div>
                    </div>



                    <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
                        {loading ? (
                            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                            <SkeletonLoader key={index} />
                            ))) : (
                            filteredProducts.map((product) => (
                            <BookCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                image={product.thumbnail}
                                price={product.price}
                            />
                            ))
                        )}
                    </div>

                    {/* Pagination goes here */}

                    {/* prev-button */}
                    {/* 1, 2, 3, 4, ... */}
                    {/* next-button */}

                    <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                        <button 
                            className={`border px-4 py-2 mx-2 rounded hover:bg-gray-200 ${currentPage===1 ? "cursor-not-allowed" : "cursor-pointer"}`}
                            onClick={() => handlePageChange(currentPage-1)}
                            disabled={currentPage===1}
                        >
                            Previous
                        </button>

                        
                        <div className="flex flex-wrap justify-center">
                            {/* pagination */}
                            {getPaginationButtons().map(page =>(
                                <button 
                                    key={page} 
                                    className={`border px-4 py-2 mx-1 rounded-full hover:bg-gray-200 ${page===currentPage ? "bg-black text-white" : ""}`}
                                    onClick={()=>handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>





                        <button 
                            className={`border px-4 py-2 mx-2 rounded hover:bg-gray-200 ${currentPage=== totalPages ? "cursor-not-allowed" : "cursor-pointer"}`}
                            onClick={() => handlePageChange(currentPage+1)}
                            disabled={currentPage===totalPages}
                        >
                            Next
                        </button>

                    </div>

                </div>
            </section>
        </div>
    </div>
  )
}

export default MainContent