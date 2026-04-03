import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getCategoryApi, getProductsApi } from '../../feature/asyncThunk'
import Card from '../../components/Card'

const categoryImages = {
  "electronics": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
  "jewelery": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
  "men's clothing": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  "women's clothing": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
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
    <>
      <div className=" font-medium border-b-2 border-sky-900 inline-block py-2">Shop from <span className="text-sky-900"> Categories  </span></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 py-4 gap-4">
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
      <div className=" font-medium border-b-2 border-sky-900 inline-block py-2"><span className="text-sky-900"> Electronics </span> Collections</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 py-4 gap-4">
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
      <div className=" font-medium border-b-2 border-sky-900 inline-block py-2"><span className="text-sky-900"> Women </span> Collections</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 py-4 gap-4">
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
      <div className=" font-medium border-b-2 border-sky-900 inline-block py-2"><span className="text-sky-900"> Men </span> Collections</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 py-4 gap-4">
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
      <div className=" font-medium border-b-2 border-sky-900 inline-block py-2"><span className="text-sky-900"> Jewelery </span> Collections</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 py-4 gap-4">
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
    </>
  )
}
