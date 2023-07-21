const { createHttpLink } = require("apollo-link-http");
const { ApolloClient } = require("apollo-client");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { HttpLink } = require("apollo-link-http");
const gql = require("graphql-tag");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();
const fetch = require("node-fetch");


// @description           Create Book Function
// @route                 POST api/v1/book/create
// @access                Private
const createbook = asyncHandler(async (req, res) => {
  const {
    title,
    author,
    description,
    isbn,
    language,
    price,
    noofbooksavailable,
    rating,
  } = req.body;
  if (
    !title ||
    !author ||
    !description ||
    !isbn ||
    !language ||
    !price ||
    !noofbooksavailable ||
    !rating
  ) {
    return res.status(403).json({
      message:
        "title, author, description, isbn, language, price, noofbooksavailable, rating cant be null",
    });
  }
  if (req.isAdmin) {
    try {
      const mutation = gql`
        mutation CreateBook($bookInput: BookInput!) {
          createBook(bookInput: $bookInput) {
            title
            description
            isbn
            language
          }
        }
      `;

      const variables = {
        bookInput: {
          title: title,
          author: author,
          description: description,
          isbn: isbn,
          language: language,
          price: price,
          rating: rating,
          noofbooksavailable: noofbooksavailable,
        },
      };
      const link = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT, fetch });
      const client = new ApolloClient({
        link: link,
        cache: new InMemoryCache(),
      });

      client
        .mutate({ mutation, variables })
        .then((response) => {
          return res.status(200).json({
            data: response.data,
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Only admin can add books" });
  }
});

// @description           Get Book Function
// @route                 GET api/v1/book/get
// @access                Public
const getbook = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(403).json({
      message: "id cant be null",
    });
  }

  try {
    const query = gql`
      query Books($id: ID!) {
        books(ID: $id) {
          id
          title
          description
          isbn
          language
          price
          rating
          createdAt
          author {
            name
            email
          }
        }
      }
    `;

    const variables = {
      id: id,
    };
    const link = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT, fetch });
    const client = new ApolloClient({
      link: link,
      cache: new InMemoryCache(),
    });

    client
      .query({ query, variables })
      .then((response) => {
        return res.status(200).json({
          data: response.data,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @description           Update Book Function
// @route                 PATCH api/v1/book/update
// @access                Private
const updatebook = asyncHandler(async (req, res) => {
  const {
    id,
    title,
    description,
    isbn,
    language,
    price,
    noofbooksavailable,
    rating,
  } = req.body;
  // console.log(req.body)
  if (!id) {
    return res.status(403).json({
      message: "id cant be null",
    });
  }

  if (req.isAdmin) {
    try {
      const mutation = gql`
        mutation EditBook($id: ID!, $updatebookInput: UpdateBookInput) {
          editBook(ID: $id, updatebookInput: $updatebookInput)
        }
      `;

      const variables = {
        id: id,
        updatebookInput: {
          description: description,
          isbn: isbn,
          language: language,
          noofbooksavailable: noofbooksavailable,
          price: price,
          rating: rating,
          title: title,
        },
      };
      console.log(variables);
      const link = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT });
      const client = new ApolloClient({
        link: link,
        cache: new InMemoryCache(),
      });

      client
        .mutate({ mutation, variables })
        .then((response) => {
          return res.status(200).json({
            data: response.data,
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Only admin can update books" });
  }
});

// @description           Delete Book Function
// @route                 POST api/v1/book/delete
// @access                Private
const deletebook = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(403).json({
      message: "id cant be null",
    });
  }
  if (req.isAdmin) {
    try {
      const mutation = gql`
        mutation DeleteBook($id: ID!) {
          deleteBook(ID: $id)
        }
      `;

      const variables = {
        id: id,
      };
      const link = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT, fetch });
      const client = new ApolloClient({
        link: link,
        cache: new InMemoryCache(),
      });

      client
        .mutate({ mutation, variables })
        .then((response) => {
          return res.status(200).json({
            data: response.data,
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Only admin can delete books" });
  }
});

module.exports = { createbook, getbook, updatebook, deletebook };
