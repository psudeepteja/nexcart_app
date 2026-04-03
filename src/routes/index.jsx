import { createBrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";
import RootLayout from "../layout/RootLayout";
import ProtectedRoutes from "./protectedRoutes";

const Home = loadable(() =>
	import(/* webpackChunkName: "Home", webpackPrefetch: true */ "../pages/Home")
);

const Plp = loadable(() =>
	import(/* webpackChunkName: "Plp", webpackPrefetch: true */ "../pages/Plp")
);

const Pdp = loadable(() =>
	import(/* webpackChunkName: "Pdp", webpackPrefetch: true */ "../pages/Pdp")
);

const Cart = loadable(() =>
	import(/* webpackChunkName: "Cart", webpackPrefetch: true */ "../pages/Cart")
);

const Order = loadable(() =>
	import(/* webpackChunkName: "Order", webpackPrefetch: true */ "../pages/Order")
);

const Error = loadable(() =>
	import(/* webpackChunkName: "Error", webpackPrefetch: true */ "../pages/Error")
);

const Auth = loadable(() =>
	import(/* webpackChunkName: "Order", webpackPrefetch: true */ "../pages/Auth")
);

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: (
					// <ProtectedRoutes>
						<Home />
					// </ProtectedRoutes>
				),

			},
			{
				path: "/products/category/:categoryId",
				element: (
					// <ProtectedRoutes>
						<Plp />
					// </ProtectedRoutes>
				),
			},
			{
				path: "/products/category/:categoryId/:productId",
				element: (
					// <ProtectedRoutes>
						<Pdp />
					// </ProtectedRoutes>
				),
			},
			{
				path: "/cart",
				element: (
					// <ProtectedRoutes>
						<Cart />
					// </ProtectedRoutes>
				),
			},
			{
				path: "/order-confirmation",
				element: (
					// <ProtectedRoutes>
						<Order />
					// </ProtectedRoutes>
				),
			},
			{
				path: "/auth",
				element: <Auth />,
			},
		],
	},
])