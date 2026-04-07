import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getCategoryApi, getProductsApi } from '../../feature/asyncThunk'
import Card from '../../components/Card'

const categoryImages = {
  "electronics": "/electronics.png",
  "jewelery": "/jewelery.png",
  "men's clothing": "/men's clothing.png",
  "women's clothing": "/women's clothing.png"
};

export default function Home() {
  const { category } = useSelector(state => state.categories)
  const { menCollections, womenCollections, jewelery, electronics } = useSelector(state => state.homeProduct)
  const navigate = useNavigate();
  console.log("menCollections", menCollections)
  console.log("womenCollections", womenCollections)
  const dispatch = useDispatch()
  const categoriesToFetch = [
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery"
  ];
  useEffect(() => {
    // if (!category.length) {
    dispatch(getCategoryApi("products/categories"))
    categoriesToFetch.forEach((item) => (
      dispatch(getProductsApi(`products/category/${item}`))
    ))
    // }
  }, [])

  const result = category?.map(category => ({
    categoryName: category,
    image: categoryImages[category]
  }));

  return (
    <div className='pt-2 px-4 md:px-0'>
      <div className=" font-medium border-b-2 border-focus-purple inline-block py-1 ">Shop from <span className="text-focus-blue font-bold"> Categories  </span></div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 py-4 gap-4">
        {result.map((i, idx) => (
          <Link key={idx} to={`/products/category/${i.categoryName}`}>
            <Card
              title={i.categoryName}
              image={i.image}
            />
          </Link>
        ))
        }

      </div>
      <div className=" font-medium border-b-2 border-focus-blue inline-block py-1"><span className="text-focus-purple font-bold"> Electronics </span> Collections</div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 py-4 gap-4">
        {electronics.map((i, idx) => (
          <div key={idx} onClick={() => {
            navigate(`/products/category/${i.category}/${i.id}`,
              { state: i })
          }}>
            <Card
              title={i.title}
              image={i.image}
            />
          </div>
        ))
        }
      </div>
      <div className=" font-medium border-b-2 border-focus-blue inline-block py-1"><span className="text-focus-purple font-bold"> Women </span> Collections</div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 py-4 gap-4">
        {womenCollections.map((i, idx) => (
          <div key={idx} onClick={() => {
            navigate(`/products/category/${i.category}/${i.id}`,
              { state: i })
          }}>
            <Card
              title={i.title}
              image={i.image}
            />
          </div>
        ))
        }
      </div>
      <div className=" font-medium border-b-2 border-focus-blue inline-block py-1"><span className="text-focus-purple font-bold"> Men </span> Collections</div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 py-4 gap-4">
        {menCollections.map((i, idx) => (
          <div key={idx} onClick={() => {
            navigate(`/products/category/${i.category}/${i.id}`,
              { state: i })
          }}>
            <Card
              title={i.title}
              image={i.image}
            />
          </div>
        ))
        }
      </div>
      <div className=" font-medium border-b-2 border-focus-blue inline-block py-1"><span className="text-focus-purple font-bold"> Jewelery </span> Collections</div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 py-4 gap-4">
        {jewelery.map((i, idx) => (
          <div key={idx} onClick={() => {
            navigate(`/products/category/${i.category}/${i.id}`,
              { state: i })
          }}>
            <Card
              title={i.title}
              image={i.image}
            />
          </div>
        ))
        }
      </div>
    </div>
  )
}
