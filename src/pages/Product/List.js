import Axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';

const List = () => {
	const history = useHistory();
	const [products, setProducts] = React.useState([]);

	React.useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await Axios.get(
					'http://localhost:3000/products'
				);

				const { status, message, data } = response.data;

				if (status === 'success') {
					console.log(data);
					setProducts(data);
				} else {
					alert(message);
				}
			} catch (error) {
				console.log(error);
			}
		};

		getProducts();
	}, []);

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete?')) {
			try {
				const response = await Axios.delete(
					`http://localhost:3000/product/${id}`
				);

				const { status, message } = response.data;

				if (status === 'success') {
					alert(message);
					history.push('/product');
				} else {
					alert(message);
				}
			} catch (error) {
				alert('Network error');
			}
		}
	};

	return (
		<>
			<h2>Halaman List Product</h2>
			<a href="/product/create">+ CREATE</a>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Stock</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{products &&
						products.map((product, index) => {
							return (
								<tr key={index}>
									<td>
										<a
											href={`/product/single/${product._id}`}
										>
											{product.name}
										</a>
									</td>
									<td className="center">{product.price}</td>
									<td className="center">{product.stock}</td>
									<td className="center">
										<button>
											<a
												href={`/product/update/${product._id}`}
											>
												Update
											</a>
										</button>
										<button
											onClick={() =>
												handleDelete(product._id)
											}
										>
											{' '}
											Delete{' '}
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
};

export default List;
