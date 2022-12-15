import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Axios from 'axios';

const Single = () => {
	const history = useHistory();
	const { productId } = useParams();
	const [product, setProduct] = React.useState({
		name: '',
		price: 0,
		stock: 0,
		status: true,
	});

	React.useEffect(() => {
		const getProduct = async () => {
			try {
				const response = await Axios.get(
					`http://localhost:3000/product/${productId}`
				);

				const { status, message, data } = response.data;

				if (status === 'success') {
					setProduct(data);
				} else {
					alert(message);
				}
			} catch (error) {
				console.log(error);
			}
		};

		getProduct();
	}, [productId]);

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete')) {
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
				alert('network error');
			}
		}
	};

	return (
		<>
			<h2>Halaman Single Product</h2>
			{product && (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
							<th>Stock</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{product.name}</td>
							<td className="center">{product.price}</td>
							<td className="center">{product.stock}</td>
							<td className="center">
								{product.status ? 'Active' : 'Inactive'}
							</td>
						</tr>
					</tbody>
				</table>
			)}
			<button onClick={() => history.push('/product')}>
				{' '}
				&laquo; Back
			</button>
			<button onClick={() => handleDelete(product._id)}>Delete</button>
		</>
	);
};

export default Single;
