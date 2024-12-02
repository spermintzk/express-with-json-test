'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [authors, setAuthors] = useState([]);

  // Хэрэглэгчдийн өгөгдлийг авах
  useEffect(() => {
    fetch('http://localhost:4000/api/users')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched users:', data);
        setUsers(data);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Барааны өгөгдлийг авах
  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched products:', data);
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Зохиолчдын өгөгдлийг авах
  useEffect(() => {
    fetch('http://localhost:4000/api/authors')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched authors:', data);
        setAuthors(data);
      })
      .catch((error) => console.error('Error fetching authors:', error));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>Express.js болон JSON жишээ</h1>
        <section>
          <h2>Хэрэглэгчдийн жагсаалт</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <span>{user.name}</span> - {user.email}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Барааны жагсаалт</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <span>{product.name}</span> - {product.price}₮
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Зохиолчдын жагсаалт</h2>
          <ul>
            {authors.map((author) => (
              <li key={author._id}>
                <h3>{author.name}</h3>
                <p>{author.bio}</p>
                <h4>Books:</h4>
                <ul>
                  {author.books.title.map((title, index) => (
                    <li key={author.books.id[index]}>
                      {title} - {author.books.year[index]} - {author.books.price[index]}₮
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <footer className={styles.footer}>
        © 2023 Express with JSON Example
      </footer>
    </div>
  );
}
